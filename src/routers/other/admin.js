import express from "express";

const router = express.Router();

router.get('/admin/other/getdb', async(req, res) => {
    const apikey = req.query.apikey;

    if (apikey === key) {
        res.json(db.data)
    }
})

export default router