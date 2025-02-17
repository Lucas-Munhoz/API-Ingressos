const express = require('express');

const usuarioController = require('../controllers/usuarioController');
const { autenticaToken } = require('../middlewares/autenticacao');

const router = express.Router();

router.post('/autenticacao', usuarioController.autenticarUsuario);
router.post('/cadastro', usuarioController.cadastrarUsuario);
router.get('/ingressos-usuario/:usuarioId', autenticaToken, usuarioController.listarIngressosUsuario);
router.put('/comprar-ingresso/:usuarioId/:ingressoId', autenticaToken, usuarioController.comprarIngresso);


module.exports = router;