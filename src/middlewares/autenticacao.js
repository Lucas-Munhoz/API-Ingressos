const jwt = require('jsonwebtoken');

exports.autenticaToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(' ')[1];
    const tokenCookie = req.cookies.token;

    if(!token && !tokenCookie){
        return res.status(401).json({ message: 'Acesso negado' });
    }

    if(!token){
        token = tokenCookie;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if(err) {
            if(err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expirado!' });
            }
            return res.status(403).json({ message: 'Token inválido!' });
        }

        req.usuario = usuario;
        next();
    })
}

exports.verificaAdmin = (req, res, next) => {
    this.autenticaToken(req, res, () => {
        if(!req.usuario.isAdmin) {
            return res.status(403).json({ message: 'Acesso negado: Rota exclusiva para ADMINISTRADORES!!!' });
        }

        next();
    });
};
