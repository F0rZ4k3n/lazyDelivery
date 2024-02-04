import fs from 'fs'
import https from 'https'
import express from 'express'
const app = express();
app.use(express.static("public"));

//#region Server Domains and Connections

// Configuración para el Landing Page
const optionsServer = {
    key: fs.readFileSync('/etc/letsencrypt/live/diru.dev/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/diru.dev/fullchain.pem'),
};
  
const server = https.createServer(optionsServer, (req, res) => {
    console.log(req.url);
    if (req.url === '/') {
      // Sirve un archivo HTML cuando accedes a la ruta principal
      fs.readFile('/public/index.ejs', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error interno del servidor');
        } else {
          res.writeHead(301, { "Location": `https://${req.headers['host']}${req.url}`});
          res.end(data);
        }
      });
    } else {
      // Maneja otras rutas aquí, por ejemplo, puedes devolver un 404
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Página no encontrada');
    }
});

// Configuración para el WWW
const credentialsServer = {
  key: fs.readFileSync('/etc/letsencrypt/live/www.diru.dev/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/www.diru.dev/fullchain.pem'),
};

const credentialsWWW = https.createServer(credentialsServer, (req, res) => {
    res.end('Hola desde WWW!');
});

// Configuración para el CV
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

  // Rutas para diferentes subdominios
app.get('/', (req, res) => {
    res.render("index.ejs");
  });