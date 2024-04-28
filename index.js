import "./config.js";
import express from "express";
import bodyParser from "body-parser";  // Menggunakan 'bodyParser' yang benar
import path from "path";
import favicon from "serve-favicon";
import db from "./src/Utils/db.js";
import login from "./src/routers/auth.js";
import api from "./src/routers/index.js";
import uploader from "./src/routers/uploader.js";

const PORT = process.env.PORT || 3000;  // Menggunakan 'PORT' sebagai variabel port
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));  // Menggunakan 'path.join' untuk menyusun path views
app.use(express.json());
app.set("json spaces", 2);
app.use(favicon(path.join(__dirname, 'public', 'image', 'favicon.ico')));

app.use('/', login);
app.use('/', uploader);
app.use('/', api);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());  // Menggunakan 'bodyParser' yang benar
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, async () => {
    await db
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
