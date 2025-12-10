const sequelize = require('../config/bd');
const { DataTypes } = require('sequelize');

const Prontuario = sequelize.define('prontuario',{
    descricao: {
        type: DataTypes.STRING
    }
});

module.exports = Prontuario;