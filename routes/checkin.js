var express = require("express");
var router = express.Router();

router.get('/checkin/:placa', async (req, res) => {
    var today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    const db = client.db('loki');
    const collection = db.collection('vagas');
    const placa = req.params.placa;
    var resultado = await collection.findOne({ "data" : today, "aprovadas": { $elemMatch: { "veiculo.placa": placa }}});
    if (resultado != null) {
        res.status(200).send('');
    } else {
        res.status(422).send('');
    }
   });
module.exports = router;
