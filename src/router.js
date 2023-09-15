const express = require('express');
const date = require('date-fns');

const { listarContaBancaria, criarContaBancaria, atualizarUsuario, deletarConta, depositar, sacar, transferir, saldo, extrato } = require('./controllers/contaBancaria');
const { verificarSenha } = require('./middleware/verificarSenha');
const { verificarDadosIguais, verificarDadosInválidos } = require('./middleware/verificarDadosIguais');

const router = express.Router();

router.get('/contas/extrato', extrato);
router.get('/contas/saldo', saldo);
router.get('/contas/:senha_banco', verificarSenha, listarContaBancaria);
router.post('/contas/:senha_banco', verificarSenha, verificarDadosIguais, verificarDadosInválidos, criarContaBancaria);
router.put('/contas/:numeroConta/usuario', verificarDadosIguais, verificarDadosInválidos, atualizarUsuario);
router.delete('/contas/:numeroConta', deletarConta);
router.post('/transacoes/depositar', depositar);
router.post('/transacoes/sacar', sacar);
router.post('/transacoes/transferir', transferir);


module.exports = router;

