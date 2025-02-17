const express = require('express');

const ingressoController = require('../controllers/ingressoController');
const { autenticaToken, verificaAdmin } = require('../middlewares/autenticacao');

const router = express.Router();

router.get('/', autenticaToken, ingressoController.listarIngressos);
router.get('/:id', autenticaToken, ingressoController.buscarIngressoPorId);
router.post('/', autenticaToken, verificaAdmin, ingressoController.criarIngresso);
router.put('/:id', autenticaToken,  ingressoController.atualizarIngresso);
router.delete('/:id', autenticaToken, verificaAdmin, ingressoController.excluirIngresso);

module.exports = router;