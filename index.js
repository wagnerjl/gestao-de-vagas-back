const express = require("express");
const mongodb = require("mongodb");

const app = express();

app.listen(3000, () => {
    console.log('funcionando');
}); 

app.post('/veiculo/{login}', (req, res) => {
    res.send('funcionou!')
})