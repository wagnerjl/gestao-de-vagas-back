var express = require("express");
var router = express.Router();
const mongoClient = require('../app.js');


router.post('/usuario/:login/solicitacao', async (req, res) => {
    const db = mongoClient.db('loki');
    const collection = db.collection('vagas');
    const usuario = req.params.login;
    var success = true;

    var body = {
        data: '24/08/2019',
        motivo: 'projeto',
        veiculo: {}
    };

    await collection.findOne({ data: body.data, local: 'POLIS' }, (err, result) => {
        solicitacao = {
            veiculo: body.veiculo,
            login: usuario
        };
        if (result == null) {
            result = {
                data: body.data,
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
    collection.update({ data: body.data, local: 'POLIS' }, result, { upsert: true, safe: false })
    });
});

module.exports = router;
