
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




module.exports = Adm; // exporta o módulo