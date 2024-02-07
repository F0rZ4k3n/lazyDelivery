import fs from 'fs';
import https from 'https';
import express from 'express';

const app = express();
app.use(express.static("public"));

// Configuración para el Landing Page
const optionsServer = {
    key: fs.readFileSync('/etc/letsencrypt/live/diru.dev/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/diru.dev/fullchain.pem'),
};

const server = https.createServer(optionsServer, app);

// Configuración para el WWW
const credentialsServerWWW = {
    key: fs.readFileSync('/etc/letsencrypt/live/www.diru.dev/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/www.diru.dev/fullchain.pem'),
};

const serverWWW = https.createServer(credentialsServerWWW, app);

// Configuración para el CV
const credentialsServerCV = {
    key: fs.readFileSync('/etc/letsencrypt/live/cv.diru.dev/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/cv.diru.dev/fullchain.pem'),
};

const serverCV = https.createServer(credentialsServerWWW, app);

// Escuchar en puertos específicos
const PORT_SERVER = 443;
const PORT_WWW = 444;
const PORT_CV = 445;

server.listen(PORT_SERVER, () => {
    console.log(`Servidor HTTPS para el servidor principal escuchando en el puerto: ${PORT_SERVER}`);
});

serverWWW.listen(PORT_WWW, () => {
    console.log(`Servidor HTTPS para WWW escuchando en el puerto: ${PORT_WWW}`);
});

serverCV.listen(PORT_CV, () => {
    console.log(`Servidor HTTPS para CV escuchando en el puerto: ${PORT_CV}`);
});

// Rutas para diferentes subdominios
app.get('/', (req, res) => {
    res.render("index.ejs");
});