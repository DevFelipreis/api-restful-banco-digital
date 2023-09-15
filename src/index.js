const express = require('express');
const date = require('date-fns');
const router = require('./router');

const server = express();

server.use(express.json());

server.use('/', router);

server.listen(3000, () => {
    console.log('O server está ouvindo na porta 3000');
});
