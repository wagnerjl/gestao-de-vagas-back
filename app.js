const bodyParser = require('body-parser');
const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const veiculo = require('./routes/veiculo');
const solicitacao = require('./routes/solicitacao');

const app = express();
const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });

const listEndpoints = require('express-list-endpoints')


app.use(bodyParser.json());

app.use((req, res, next) => {
    next();
});

app.use('/', solicitacao);
app.use('/', veiculo);

app.listen(3001, () => {
        client.connect();
    }
);

console.log(listEndpoints(app));

module.exports = client;
