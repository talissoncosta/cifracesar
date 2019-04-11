exports.decifrarTexto = function (texto, casas) {
    var decifrado = '';
    for (let i = 0; i < texto.length; i++) {
        decifrado += decifrarLetra(texto[i], casas);
    }
    return decifrado;

}

decifrarLetra = function (letra, casas) {

    var alf = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var lp = alf.indexOf(letra)
    if (lp > 0) {
        if ((lp - casas) < 0) {
            return alf[(alf.length + lp) - casas]
        } else {
            return alf[lp - casas];
        }
    } else {
        return letra;
    }
}