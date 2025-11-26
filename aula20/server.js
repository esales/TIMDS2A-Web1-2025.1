const express = require('express');
const exphbs = require('express-handlebars');

const db = require('./config/database');
const Pessoa = require('./models/pessoa.model');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');

let pessoas = [
  { id: 1, nome: "Pessoa 1" },
  { id: 2, nome: "Pessoa 2" },
  { id: 3, nome: "Pessoa 3" },
];

app.get('/', (req, res) => res.render('home'));

app.get('/pessoas', async (req, res) => {
  try{
    let pessoas = await Pessoa.findAll({raw: true});

    res.render('listarPessoas', { pessoas });
  } catch(e){
    console.log(e.message);
    res.status(500).send('Erro ao buscar pessoas');
  }
});

app.get('/pessoas/nova', (req, res) => res.render('cadastrarPessoa'));

app.get('/pessoas/ver/:id', async (req, res) => {
  try{
    let pessoa = await Pessoa.findByPk(req.params.id, {raw: true});

    res.render('detalharPessoa', { pessoa });
  } catch(e){
    console.log(e.message);
    res.status(500).send('Erro ao buscar pessoa');
  }
});

app.get('/pessoas/:id/editar', async (req, res) => {
  try{
    let pessoa = await Pessoa.findByPk(req.params.id, {raw: true});

    res.render('editarPessoa', { pessoa });

  } catch(e){
    console.log(e.message);
    res.status(500).send('Erro ao buscar pessoa');
  }
});

app.post('/pessoas', async (req, res) => {
  
  try {
    await Pessoa.create({ nome: req.body.nome });

    res.redirect('/pessoas');
  } catch(e){
    console.log(e.message);
    res.status(500).send('Erro ao cadastrar pessoa');
  }
});

app.post('/pessoas/:id/editar/', async (req, res) => {
  try{
    let pessoa = await Pessoa.findByPk(req.params.id);

    pessoa.nome = req.body.nome;
    await pessoa.save();

    res.redirect('/pessoas');
  } catch(e){
    console.log(e.message);
    res.status(500).send('Erro ao editar pessoa');
  }
});

app.post('/pessoas/excluir/:id', async (req, res) => {
  try{
    const pessoa = await Pessoa.findByPk(req.params.id);
    
    await pessoa.destroy();
    
    res.redirect('/pessoas');
  } catch(e){
    console.log(e.message);
    res.status(500).send('Erro ao excluir pessoa');
  }
});

db.sync()
  .then(() => {
    console.log('Banco de dados sincronizado');
  })
  .catch(erro => {
    console.log('Erro ao conectar com banco de dados: ' + erro.message);
  });

app.listen(port, () => {
  console.log(`Servidor em execução: http://localhost:${port}`);
});