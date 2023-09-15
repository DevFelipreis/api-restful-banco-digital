const express = require('express');
const date = require('date-fns');


const verificarSenha = (req, res, next) => {
    const senhaFornecida = req.params.senha_banco;
    const senhaCorreta = "Cubos123Bank";

    if (senhaFornecida === senhaCorreta) {
        return next();
    }
    return res.status(401).json({ "mensagem": "A senha do banco informada é inválida!" });

};

module.exports = {
    verificarSenha
}

