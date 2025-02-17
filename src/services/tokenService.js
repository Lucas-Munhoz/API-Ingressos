const jwt = require('jsonwebtoken');

exports.criarToken = (usuario) => {
    const payload = {
        id: usuario.id,
        email: usuario.email,
        isAdmin: usuario.isAdmin,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIME });
};