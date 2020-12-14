const body = require('body-parser');
const express = require('express');
const request = require('request');

const app1 = express();
const app2 = express();

// Parse the request body as JSON
app1.use(body.json());
app2.use(body.json());

const handler = serverNum => (req, res) => {
    console.log(`server ${serverNum}`, req.method, req.url, req.body);
    res.send(`Hello from server ${serverNum}!`);
};

// Only handle GET and POST requests
app1.get('*', handler(1)).post('*', handler(1));
app2.get('*', handler(2)).post('*', handler(2));

app1.listen(3001);
app2.listen(3002);


const handler1 = (req, res) => {
    // Add an error handler for the proxied request
    const _req = request({ url: servers[cur] + req.url }).on('error', error => {
        res.status(500).send(error.message);
    });
    req.pipe(_req).pipe(res);
    cur = (cur + 1) % servers.length;
};
const server = express().get('*', handler1).post('*', handler1);


server.listen(8080);

const handler2 = (req, res) => {
    // Add an error handler for the proxied request
    const _req = request({ url: servers[cur] + req.url }).on('error', error => {
        res.status(500).send(error.message);
    });
    req.pipe(_req).pipe(res);
    cur = (cur + 1) % servers.length;
};
const server2 = express().get('*', handler2).post('*', handler2);


server2.listen(8384);


