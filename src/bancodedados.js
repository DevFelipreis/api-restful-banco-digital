const express = require('express');
const date = require('date-fns');

const bancodedados = {
    banco: {
        nome: 'Cubos Bank',
        numero: '123',
        agencia: '0001',
        senha: 'Cubos123Bank'
    },
    contas: [
        {
            "numero": "1",
            "saldo": 10000,
            "usuario": {
                "nome": "Foo Bar",
                "cpf": "00011122233",
                "data_nascimento": "2021-03-15",
                "telefone": "71999998888",
                "email": "foo@bar.com",
                "senha": "1234"
            }
        },
        {
            "numero": "2",
            "saldo": 1000,
            "usuario": {
                "nome": "Foo Bar 2",
                "cpf": "00011122234",
                "data_nascimento": "2021-03-15",
                "telefone": "71999998888",
                "email": "foo@bar2.com",
                "senha": "12345"
            },

        }
    ],
    saques: [
        {
            "data": "2021-08-18 20:46:18",
            "numero_conta": "1",
            "valor": 1000
        },
        {
            "data": "2021-08-18 20:46:18",
            "numero_conta": "2",
            "valor": 500
        }
    ],
    depositos: [
        {
            "data": "2021-08-18 20:46:03",
            "numero_conta": "1",
            "valor": 10000
        },
        {
            "data": "2021-08-18 20:46:06",
            "numero_conta": "1",
            "valor": 10000
        }
    ],
    transferencias: [
        {
            "data": "2021-08-18 20:47:24",
            "numero_conta_origem": "2",
            "numero_conta_destino": "1",
            "valor": 2000
        },
        {
            "data": "2021-08-18 20:47:26",
            "numero_conta_origem": "2",
            "numero_conta_destino": "1",
            "valor": 2000
        }
    ]
};

let numero = 0;

if (bancodedados.contas.length === 0) {
    numero = 0;
} else {
    const primeiroIndice = 0;
    const ultimoIndice = bancodedados.contas[primeiroIndice].length - 1;
    if (bancodedados.contas[primeiroIndice] && bancodedados.contas[primeiroIndice][ultimoIndice]) {
        const ultimoNumeroConta = bancodedados.contas[primeiroIndice][ultimoIndice].numero;
        if (ultimoNumeroConta) {
            numero = Number(ultimoNumeroConta);
        }
    }
}

module.exports = {
    bancodedados,
    numero
}