import "dotenv/config";
import Debug from 'debug';
import express from 'express';
import http from 'node:http';
import httpProxy from 'http-proxy';

const debug = Debug('gutenprog:proxy-server');

const PROXY_USER = process.env.PROXY_USER;
const PROXY_PASS = process.env.PROXY_PASS;
const PROXY_PORT = process.env.PROXY_PORT || 3000;

const proxyConfig = {
    secure: false,
    changeOrigin: true,
};
if (!!PROXY_USER && !!PROXY_PASS) {
    proxyConfig.auth = `${PROXY_USER}:${PROXY_PASS}`;
}

const proxy = httpProxy.createProxyServer(proxyConfig);
proxy.on('error', (err) => debug('proxy.onError()', err.code, err.message));
proxy.on('proxyReq', (proxyReq, req, res, options) => {
    proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
});

const app = express();

app.use((req, res, next) => {
    debug(req.method, req.originalUrl);
    next();
})

app.use('/api', (req, res) => {
    proxy.web(req, res, {target: 'https://intranet.chums.com/api/'});
})

const server = http.createServer(app);
server.listen(Number(PROXY_PORT));
debug(`proxy-server listening on port ${PROXY_PORT}`);
