const bodyParser = require('body-parser');
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
var cors = require('cors');


const veiculo = require('./routes/veiculo');
const solicitacao = require('./routes/solicitacao');
const checkin = require('./routes/checkin');

const app = express();
client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });

const listEndpoints = require('express-list-endpoints')


app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
    next();
});

app.use('/', solicitacao);
app.use('/', veiculo);
app.use('/', checkin);

app.listen(3001, () => {
        client.connect();
    }
);

console.log(listEndpoints(app));
