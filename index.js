import fs from 'fs'
import https from 'https'
import express from 'express'

//#region Server Domains and Connections

const optionsServer = {
    key: fs.readFileSync('/etc/letsencrypt/live/diru.dev/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/diru.dev/fullchain.pem'),
};
  
const server = https.createServer(optionsServer, (req, res) => {
    res.end("aqui estoy")
});

// Configuración para el primer subdominio
const credentialsServer = {
  key: fs.readFileSync('/etc/letsencrypt/live/www.diru.dev/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/www.diru.dev/fullchain.pem'),
};

const credentialsWWW = https.createServer(credentialsServer, (req, res) => {
    res.end('Hola desde WWW!');
});

// Configuración para el segundo subdominio
const credentialsCV = {
  key: fs.readFileSync('/etc/letsencrypt/live/cv.diru.dev/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/cv.diru.dev/fullchain.pem'),
};

const serverCV = https.createServer(credentialsCV, (req, res) => {
    res.end('Hola desde mi CV!');
});

// Escuchar en puertos específicos
const PORT_SERVER = 443
const PORT_WWW = 444;
const PORT_CV = 445;  // Puedes usar un puerto diferente para cada subdominio

server.listen(PORT_SERVER, () => {
    console.log(`Servidor HTTPS para el servidor principal escuchando en el puerto: ${PORT_SERVER}`);
  });

credentialsWWW.listen(PORT_WWW, () => {
  console.log(`Servidor HTTPS para WWW escuchando en el puerto: ${PORT_WWW}`);
});

serverCV.listen(PORT_CV, () => {
  console.log(`Servidor HTTPS para CV escuchando en el puerto: ${PORT_CV}`);
});

//#endregion

const app = express();

app.use((req, res, next) => {
    const subdomain = req.subdomains[0];
    req.subdomain = subdomain;
    console.log(subdomain);
    next();
  });

  // Rutas para diferentes subdominios
app.get('/', (req, res) => {
    res.send('Bienvenido al landing page principal');
  });
  
app.get('/www', (req, res) => {
    res.send('Bienvenido al subdominio www');
});
  
app.get('/cv', (req, res) => {
    res.send('Bienvenido al subdominio cv');
});