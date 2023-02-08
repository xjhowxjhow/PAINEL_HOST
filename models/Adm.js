
const db = require('./db'); // importa o módulo db.js

const Adm = db.sequelize.define('adms', {
    usuario :{
            type: db.Sequelize.STRING
    },
    senha:{
            type: db.Sequelize.STRING
    }
});



// // cria table a e ja definie usuario e senha padrão
//Adm.sync({force: true});

// cria usuario e senha padrão

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
        Adm.sync({force: true}); //
        
}
        



module.exports = Adm; // exporta o módulo