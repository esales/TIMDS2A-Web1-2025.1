const sequelize = require('../config/bd');
const { DataTypes } = require('sequelize');

const Especialidade = sequelize.define('especialidade',{
    descricao: {
        type: DataTypes.STRING
    }
});

module.exports = Especialidade;