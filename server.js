import express from "express";
import bodyParser from 'body-parser';
import fs from "fs";
import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routen für die statischen Seiten

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.get("/student1", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "student1.html"))
})

app.get("/student2", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "student2.html"))
})

app.post("/submit", (req, res) => {
    const data = req.body;
    fs.readFile(path.join(__dirname, "data", "data.json"), (err, fileData) => {
        if (err) {
            return res.status(500).send('Fehler beim Lesen der Datei');
        }
        let jsonData = JSON.parse((fileData));

        // Neue Daten hinzufügen
        jsonData.push(data);

        fs.writeFile(path.join(__dirname, "data", "data.json"), JSON.stringify(jsonData, null, 2), (err)=>{
            if(err){
                return res.status(500).send('Fehler beim Schreiben der Datei');
            }
            res.send("Daten erfolgreich gespeichert!");
        })
    })
})


// Route für das Abrufen der Daten

app.get("/data", (req, res) => {
    fs.readFile(path.join(__dirname, "data", "data.json"), (err, fileData) => {
        if (err) {
            return res.static(500).send("Fehler beim Lesen der Datei");
        }
        res.json(JSON.parse(fileData));
    })
})

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
})

