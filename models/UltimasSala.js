
const db = require('./db'); // importa o módulo db.js

const UltimasSala = db.sequelize.define('ultimas_salas', { // cria um modelo de tabela no banco de dados # postagens = nome da tabela

    senha:{
            type: db.Sequelize.STRING
    },
    tipo_senha:{
               type: db.Sequelize.STRING
     },
     sala:{
                type: db.Sequelize.STRING
     },
     nome:{
                type: db.Sequelize.STRING
        }
});


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
        UltimasSala.sync({force: true}); //
        
}
        


module.exports = UltimasSala; // exporta o módulo