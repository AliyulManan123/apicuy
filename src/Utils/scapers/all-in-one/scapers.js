import axios from "axios";
import cheerio from "cheerio";
import ytdl from 'ytdl-core';

/*
    DOWNLOADER SCAPERS
*/
async function ytmp3(url) {
    try {
        if (!ytdl.validateURL(url)) {
            throw new Error('URL YouTube tidak valid.');
        }

        const info = await ytdl.getInfo(url);
        
        const audioFormats = info.formats.filter(format => format.mimeType && format.mimeType.includes('audio'));
        
        const audioFormat = audioFormats[0];

        if (audioFormat) {
            const result = {
                title: info.videoDetails.title,
                description: info.videoDetails.description,
                url: audioFormat.url
            };

            return result;
        } else {
            console.error('Video tidak memiliki format audio.');
            return null;
        }
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

async function ytmp4(url) {
    try {
        if (!ytdl.validateURL(url)) {
            throw new Error('URL YouTube tidak valid.');
        }

        const info = await ytdl.getInfo(url);

        const result = {
            title: info.videoDetails.title,
            description: info.videoDetails.description,
            video: info.formats[0].url
        };

        return result
    } catch (err) {
        console.error(err.message);
    }
}

async function pindl(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const params = new URLSearchParams();
            params.append("url", url);

            const response = await axios.post('https://pinterestvideodownloader.com/', params);
            const htmlContent = response.data;

            const $ = cheerio.load(htmlContent);

            $("table > tbody > tr").each(function(index, element) {
                const url = $(element).find("td").eq(0).find("a").attr("href");

                if (url && url !== "") {
                    resolve(url);
                }
            });

        } catch (error) {
            reject(error);
        }
    });
};


async function twdl(url) {
    const options = {
        method: 'POST',
        url: 'https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '6a9259358bmshba34d148ba324e8p12ca27jsne16ce200ce10',
            'X-RapidAPI-Host': 'social-download-all-in-one.p.rapidapi.com'
        },
        data: {
            url: url
        }
    };
    try {
        const response = await axios.request(options)

        return response;
    } catch (error) {
        console.error(error);
    }
}
async function ttdl(url) {
    try {
        const res = await axios.get(`https://api.tiklydown.eu.org/api/download?url=${url}`)
        return res.data
    } catch (err) {
        console.log(err)
    }
}
async function igdl(url) {
    const options = {
        method: 'POST',
        url: 'https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '6a9259358bmshba34d148ba324e8p12ca27jsne16ce200ce10',
            'X-RapidAPI-Host': 'social-download-all-in-one.p.rapidapi.com'
        },
        data: {
            url: url
        }
    };
    try {
        const response = await axios.request(options);
        const {
            author,
            title,
            medias
        } = response.data
        const result = {}
        result.author = author;
        result.title = title
        result.media = medias.map(item => item.url);
        return result
    } catch (error) {
        console.error(error);
    }
}

/*
    ISLAMI SCAPERS
*/
async function listsurah() {
    return new Promise((resolve, reject) => {
        axios.get('https://litequran.net/')
            .then(({
                data
            }) => {
                const $ = cheerio.load(data);
                const result = [];

                $('ol.list a').each((index, element) => {
                    const chapterName = $(element).text().replace(/\s/g, '-');
                    result.push(chapterName);
                });

                resolve(result);
            })
            .catch(reject);
    });
}
async function surah(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://litequran.net/${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data);
                const hasil = [];

                $('article > ol.surah').each(function(index, element) {
                    const result = {
                        arab: $(element).find('> li > p.arabic').text(),
                        latin: $(element).find('> li > p.translate').text(),
                        ind: $(element).find('> li > p.meaning').text()
                    };

                    result.arab = result.arab.split('.').join('\n');
                    result.latin = result.latin.split('.').join('\n');
                    result.ind = result.ind.split('.').join('\n');

                    hasil.push(result);
                });

                resolve(hasil);
            })
            .catch(reject);
    });
}


/*
    SEARCH SCAPERS
*/
async function ghstalk(username) {
    const {
        data
    } = await axios.get(`https://api.github.com/users/${username}`)

    const p = {
        username: data.login,
        image: data.avatar_url,
        name: data.name,
        location: data.location,
        totalRepo: data.public_repos,
        followers: data.followers,
        following: data.following
    }
    return p
}
async function pinterest(querry) {
    return new Promise(async (resolve, reject) => {
        axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
            headers: {
                "cookie": "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
            }
        }).then(({
            data
        }) => {
            const $ = cheerio.load(data)
            const result = [];
            const hasil = [];
            $('div > a').get().map(b => {
                const link = $(b).find('img').attr('src')
                result.push(link)
            });
            result.forEach(v => {
                if (v == undefined) return
                hasil.push(v.replace(/236/g, '736'))
            })
            hasil.shift();
            resolve(hasil)
        })
    })
}

