import express from "express";
import yts from 'yt-search';
import { cekApikey } from "../../Utils/apikey.js"
import { pinterest, searchSpotify } from "../../Utils/scapers/all-in-one/scapers.js";

const router = express.Router();

router.get('/api/search/pinterest', cekApikey, async(req, res) => {
    try {
        const q = req.query.q;

        if (!q) return res.json(global.mess.need.q);

        const data = await pinterest(q);

        if (!data) {
            return res.json({
                creator,
                status: false,
                message: "NOT FOUND"
            });
        }

        res.json({
            creator,
            status: true,
            result: data
        });
    } catch (error) {
        console.error(error);
        res.json(mess.error);
    }
});
router.get('/api/search/youtube', cekApikey, async (req, res) => {
    try {
        const q = req.query.q;

        if (!q) return res.json(global.mess.need.q);

        const a = await yts(q)
        res.json({
            creator,
            status: true,
            result: a.all[0]
        })

    } catch (error) {
        console.error(error);
        res.json(mess.error);
    }
});
router.get('/api/search/spotify', cekApikey, async (req, res) => {
    try {
        const q = req.query.q;

        if (!q) return res.json(global.mess.need.q);

        const a = await searchSpotify(q)
        res.json({
            creator,
            status: true,
            result: a
        })

    } catch (error) {
        console.error(error);
        res.json(mess.error);
    }
});
export default router;