const mongoClient = require('../app');
var express = require("express");
var router = express.Router();

router.post('/usuario/:login/veiculo', (req, res) => {
    const db = mongoClient.db('loki');
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

module.exports = router;
