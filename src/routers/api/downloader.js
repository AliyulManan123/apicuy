import express from "express";
import { pindl, ytmp3, ytmp4 } from "../../Utils/scapers/all-in-one/scapers.js";
import { cekApikey } from "../../Utils/apikey.js";
import { tiktokdl } from "../../Utils/scapers/tiktok.js";
import { igdl } from "../../Utils/scapers/instagram.js";

const router = express.Router();

router.get('/api/downloader/tiktok', cekApikey, async (req, res) => {
    try {
        const url = req.query.url;

        if (!url) return res.json(mess.need.url);

        const data = await tiktokdl(url);

        if (!data) {
            return res.json({
                creator,
                status: false,
                message: "NOT FOUND"
            });
        }
        const result = {}

        result.caption = data.caption;
        result.url = data.server1.url;

        res.json({
            creator,
            status: true,
            result
        });
    } catch (error) {
        console.log(error);
        res.json(mess.error);
    }
});
router.get('/api/downloader/instagram', cekApikey, async(req, res) => {
    try {
        const url = req.query.url;

        if (!url) return res.json(mess.need.url)

        const a = await igdl(url);
        res.json({
            creator,
            status: true,
            result: a
        })
    } catch (err) {
        res.json(mess.error)
    }
})
router.get('/api/downloader/pinterest', cekApikey, async(req, res) => {
    try {
        const url = req.query.url;

        if (!url) return res.json(mess.need.url)

        const result = await pindl(url);
        res.json({
            creator,
            status: true,
            result
        })

    } catch (err) {
        console.log(err)
        res.json(mess.error)
    }
})

router.get('/api/downloader/youtubeaudio', async(req, res) => {
    try {
        const url = req.query.url;

        const a = await ytmp3(url);

        res.json({
            creator,
            status: true,
            result: a
        })
    } catch (err) {
        console.error(err);
    }
})
router.get('/api/downloader/youtubevideo', async(req, res) => {
    try {
        const url = req.query.url;

        const a = await ytmp4(url);

        res.json({
            creator,
            status: true,
            result: a
        })
    } catch (err) {
        console.error(err);
    }
})

export default router;