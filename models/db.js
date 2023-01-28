const Sequelize = require('sequelize'); // importa o módulo sequelize PARA CONECTAR COM O BANCO DE DADOS
    //CONEXAO COM BANCO DE DADOS
const sequelize = new Sequelize('painel_host','root','xjhow',{ // cria uma instância do sequelize para conectar ao banco de dados # TESTCONODE = nome do banco de dados, root = usuário, xjhow = senha
        dialect: 'sqlite',
        storage: './database.sqlite'
});

module.exports = {          // exporta o módulo
    Sequelize: Sequelize,   // exporta o módulo Sequelize para ser usado em outros arquivos
    sequelize: sequelize    // exporta a instância do sequelize para ser usado em outros arquivos
}
