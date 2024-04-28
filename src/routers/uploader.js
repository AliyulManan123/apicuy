import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import {
	formatp,
	getRandom
} from '../lib/func.js';

const app = express();

const storage = multer.memoryStorage();
const upload = multer({
	storage: storage
});

app.get('/upload', (req, res) => {
	const filePath = path.join(__dirname, 'views', 'uploader.html');
	res.sendFile(filePath);
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
	try {
		const file = req.file;

		if (!file) {
			return res.status(400).send('No file uploaded.');
		}

		const fileExtension = '.' + file.originalname.split('.').pop();
		const randomFileName = await getRandom(fileExtension);
		const filePath = path.join(__dirname, 'public', 'files', randomFileName);

		fs.writeFile(filePath, file.buffer, (err) => {
			if (err) {
				console.error(err);
				return res.json(mess.error)
			}

			const fileInfo = {
				urlFile: `${host}/files/${randomFileName}`,
				filename: randomFileName,
				originalname: file.originalname,
				mimetype: file.mimetype,
				size: formatp(file.size),
				timestamp: new Date().toISOString(),
			};
			const fileInfoString = JSON.stringify(fileInfo, null, 2);

			const jsonFilePath = path.join(__dirname, 'src', 'database', "data", "image.json");
			fs.writeFile(jsonFilePath, fileInfoString, (jsonErr) => {
				if (jsonErr) {
					console.error(jsonErr);
					return res.json(mess.error)
				}

				res.json({
					creator,
					status: true,
					result: fileInfo
				})
			});
		});
	} catch (error) {
		console.error(error);
		res.json(mess.error)
	}
});

export default app;