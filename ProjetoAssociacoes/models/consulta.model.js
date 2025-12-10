const sequelize = require('../config/bd');
const { DataTypes } = require('sequelize');

const Consulta = sequelize.define('consulta', {
    //como não é o foco do exemplo, para simplificar vamos colocar
    //hora como integer.
    hora:{
        type: DataTypes.INTEGER
    }
});

module.exports = Consulta;