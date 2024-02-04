import fs from 'fs'
import https from 'https'

const optionsServer = {
    key: fs.readFileSync('/etc/letsencrypt/live/diru.dev/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/diru.dev/fullchain.pem'),
};
  
const server = https.createServer(optionsServer, (req, res) => {
    res.end('Aqui estoy')
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

const serverSubdominio2 = https.createServer(credentialsCV, (req, res) => {
    res.end('Hola desde mi CV!');
});

// Escuchar en puertos específicos
const PORT_SERVER = 80
const PORT_WWW = 443;
const PORT_CV = 444;  // Puedes usar un puerto diferente para cada subdominio

server.listen(PORT_SERVER, () => {
    console.log(`Servidor HTTPS para el servidor principal escuchando en el puerto: ${PORT_SERVER}`);
  });

credentialsWWW.listen(PORT_WWW, () => {
  console.log(`Servidor HTTPS para WWW escuchando en el puerto: ${PORT_WWW}`);
});

serverSubdominio2.listen(PORT_CV, () => {
  console.log(`Servidor HTTPS para CV escuchando en el puerto: ${PORT_CV}`);
});