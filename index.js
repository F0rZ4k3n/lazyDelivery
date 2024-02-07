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


// Escuchar en puertos específicos
const PORT_SERVER = 443;

server.listen(PORT_SERVER, () => {
    console.log(`Servidor HTTPS para el servidor principal escuchando en el puerto: ${PORT_SERVER}`);
});

// Rutas para diferentes subdominios
app.get('/', (req, res) => {
    res.render("index.html");
});