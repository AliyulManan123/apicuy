import express from "express";
import { cekApikey } from "../../Utils/apikey.js"
import { ghstalk } from "../../Utils/scapers/all-in-one/scapers.js";

const router = express.Router();

router.get('/api/stalk/github', cekApikey, async (req, res) => {
    try {
        const nickname = req.query.nickname;

        if (!nickname) return res.json({ status: false });

        const data = await ghstalk(nickname);

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

export default router;