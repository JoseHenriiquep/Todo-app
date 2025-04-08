const jwt = require('jsonwebtoken');

function checkAuth(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({ msg: "Token não fornecido" });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        res.status(400).json({ msg: "Token inválido!" })
    }
}

module.exports = checkAuth;