/*
    OTHER SCAPERS
*/
async function quote(text, name, avatar) {
    const json = {
        "type": "quote",
        "format": "png",
        "backgroundColor": "#FFFFFF",
        "width": 512,
        "height": 768,
        "scale": 2,
        "messages": [{
            "entities": [],
            "avatar": true,
            "from": {
                "id": 1,
                "name": name,
                "photo": {
                    "url": avatar,
                }
            },
            "text": text,
            "replyMessage": {}
        }]
    };

    try {
        const res = await axios.post('https://potential-cod-x6xp597q7qv39jv-4888.app.github.dev/generate', json, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const buffer = Buffer.from(res.data.result.image, 'base64');

        return buffer
    } catch (error) {
        throw error
    }
};

async function quoteMedia(text, name, avatar, media) {
    const json = {
        "type": "quote",
        "format": "png",
        "backgroundColor": "#FFFFFF",
        "width": 512,
        "height": 768,
        "scale": 2,
        "messages": [{
            "entities": [],
            "media": {
                "url": media
            },
            "avatar": true,
            "from": {
                "id": 1,
                "name": name,
                "photo": {
                    "url": avatar,
                }
            },
            "text": text,
            "replyMessage": {}
        }]
    };

    try {
        const res = await axios.post('https://quote.btch.bz/generate', json, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const buffer = Buffer.from(res.data.result.image, 'base64');

        return buffer
    } catch (error) {
        throw error
    }
};

async function searchSpotify(q) {
    try {
        const res = await axios.request({
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/search/',
            params: {
                q,
                type: 'tracks',
                offset: '0',
                limit: '10',
                numberOfTopResults: '5'
            },
            headers: {
                'X-RapidAPI-Key': '6a9259358bmshba34d148ba324e8p12ca27jsne16ce200ce10',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        })

        const result = [];
        for (let i = 0; i < res.data.tracks.items.length; i++) {
            let trackId = res.data.tracks.items[i].data.id;
            let trackUrl = `http://open.spotify.com/track/${trackId}`;
            let trackName = res.data.tracks.items[i].data.name;
            let trackDuration = res.data.tracks.items[0].data.duration.totalMilliseconds
            for (let a = 0; a < res.data.tracks.items[i].data.artists.items.length; a++) {
                let trackArtist = res.data.tracks.items[i].data.artists.items[a].profile.name
                result.push({
                    id: trackId,
                    url: trackUrl,
                    name: trackName,
                    duration: trackDuration,
                    artists: trackArtist
                });
            }
        }

        return result
    } catch (err) {
        console.error(err);
    }
}

function jadwaltv(query) {
    return new Promise(async (resolve, reject) => {
        const channelna = query;
        let stasiun = [
            "rcti",
            "nettv",
            "antv",
            "gtv",
            "indosiar",
            "inewstv",
            "kompastv",
            "metrotv",
            "mnctv",
            "rtv",
            "sctv",
            "trans7",
            "transtv",
            "tvone",
            "tvri",
        ];
        let isist = `*Available channels* :\n\n`;
        for (let i = 0; i < stasiun.length; i++) {
            isist += `*➣*  ${stasiun[i]}\n`;
        }
        try {
            axios.get("https://www.jadwaltv.net/channel/" + channelna)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data);
                    let isitable1 = [];
                    let isitable2 = [];
                    $("div > div > table:nth-child(3) > tbody > tr").each(function(
                        i,
                        result
                    ) {
                        isitable1.push({
                            jam: result.children[0].children[0].data,
                            tayang: result.children[1].children[0].data,
                        });
                    });
                    $("div > div > table:nth-child(5) > tbody > tr").each(function(
                        i,
                        result
                    ) {
                        isitable2.push({
                            jam: result.children[0].children[0].data,
                            tayang: result.children[1].children[0].data,
                        });
                    });
                    const semuatable = [];

                    for (let i = 0; i < isitable1.length; i++) {
                        semuatable.push(isitable1[i]);
                    }
                    for (let i = 0; i < isitable2.length; i++) {
                        semuatable.push(isitable2[i]);
                    }
                    let daftartay = `*Menampilkan daftar tayang channel ${channelna}*\n\n`;
                    for (let i = 0; i < semuatable.length; i++) {
                        daftartay += `${semuatable[i].jam}  ${semuatable[i].tayang}\n`;
                    }
                    resolve(daftartay);
                })
                .catch((e) => {
                    resolve(isist);
                });
        } catch (e) {
            resolve(isist);
            console.log(e);
        }
    })
}

function quotes(input) {
    return new Promise((resolve, reject) => {
        axios.get('https://jagokata.com/kata-bijak/kata-' + input.replace(/\s/g, '_') + '.html?page=1')
            .then(res => res.text())
            .then(res => {
                const $ = cheerio.load(res)
                data = []
                $('div[id="main"]').find('ul[id="citatenrijen"] > li').each(function (index, element) {
                    x = $(this).find('div[class="citatenlijst-auteur"] > a').text().trim()
                    y = $(this).find('span[class="auteur-beschrijving"]').text().trim()
                    z = $(element).find('q[class="fbquote"]').text().trim()
                    data.push({ author: x, bio: y, quote: z })
                })
                data.splice(2, 1)
                if (data.length == 0) return resolve({ creator: '© AdrianTzy', status: false })
                resolve(data)
            }).catch(reject)
    })
}

function quotesanime() {
    return new Promise((resolve, reject) => {
        const page = Math.floor(Math.random() * 184)
        axios.get('https://otakotaku.com/quote/feed/'+page)
        .then(({ data }) => {
            const $ = cheerio.load(data)
            const hasil = []
            $('div.kotodama-list').each(function(l, h) {
                hasil.push({
                    link: $(h).find('a').attr('href'),
                    gambar: $(h).find('img').attr('data-src'),
                    karakter: $(h).find('div.char-name').text().trim(),
                    anime: $(h).find('div.anime-title').text().trim(),
                    episode: $(h).find('div.meta').text(),
                    up_at: $(h).find('small.meta').text(),
                    quotes: $(h).find('div.quote').text().trim()
                })
            })
            resolve(hasil)
        }).catch(reject)
    })
}

export {
    ttdl,
    igdl,
    pinterest,
    listsurah,
    surah,
    ghstalk,
    quote,
    searchSpotify,
    twdl,
    pindl,
	jadwaltv,
	quotes,
	quotesanime,
    ytmp4,
    ytmp3,
    quoteMedia
}
