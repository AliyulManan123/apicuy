import "../../config.js";
import express from "express";
import fs from "fs"
import downloader from "./api/downloader.js"
import generate from "./api/generate.js"
import islami from "./api/islami.js"
import search from "./api/search.js"
import stalk from "./api/stalk.js"

import main from "./main.js"
import admin from "./other/admin.js"
import pages from "./pages.js"

const router = express();

router.use('/', downloader);
router.use('/', generate);
router.use('/', islami);
router.use('/', search);
router.use('/', stalk);

router.use('/', main);
router.use('/', admin);
router.use('/', pages);

router.get('/version/bot', async(req, res) => {
    const q = req.query.q

    if (!q) return res.json({ status: false });
    if (q === '1.0rc') {
        res.json({
            "status": "Active",
            "version": "1.0-rc",
            "license": "Apache-2.0",
            "author": "xyzendev"
        })
    }
})
export default router;
