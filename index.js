
const sa = require('superagent');
const fs = require('fs');
const sha1 = require('sha1');
const decifrar = require('./decifrar');
const VAR = require('./variables');

const file = fs.createWriteStream("answer.json");
sa.get(VAR.url_data+VAR.token)
    .set('Content-Type', ' application/json')
    .end((err, response) => {
        if (err) throw err;
        fs.writeFile('answer.json', JSON.stringify(response.body), function (err) {
            if (err) throw err;
            var decifrado = decifrar.decifrarTexto(response.body.cifrado, response.body.numero_casas);
            var resumo_criptografico = sha1(decifrado);
            var json_atualizado = response.body;
            json_atualizado.decifrado = decifrado;
            json_atualizado.resumo_criptografico = resumo_criptografico;
            
            fs.writeFile('answer.json', JSON.stringify(json_atualizado), (err) => {
                // throws an error, you could also catch it here
                if (err) throw err;

                sa.post(VAR.url_submit + VAR.token)
                    .attach('answer', './answer.json')
                    .end((err, response) => {
                        if (err) throw err;

                        console.log(response.body.score);
                            
                    });
            });
        });        
    });