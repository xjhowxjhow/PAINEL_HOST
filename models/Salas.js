const db = require('./db'); // importa o módulo db.js


const  Salas = db.sequelize.define('salas', { // cria um modelo de tabela no banco de dados # postagens = nome da tabela

        nome:{
                type: db.Sequelize.STRING
        },
        descricao:{
                    type: db.Sequelize.STRING
            },
        status_sala:{
                    type: db.Sequelize.INTEGER
            },
        tipo_sala:{
                        type: db.Sequelize.STRING
                },

});




//Salas.sync({force: true}); // cria a tabela postagens no banco de dados # force: true = apaga a tabela se ela já existir e a cria novamente

module.exports = Salas; // exporta o módulo


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
        Salas.sync({force: true}); //
        
}
        