const ingressoModel = require("../models/ingressoModel");

exports.listarIngressos = async (req, res) => {
    const { id } = req.params;

    try {
        const ingressos = await ingressoModel.listarIngressos(id);

        res.status(200).json(ingressos);
    }
    catch(error) {
        console.error("Erro ao listar ingressos : ", error);
        res.status(500).json({ mensagem: "Erro ao listar ingressos." });
    }
};

exports.buscarIngressoPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const ingresso = await ingressoModel.encontrarIngressoId(id);

        if(!ingresso) {
            return res.status(404).json({ mensagem: "Ingresso não encontrado." });
        }

        res.status(200).json(ingresso);
    }
    catch(error) {
        console.error("Erro ao buscar ingresso por ID: ", error);
        res.status(500).json({ mensagem: "Erro ao buscar ingresso." });
    }
};

exports.criarIngresso = async (req, res) => {
    const { nome, preco, quantidadeDisponivel } = req.body;

    try {
        const novoIngresso = await ingressoModel.cadastrarIngresso(nome, preco, quantidadeDisponivel);

        if(!novoIngresso) {
            return res.status(400).json({ mensagem: "Erro ao criar ingresso." });
        }

        res.status(201).json(novoIngresso);
    }
    catch(error) {
        console.error("Erro ao criar ingresso: ", error);
        res.status(500).json({ mensagem: "Erro ao criar ingresso." });
    }
};

exports.atualizarIngresso = async (req, res) => {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    try {
        const ingressoAtualizado = await ingressoModel.atualizarIngresso(id, dadosAtualizados);

        if(!ingressoAtualizado) {
            return res.status(404).json({ mensagem: "Ingresso não encontrado ou erro na atualização." });
        }

        res.status(200).json(ingressoAtualizado);
    }
    catch(error) {
        console.error("Erro ao atualizar ingresso: ", error);
        res.status(500).json({ mensagem: "Erro ao atualizar ingresso." });
    }
};

exports.excluirIngresso = async (req, res) => {
    const { id } = req.params;

    try {
        const ingresso = await ingressoModel.encontrarIngressoId(id);

        if(!ingresso) {
            return res.status(404).json({ mensagem: "Ingresso não encontrado." });
        }

        await ingressoModel.excluirIngresso(id);

        res.status(200).json({ mensagem: "Ingresso excluído com sucesso." });
    }
    catch(error) {
        console.error("Erro ao excluir ingresso: ", error);
        res.status(500).json({ mensagem: "Erro ao excluir ingresso." });
    }
};
