const { Sequelize } = require('sequelize');


module.exports = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    },
})