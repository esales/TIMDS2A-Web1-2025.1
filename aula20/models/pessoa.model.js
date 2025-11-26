const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pessoa = sequelize.define('pessoa', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Pessoa;