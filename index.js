import fs from 'fs'
import https from 'https'

const optionsServer = {
    key: fs.readFileSync('/etc/letsencrypt/live/diru.dev/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/diru.dev/fullchain.pem'),
  };
  
  const server = https.createServer(optionsServer, (req, res) => {
    // Obtener el subdominio del nombre del host
    const subdomain = req.headers.host.split('.')[0];

    // Lógica para el servidor principal
    res.end(`Hola desde el servidor principal para ${subdomain}!`);
});

// Configuración para el primer subdominio
const optionsSubdominio1 = {
  key: fs.readFileSync('/etc/letsencrypt/live/www.diru.dev/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/www.diru.dev/fullchain.pem'),
};

const serverSubdominio1 = https.createServer(optionsSubdominio1, (req, res) => {
    res.end('Hola desde WWW!');
});

// Configuración para el segundo subdominio
const optionsSubdominio2 = {
  key: fs.readFileSync('/etc/letsencrypt/live/cv.diru.dev/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/cv.diru.dev/fullchain.pem'),
};

const serverSubdominio2 = https.createServer(optionsSubdominio2, (req, res) => {
    res.end('Hola desde mi CV!');
});

// Escuchar en puertos específicos
const PORT_SERVER = 80
const PORT_SUBDOMINIO1 = 443;
const PORT_SUBDOMINIO2 = 444;  // Puedes usar un puerto diferente para cada subdominio

server.listen(PORT_SERVER, () => {
    console.log(`Servidor HTTPS para el servidor principal escuchando en el puerto: ${PORT_SERVER}`);
  });

serverSubdominio1.listen(PORT_SUBDOMINIO1, () => {
  console.log(`Servidor HTTPS para WWW escuchando en el puerto: ${PORT_SUBDOMINIO1}`);
});

serverSubdominio2.listen(PORT_SUBDOMINIO2, () => {
  console.log(`Servidor HTTPS para CV escuchando en el puerto: ${PORT_SUBDOMINIO2}`);
});