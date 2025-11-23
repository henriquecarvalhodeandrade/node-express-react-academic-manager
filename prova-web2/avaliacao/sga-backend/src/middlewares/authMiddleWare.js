
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ erro: 'Não autorizado. Faça login para acessar este recurso.' });
    }
};

module.exports = isAuthenticated;