const { Sequelize } = require('sequelize');
const bd = require('../config/bd');

const Consulta = require('./consulta.model');
const Especialidade = require('./especialidade.model');
const Medico = require('./medico.model');
const Paciente = require('./paciente.model');
const Prontuario = require('./prontuario.model');

//um para um
Paciente.hasOne(Prontuario, { 
    foreignKey: 'pacienteId', 
    as: 'prontuario' 
});

Prontuario.belongsTo(Paciente, { 
    foreignKey: 'pacienteId', 
    as: 'paciente' 
});

//um para muitos
Medico.hasMany(Consulta, { 
    foreignKey: 'medicoId', 
    as: 'consultas' 
});

Consulta.belongsTo(Medico, { 
    foreignKey: 'medicoId', 
    as: 'medico' 
});

Paciente.hasMany(Consulta, { 
    foreignKey: 'pacienteId', 
    as: 'consultas' 
});

Consulta.belongsTo(Paciente, { 
    foreignKey: 'pacienteId', 
    as: 'paciente' 
});

//muitos para muitos
Medico.belongsToMany(Especialidade, { 
    through: 'MedicoEspecialidade', 
    foreignKey: 'medicoId', 
    as: 'especialidades' 
});

Especialidade.belongsToMany(Medico, { 
    through: 'MedicoEspecialidade', 
    foreignKey: 'especialidadeId', 
    as: 'medicos' 
});

module.exports = {
    Consulta,
    Especialidade,
    Medico,
    Paciente,
    Prontuario
};