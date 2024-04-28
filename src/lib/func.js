import { randomBytes } from "crypto";
import axios from "axios"
import { sizeFormatter } from "human-readable";

const formatp = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

async function getRandom(ext){
    return `${randomBytes(8).toString('hex')}${ext}`
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function getBuffer(url, options) {
    try {
        options ? options : {}
        const res = await axios({
            method: "GET",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        })
        return res.data
    } catch (err) {
        return err
    }
}

function generateRandomText(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomText = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomText += characters.charAt(randomIndex);
    }

    return randomText;
}

export {
    formatp,
    getRandom,
    getBuffer,
    sleep,
    generateRandomText
}