const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    isAdmin: Boolean,
    nome: String,
    cpf: Number,
    email: String,
    senha: String,
    ingressos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingresso" }]
});

const usuarioModel = mongoose.model("Usuario", usuarioSchema);

module.exports = {
    cadastrar: async function ( isAdmin, nome, cpf, email, senha, ingressos) {
        const usuario = new usuarioModel({ isAdmin, nome, cpf, email, senha, ingressos });
        await usuario.save();
        return usuario;
    },

    ingressosUsuario: async function ( id ) {
        const usuario = await usuarioModel.findById(id).populate("ingressos").select("ingressos").lean();
        return usuario ? usuario.ingressos : null;
    },

    autenticar: async function (email, senha) {
        const usuario = await usuarioModel.findOne({ email, senha }).lean();
        return usuario;
    },

    comprarIngresso: async function (usuarioId, ingressoId) {
        const usuario = await usuarioModel.findById(usuarioId);
        if(!usuario) {
            return null;
        }

        usuario.ingressos.push(ingressoId);
        await usuario.save();
        return usuario;
    }
};
