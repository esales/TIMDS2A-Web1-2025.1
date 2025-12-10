const sequelize = require('../config/bd');
const { DataTypes } = require('sequelize');

const Medico = sequelize.define('medico',{
    nome: {
        type : DataTypes.STRING,
        allowNull: false
    },    
});

module.exports = Medico;