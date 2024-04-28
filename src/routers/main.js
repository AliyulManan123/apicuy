import "../../config.js"
import express from 'express';

const router = express();

router.get('/pricing', async (req, res) => {
    res.render('./pages/main/pricing', {});
})
router.get('/dashboard', async (req, res) => {
    res.render('./pages/main/dashboard', { Visitor: 1, users: Object.keys(db.data.users).length, all: 10, today: 1 });
})
router.get('/p', async(req, res) => {
    res.render('./global/popup')
})

export default router;