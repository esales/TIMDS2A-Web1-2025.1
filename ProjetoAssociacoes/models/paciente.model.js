const sequelize = require('../config/bd');
const { DataTypes } = require('sequelize');

const Paciente = sequelize.define('paciente', {
    nome: {
        type: DataTypes.STRING
    }
});

module.exports = Paciente;