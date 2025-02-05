const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; //сначал помащают тип токена, а потом токен
        if (!token) {
            return res.status(401).json({ message: "Пользователь не авторизован" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY); //верификация токена
        req.user = decoded;
        next() //вызов следующих цепочек middleware
    } catch (e) {
        res.status(401).json({ message: "Пользователь не авторизован" });
    }
}