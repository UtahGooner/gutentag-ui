process.env.DEBUG = 'gutenprog:*';
require('dotenv').config();

const express = require('express');
const http = require('http');
const path = require('path');
const debug = require('debug')('gutenprog:index');
const fsPromises = require('fs').promises;
const buffer = require('buffer');
const xFrameOptions = require('x-frame-options');
const helmet = require('helmet');

//debug(process.env);

const bodyClassName = (theme) => {
    switch (theme) {
    case 'metal':
        return 'metal';
    case 'rock':
        return 'rock';
    default:
        return '';
    }
};

async function renderGT6(req, res) {
    try {
        const {theme = ''} = req.query || {};
        const manifestJSON = await fsPromises.readFile('./public/js/manifest.json');
        const manifest = JSON.parse(Buffer.from(manifestJSON).toString());
        res.render('gt6.pug', {
            main: manifest['main.js'],
            vendor: manifest['vendor.js'],
            gt6params: {username: '', id: 0, ...req.params},
            bodyClassName: bodyClassName(theme)
        });
    } catch(err) {
        debug("app.get /gt6", err.message);
        return res.json({error: err.message});
    }
}

const app = express();
app.use(helmet());
app.set('trust-proxy', 'loopback');
app.use(xFrameOptions('ALLOW-FROM https://www.progulus.com'));
app.use((req, res, next) => {
    res.set('Content-Security-Policy', 'frame-ancestors https://*.progulus.com https://progulus.com http://localhost/;');
    next();
});

app.set('view-engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/css', express.static(path.join(__dirname, '/public/css'), {fallthrough: false}));
app.use('/js', express.static(path.join(__dirname + '/public/js'), {fallthrough: false}));
app.use((req, res, next) => {
    debug(req);
    next();
})
app.get('/gt6', renderGT6);
app.get('/gt6/auth/progulus/:id/:user', renderGT6);

const server = http.createServer(app);
server.listen(process.env.PORT, 'localhost');
debug(`listening on ${process.env.SERVER_ADDR}:${process.env.PORT}`);
