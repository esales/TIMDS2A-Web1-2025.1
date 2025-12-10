const express = require('express');
const exphbs = require('express-handlebars');
const bd = require('./config/bd');
const models = require('./models');

const app = express();

app.engine('hbs', exphbs.engine({ defaultLayout: false }));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.render('principal');
});

app.post('/medico', async (req, res) => {
    const nome = req.body.nome;
    const especialidadeIds = req.body.especialidades; 

    const medico = await models.Medico.create({ nome });
    const especialidades = await models.Especialidade.findAll({
        where: { id: especialidadeIds }
    });
    await medico.addEspecialidades(especialidades);

    res.redirect('/medico');
});

app.get('/medico/', async (req, res) => {
    let medicos = await models.Medico.findAll({include: [{model: models.Especialidade, as: 'especialidades'}]});

    medicos = medicos.map(m => m.get({ plain: true }));

    res.render('listarMedicos', { medicos });
});

app.get('/medico/novo', async (req, res) => {
    const especialidades = await models.Especialidade.findAll({raw: true});
    res.render('cadastrarMedico', { especialidades });
});

app.post('/especialidade', async (req, res) => {
    const descricao = req.body.descricao;
    await models.Especialidade.create({ descricao });
    res.redirect('/especialidade');
});

app.get('/especialidade/', async (req, res) => {
    const especialidades = await models.Especialidade.findAll({raw: true});
    res.render('listarEspecialidades', { especialidades });
});

app.get('/especialidade/novo', (req, res) => {
    res.render('cadastrarEspecialidade');
});

app.post('/paciente', async (req, res) => {
    const nome = req.body.nome;
    const descricao = req.body.descricao;

    await models.Paciente.create({
        nome,
        prontuario: { descricao: descricao }
    },
    { include: ['prontuario'] }
    );

    res.redirect('/paciente');
});

app.get('/paciente/', async (req, res) => {
    let pacientes = await models.Paciente.findAll({include: ['prontuario']});
    pacientes = pacientes.map(p => p.get({ plain: true }));
    
    res.render('listarPacientes', { pacientes });
});

app.get('/paciente/novo', (req, res) => {
    res.render('cadastrarPaciente');
});

app.post('/consulta', async (req, res) => {
    const pacienteId = req.body.pacienteId;
    const medicoId = req.body.medicoId;
    const hora = req.body.hora;

    await models.Consulta.create({
        hora,
        pacienteId,
        medicoId
    });

    const teste = await models.Consulta.findAll({include: ['paciente', 'medico']});
    console.log(teste);

    res.redirect('/consulta');
});

app.get('/consulta/', async (req, res) => {
    let consultas = await models.Consulta.findAll({include: ['paciente', 'medico']});
    consultas = consultas.map(c => c.get({ plain: true }));
    res.render('listarConsulta', { consultas });
});

app.get('/consulta/novo', async (req, res) => {
    const pacientes = await models.Paciente.findAll({raw: true});
    const medicos = await models.Medico.findAll({raw: true});
    res.render('cadastrarConsulta', { pacientes, medicos });
});

bd.sync().then(() => {
    console.log('Banco de dados sincronizado.');
}).catch((e) => {
    console.error('Erro ao sincronizar o banco de dados:', e);
});


app.listen(3000, () => {
    console.log('Servidor em execução: http://localhost:3000');
});