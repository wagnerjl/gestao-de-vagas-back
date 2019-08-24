var express = require("express");
var router = express.Router();

router.post('/usuario/:login/solicitacao', async (req, res) => {
    const db = client.db('loki');
    const collection = db.collection('vagas');
    const usuario = req.params.login;
    var success = true;

    var body = req.body;

    solicitacao = {
        veiculo: body.veiculo,
        login: usuario
    };

    var httpStatus = 0;
    var resultado = await collection.findOne({ data: body.data, local: 'POLIS' });

    if (resultado == null) {
        resultado = {
            data: body.data,
            local: 'POLIS',
            aprovadas: [solicitacao],
            pendentes: []
        }
        httpStatus = 200;
    } else if (resultado.aprovadas.length < 30) {
        var ja_existe = await collection.findOne({ data: body.data, local: 'POLIS', "aprovadas": { $elemMatch: { "veiculo.placa": body.veiculo.placa }}});
        if (ja_existe) {
            httpStatus = 409;
        } else {
            resultado.aprovadas.push(solicitacao)
            httpStatus = 200;
        }

    } else {
        resultado.pendentes.push(solicitacao);
        httpStatus = 422;
    }


    collection.update({ data: body.data, local: 'POLIS' }, resultado, { upsert: true, safe: false })

    res.status(httpStatus).send("");

});

module.exports = router;
