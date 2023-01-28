
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


UltimasSala.sync({force: true}); // cria a tabela postagens no banco de dados # force: true = apaga a tabela se ela já existir e a cria novamente

module.exports = UltimasSala; // exporta o módulo