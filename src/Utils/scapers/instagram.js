import axios from 'axios';
import formData from "form-data"
import cheerio from 'cheerio';


export async function igdl(url) {
    try {
        const bodyForm = new formData()
        bodyForm.append("q", url)
        const {data} = await axios('https://v3.igdownloader.app/api/ajaxSearch', {
            method: 'POST',
            data: bodyForm,
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            }
        })

        console.log(data)

    } catch (err) {
        console.log(err)
    }
}