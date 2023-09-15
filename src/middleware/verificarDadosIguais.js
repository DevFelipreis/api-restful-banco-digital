const express = require('express');
const date = require('date-fns');

const { bancodedados } = require('../bancodedados');
const verificarDadosIguais = (req, res, next) => {
    const { cpf, email } = req.body;
    const numeroContaAtualizando = req.params.numeroConta;

    for (const conta of bancodedados.contas.flat()) {
        if (conta.numero !== numeroContaAtualizando) {
            if (
                conta.usuario.cpf === cpf ||
                conta.usuario.email === email
            ) {
                return res.status(400).json({
                    "mensagem": "Já existe uma conta com o CPF ou e-mail informado!"
                });
            }
        }
    }

    return next();
};

const verificarDadosInválidos = (req, res, next) => {
    const { cpf, email } = req.body;

    if (cpf.length !== 11) {
        return res.status(400).json(
            {
                "mensagem": "CPF inválido"
            });
    }
    return next();
};

module.exports = {
    verificarDadosIguais,
    verificarDadosInválidos
};


