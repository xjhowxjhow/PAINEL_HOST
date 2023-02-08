

const db = require('./db'); // importa o módulo db.js

const Giches = db.sequelize.define('giches', { // cria um modelo de tabela no banco de dados # postagens = nome da tabela

    nome:{
            type: db.Sequelize.STRING
    },
    descricao:{
                type: db.Sequelize.STRING
        },
    status_giche:{
                type: db.Sequelize.INTEGER
        },
        
    
});



// funcoes do guiche

//funcao para fechar o guiche


const path = require('path');
const fs = require('fs');

const patch = process.cwd();
const dbPath = path.join(patch, 'database.sqlite');
console.log(patch);
console.log(dbPath);

// verifica se ja existe o banco de dados

if (fs.existsSync(dbPath)) {
        console.log('Database exists, skipping init.');
} else {
        console.log('Database does not exist, creating...');
        Giches.sync({force: true}); //
        
}
        


// verifica se a tabela postagens já existe no banco de dados
// se não existir, a tabela será criada
//Giches.sync({force: true}); // cria a tabela postagens no banco de dados # force: true = apaga a tabela se ela já existir e a cria novamente

module.exports = Giches; // exporta o módulo