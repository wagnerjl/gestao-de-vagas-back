const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const app = express();
app.use(require('body-parser').json())
const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });

app.listen(3001, () => {
    client.connect();
    console.log('funcionando');
});

app.get('/usuario/:login/solicitacao', async (req, res) => {
    const db = client.db('loki');
    const collection = db.collection('vagas');
    const usuario = req.params.login;
    var success = true;
    // const body = req.body;
    var corpo = {
        data: '24/08/2019',
        motivo: 'projeto',
        veiculo: {}
    }

    await collection.findOne({ data: corpo.data, local: 'POLIS' }, (err, result) => {
        solicitacao = {
            veiculo: corpo.veiculo,
            login: usuario
        };
        if (result == null) {
            result = {
                data: corpo.data,
                local: 'POLIS',
                aprovadas: [solicitacao],
                pendentes: []
            }
        } else if (result.aprovadas.length < 30) {
            result.aprovadas.push(solicitacao)
            res.status(200).send('funcionou!');
        } else {
            result.pendentes.push(solicitacao);
            res.status(422).send('fila cheia');
        }
        collection.update({ data: corpo.data, local: 'POLIS' }, result, { upsert: true, safe: false })
    });
});

app.post('/usuario/:login/veiculo', (req, res) => {
    const db = client.db('loki');
    const collection = db.collection('usuarios');
    const usuario = req.params.login;
    const veiculo = [req.body];

    collection.update(
        { login: usuario }, {
            login: usuario,
            veiculos: veiculo
        }, { upsert: true, safe: false })

    res.send('funcionou!' + usuario);
});