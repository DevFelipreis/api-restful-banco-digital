const express = require('express');
const date = require('date-fns');

const { bancodedados } = require('../bancodedados');
let { numero } = require('../bancodedados');

const listarContaBancaria = (req, res) => {
    return res.status(200).json(bancodedados);
}
const criarContaBancaria = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: 'O nome é obrigatório' });
    }
    if (!cpf) {
        return res.status(400).json({ mensagem: 'O cpf é obrigatório' });
    }
    if (!data_nascimento) {
        return res.status(400).json({ mensagem: 'A data de nascimento é obrigatória' });
    }
    if (!telefone) {
        return res.status(400).json({ mensagem: 'O telefone é obrigatório' });
    }
    if (!email) {
        return res.status(400).json({ mensagem: 'O email é obrigatório' });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha é obrigatória' });
    }

    let maiorNumeroConta = 0;
    for (const conta of bancodedados.contas) {
        const numeroConta = parseInt(conta.numero);
        if (numeroConta > maiorNumeroConta) {
            maiorNumeroConta = numeroConta;
        }
    }

    const proximoNumeroConta = maiorNumeroConta + 1;

    const contaNova = {
        numero: proximoNumeroConta.toString(),
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    };
    bancodedados.contas.push(contaNova);
    return res.status(201).json();
};

const atualizarUsuario = (req, res) => {
    const contaNumero = req.params.numeroConta;
    const novosDadosUsuario = req.body;

    const contaEncontrada = bancodedados.contas.find(conta => conta.numero === contaNumero);

    if (!contaEncontrada) {
        return res.status(404).json({
            mensagem: "A conta não foi encontrada!"
        });
    }

    contaEncontrada.usuario = { ...contaEncontrada.usuario, ...novosDadosUsuario };

    res.status(201).json();
};

const deletarConta = (req, res) => {
    const contaNumero = req.params.numeroConta;


    for (let i = 0; i < bancodedados.contas.length; i++) {
        const conta = bancodedados.contas[i];


        if (conta.numero === contaNumero) {

            if (conta.saldo === 0) {

                bancodedados.contas.splice(i, 1);
                return res.status(201).json();
            } else {
                return res.status(400).json({ mensagem: "A conta só pode ser removida se o saldo for zero" });
            }
        }
    }


    return res.status(404).json({ mensagem: "A conta não foi encontrada" });
};


const depositar = (req, res) => {
    const contaNumero = req.body.numero_conta;
    const valorDeposito = Number(req.body.valor);

    const contaEncontrada = bancodedados.contas.flat().find(conta => conta.numero === contaNumero);

    if (valorDeposito <= 0) {
        return res.status(400).json({ "mensagem": 'O valor do deposito não poder ser menor ou igual a zero' });
    }
    if (!contaNumero || !valorDeposito) {
        return res.status(400).json({ "mensagem": "O número da conta e o valor são obrigatórios!" });
    }

    if (!contaEncontrada) {
        return res.status(404).json({
            "mensagem": "A conta não foi encontrada!"
        });
    }

    contaEncontrada.saldo += valorDeposito;

    const novosDepositos =
    {
        data: new Date(),
        numero_conta: contaNumero,
        valor: valorDeposito
    };
    bancodedados.depositos.push(novosDepositos);

    return res.status(201).json();
};
const sacar = (req, res) => {
    const contaNumero = req.body.numero_conta;
    const valorSaque = Number(req.body.valor);
    const senha = req.body.senha;

    const contaEncontrada = bancodedados.contas.flat().find(conta => conta.numero === contaNumero);

    if (!contaEncontrada) {
        return res.status(400).json({ "mensagem": "A conta não foi encontrada!" });
    }

    if (valorSaque < 0) {
        return res.status(400).json({ "mensagem": "O valor não pode ser menor que zero!" });
    }

    if (!contaNumero || !valorSaque || !senha) {
        return res.status(400).json({ "mensagem": "O número da conta, o valor e a senha são obrigatórios!" });
    }

    if (contaEncontrada.saldo < valorSaque) {
        return res.status(400).json({ "mensagem": "Saldo insuficiente!" });
    }

    if (senha !== contaEncontrada.usuario.senha) {
        return res.status(404).json({ "mensagem": "A senha está inválida!" });
    }

    contaEncontrada.saldo -= valorSaque;

    const novosSaques = {
        data: new Date(),
        numero_conta: contaNumero,
        valor: valorSaque
    };

    bancodedados.saques.push(novosSaques);

    return res.status(201).json();
};

