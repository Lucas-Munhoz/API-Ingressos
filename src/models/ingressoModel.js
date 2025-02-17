const mongoose = require("mongoose");

const ingressoSchema = new mongoose.Schema({
    nome: String,
    preco: Number,
    quantidadeDisponivel: Number
});

const ingressoModel = mongoose.model("Ingresso", ingressoSchema);

module.exports = {
    cadastrarIngresso: async function (nome, preco, quantidadeDisponivel) {
        const ingresso = new ingressoModel({ nome, preco, quantidadeDisponivel });
        await ingresso.save();
        return ingresso;
    },

    atualizarIngresso: async function (id, obj) {
        let ingresso = await ingressoModel.findById(id);
        if (!ingresso) {
            return false;
        }

        Object.keys(obj).forEach(key => ingresso[key] = obj[key]);
        await ingresso.save();
        return ingresso;
    },

    excluirIngresso: async function (id) {
        return await ingressoModel.deleteOne(id);
    },

    encontrarIngressoId: async function (id) {
        return await ingressoModel.findById(id).lean();
    },

    listarIngressos: async function () {
        return await ingressoModel.find().lean();
    }
};
