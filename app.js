const express = require('express');
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

app.post('/api', function(req, res) {
    const validLetters = 'TRWAGMYFPDXBNJZSQVHLCKET';
    const regExNif = /(^([0-9]{8,8}\-[A-Z]))$/;
    let nif = req.body.nif;
    let response;

    if (regExNif.test(nif)) {
        number = nif.substr(0, nif.length - 2);
        letter = nif.substr(nif.length - 1, 1);
        i = number % 23;
        correctLetter = validLetters.substring(i, i + 1);
        if (correctLetter != letter.toUpperCase()) {
            response = { result: "Letra inválida. La correcta es " + correctLetter };
        } else {
            response = { result: "NIF válido" };
        }
    } else {
        response = { result: "Formato inválido" }
    }

    res.json(response);
});

app.listen(port, () => console.log("Escuchando por el puerto " + port));