const transferir = (req, res) => {
    const numero_conta_origem = req.body.numero_conta_origem;
    const numero_conta_destino = req.body.numero_conta_destino;
    const valorTransferencia = Number(req.body.valor);
    const senha = req.body.senha;

    if (!numero_conta_origem || !valorTransferencia || !senha || !numero_conta_destino) {
        return res.status(400).json({ mensagem: "O número da conta de origem, a conta de destino, o valor e a senha são obrigatórios!" });
    }

    const contaEncontradaOrigem = bancodedados.contas.flat().find(conta => conta.numero === numero_conta_origem);
    const contaEncontradaDestino = bancodedados.contas.flat().find(conta => conta.numero === numero_conta_destino);

    if (!contaEncontradaOrigem) {
        return res.status(404).json({ mensagem: "A conta de origem não foi encontrada!" });
    }
    if (!contaEncontradaDestino) {
        return res.status(404).json({ mensagem: "A conta de destino não foi encontrada!" });
    }

    if (senha !== contaEncontradaOrigem.usuario.senha) {
        return res.status(400).json({ mensagem: "A senha está inválida!" });
    }

    if (contaEncontradaOrigem.saldo < valorTransferencia) {
        return res.status(400).json({ mensagem: "Saldo insuficiente!" });
    }

    contaEncontradaOrigem.saldo -= valorTransferencia;
    contaEncontradaDestino.saldo += valorTransferencia;

    const novasTransferencias = {
        data: new Date(),
        numero_conta_origem: numero_conta_origem,
        numero_conta_destino: numero_conta_destino,
        valor: valorTransferencia
    };
    bancodedados.transferencias.push(novasTransferencias);

    return res.status(201).json();
};

const saldo = (req, res) => {
    const { numero_conta, senha } = req.query;

    const contaEncontrada = bancodedados.contas.flat().find(conta => conta.numero === numero_conta);

    if (!contaEncontrada) {
        return res.status(404).json({
            mensagem: "Conta bancária não encontrada!"
        });
    }
    if (senha !== contaEncontrada.usuario.senha) {
        return res.status(400).json({ "mensagem": "Senha inválida!" });
    }

    const saldoConta = contaEncontrada.saldo;

    res.status(200).json({
        saldo: saldoConta
    });
};
const extrato = (req, res) => {
    const { numero_conta, senha } = req.query;

    const contaEncontrada = bancodedados.contas.flat().find(conta => conta.numero === numero_conta);

    if (!contaEncontrada) {
        return res.status(404).json({
            mensagem: "Conta bancária não encontrada!"
        });
    }
    if (senha !== contaEncontrada.usuario.senha) {
        return res.status(400).json({ "mensagem": "Senha inválida!" });
    }

    const depositosEncontrados = bancodedados.depositos.filter(deposito => deposito.numero_conta === numero_conta);
    const saquesEncontrados = bancodedados.saques.filter(saque => saque.numero_conta === numero_conta);
    const transferenciasEnviadasEncontradas = bancodedados.transferencias.filter(transferencias => transferencias.numero_conta_origem === numero_conta);
    const transferenciasRecebidasEncontradas = bancodedados.transferencias.filter(transferencias => transferencias.numero_conta_destino === numero_conta);

    const extratoCompleto = {
        depositos: depositosEncontrados,
        saques: saquesEncontrados,
        transferenciasEnviadas: transferenciasEnviadasEncontradas,
        transferenciasRecebidas: transferenciasRecebidasEncontradas
    };

    res.status(200).json(extratoCompleto);
};

module.exports = {
    listarContaBancaria,
    criarContaBancaria,
    atualizarUsuario,
    deletarConta,
    atualizarUsuario,
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
}
