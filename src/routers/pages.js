import express from "express";
import { downloader, generate, islami, searcher } from "../models/listMenu.js";

const router = express.Router();

router.get('/pages/downloader', async(req, res) => {
    res.render('./pages/api/downloader', { data: downloader })
})

router.get('/pages/islami', async(req, res) => {
    res.render('./pages/api/islami', { data: islami })
})

router.get('/pages/generate', async(req, res) => {
    res.render('./pages/api/generate', { data: generate })
})

router.get('/pages/searcher', async(req, res) => {
    res.render('./pages/api/searcher', { data: searcher })
})

export default router