let Sequelize = require('sequelize');
let config = require('../config/index');

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbUserPass, {
    dialect: config.dbDialect,
    host: config.dbHost,
    port: config.dbPort
});

module.exports = sequelize;