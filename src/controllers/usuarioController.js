const usuarioModel = require("../models/usuarioModel");
const tokenService = require('../services/tokenService');

exports.cadastrarUsuario = async (req, res) => {
    const { isAdmin, nome, cpf, email, senha, ingressos } = req.body;
    const novoUsu = await usuarioModel.cadastrar(isAdmin, nome, cpf, email, senha, ingressos);

    if(!novoUsu) {
        return res.status(400).json({ mensagem: 'Erro ao criar usuário.' });
    }

    res.status(201).json(novoUsu);
};

exports.autenticarUsuario = async (req, res) => {
    const { email, senha } = req.body;
    const usu = await usuarioModel.autenticar(email, senha);

    if(!usu){
        return res.status(404).json({ message: 'Credenciais inválidas.' });
    }

    const token = tokenService.criarToken(usu);
    
    if(token == null){
        return res.status(400).json({ message: 'Erro ao gerar token de acesso!' });
    }

    res.cookie('token', token, { httpOnly: true, secure: false });
    res.redirect('/ingressos');
};

exports.comprarIngresso = async (req, res) => {
    const { usuarioId, ingressoId } = req.params;

    try {
        const usuarioAtualizado = await usuarioModel.comprarIngresso(usuarioId, ingressoId);

        if(!usuarioAtualizado) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }

        res.status(200).json(usuarioAtualizado);
    }
    catch(error) {
        console.error("Erro ao comprar ingresso: ", error);
        res.status(500).json({ mensagem: "Erro ao comprar ingresso." });
    }
};

exports.listarIngressosUsuario = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const usuario = await usuarioModel.ingressosUsuario(usuarioId);
        console.log(usuario)

        if(!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }

        res.status(200).json(usuario);
    }
    catch(error) {
        console.error("Erro ao listar ingressos do usuário: ", error);
        res.status(500).json({ mensagem: "Erro ao listar ingressos." });
    }
};