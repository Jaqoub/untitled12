const express = require('express');
const handler = (req, res) => {
    // Add an error handler for the proxied request
    const _req = request({ url: servers[cur] + req.url }).on('error', error => {
        res.status(500).send(error.message);
    });
    req.pipe(_req).pipe(res);
    cur = (cur + 1) % servers.length;
};
const server = express().get('*', handler).post('*', handler);


server.listen(8380);
