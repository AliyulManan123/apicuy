import ytdl from 'ytdl-core';

async function getAudioInfo(url) {
    try {
        if (!ytdl.validateURL(url)) {
            throw new Error('URL YouTube tidak valid.');
        }

        const info = await ytdl.getInfo(url);
        const audioFormats = info.formats.filter(format => format.mimeType.includes('audio'));

        const audioFormat = audioFormats[0];

        if (audioFormat) {
            const result = {
                title: info.videoDetails.title,
                description: info.videoDetails.description,
                url: audioFormat.url
            };

            return result
        } else {
            console.error('Video tidak memiliki format audio.');
        }
    } catch (err) {
        console.error(err.message);
    }
}
