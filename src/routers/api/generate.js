import express from "express";
import { cekApikey, limitApikey } from "../../Utils/apikey.js"
import { txt2imgAnime } from "../../Utils/scapers/all-in-one/hugging.js";
import { remini } from "../../Utils/scapers/all-in-one/replicate.js";
import { quote, quoteMedia } from "../../Utils/scapers/all-in-one/scapers.js";

const router = express.Router();

router.get('/api/generate/anime', cekApikey, async(req, res) => {
    const q = req.query.q;

    if (!q) return res.json(mess.need.q);
    try {
        const a = await txt2imgAnime({ inputs: q })
        res.json({
            creator,
            status: true,
            result: host + a
        })
    } catch (err) {
        console.log(err)
        res.json(mess.error)
    }
})
router.get('/api/generate/upscale', cekApikey, async (req, res) => {
    try {
        const url = req.query.url;

        if (!url) return res.json({ status: 'error' });

        const result = await remini(url);
        res.set({ 'Content-Type': 'image/png' });
        res.send(result);
    } catch (error) {
        console.error(error);
        res.json(mess.error);
    }
});
router.get('/api/generate/quote', cekApikey, async(req, res) => {
    try {
        const text = req.query.text 
        const name = req.query.name
        const avatar = req.query.avatar
        const media = req.query.media

        if (!text || !name || !avatar) return res.json({ status:false })

        if (media) {
            const a = await quoteMedia(text, name, avatar, media)
            res.set({ 'Content-Type': 'image/png' });
            res.send(a)
        } else {
            const a = await quote(text, name, avatar)
            res.set({ 'Content-Type': 'image/png' });
            res.send(a)
        }
    } catch (err) {
        console.error(err);
        res.json(mess.error);
    }
})


export default router;
