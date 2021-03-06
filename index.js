const restify = require('restify');
const errs = require("restify-errors");
const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

//Conexão com Banco de Dados
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'your_database_user',
      password : 'your_database_password',
      database : 'myapp_test'
    }
  });

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});


//Listar Todos Usuários
server.get('/usuario',  (req, res, next) => {
    knex("USUARIO").then((dados) =>{
        res.send(dados);
    }, next)
});

//Pegar Informação de um único Usuário
server.get('/usuarioum/:id',  (req, res, next) => {
    const { id } = req.params;

    knex("USUARIO")
    .where("ID_USUARIO", id)
    .first()
    .then((dados) =>{
        if(!dados) return res.send(new errs.BadRequestError("Nada Encontrado"))
        res.send(dados);
    }, next)
});

//Atualizar Dados do Usuário
server.put('/usuarioup/:id',  (req, res, next) => {
    const { id } = req.params;

    knex("USUARIO")
    .where("ID_USUARIO", id)
    .update(req.body)
    .then((dados) =>{
        if(!dados) return res.send(new errs.BadRequestError("Nada Encontrado"))
        res.send("Usuário Atualizado");
    }, next)
});

server.del('/usuariodel/:id',  (req, res, next) => {
    const { id } = req.params;

    knex("USUARIO")
    .where("ID_USUARIO", id)
    .delete()
    .then((dados) =>{
        if(!dados) return res.send(new errs.BadRequestError("Nada Encontrado"))
        res.send("Usuário Excluido");
    }, next)
});

//Criar Novo Usuário
server.post('/usuarionew',  (req, res, next) => {
    knex("USUARIO")
    .insert(req.body)
    .then((dados) =>{
        res.send(dados);
    }, next)
});