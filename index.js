import express, { response } from "express"
import { exec } from "child_process"
import fs from "fs"
import http from "http"
import https from "https"

const app = express();

const httpsServer = https.createServer(credentials, app);
const httpServer = http.createServer((req, res) => {
    res.writeHead(301, { "Location": `https://${req.headers['host']}${req.url}` });
    res.end();
});

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
})