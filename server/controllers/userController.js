const ApiError = require('../error/ApiErrors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

const generateJwt = (last_name, id, email) => {
    return jwt.sign(
        { last_name: last_name, id: id, email: email },
        process.env.SECRET_KEY,
        { expiresIn: '24h' });
}

class UserController {
    async registraion(req, res, next) {
        const { last_name, email, password } = req.body;
        if (!last_name || !email || !password) {
            return next(ApiError.badRequst('Неккоректный email или пароль'));
        }

        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.internal('Пользователь с таким email уже существует'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ last_name, email, password: hashPassword });
        const jwt_token = generateJwt(user.last_name, user.id, user.email);
        return res.json({ jwt_token });
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequst('Неккоректный email или пароль'));
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal("Пользователь с таким логином не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal("Указан неверный логин или пароль"));
        }
        const token = generateJwt(user.last_name, user.id, user.email);
        return res.json({ token });
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.last_name, req.user.id, req.user.email);
        return res.json({ token });
    }

    async update(req, res, next) {
        try {
            const { id, ...updateParams } = req.body;
            const updatedObject = await User.update(
                updateParams,
                {
                    where: {
                        id: id
                    }
                }
            );

            if (updatedObject[0] === 0 || !id) {
                return next(ApiError.badRequst('Объект не найден'));
            }
            const token = generateJwt(updateParams.last_name, id, updateParams.email);
            return res.json({ token });
        } catch (error) {
            console.error('Error updating object:', error);
            return next(ApiError.internal('Объект не найден'));
        }
    }

    async getOne(req, res) {
        const { id } = req.params;
        const apartment = await User.findOne({
            where: { id },
        }
        );
        return res.json(apartment);
    }
}

module.exports = new UserController();