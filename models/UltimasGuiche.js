
const db = require('./db'); // importa o módulo db.js

const UltimasGuiche = db.sequelize.define('ultimas_guiches', { // cria um modelo de tabela no banco de dados # postagens = nome da tabela

    senha:{
            type: db.Sequelize.STRING
    },
    tipo_senha:{
               type: db.Sequelize.STRING
     },
     id_guiche:{
                type: db.Sequelize.STRING
     }
});


UltimasGuiche.sync({force: true}); // cria a tabela postagens no banco de dados # force: true = apaga a tabela se ela já existir e a cria novamente

module.exports = UltimasGuiche; // exporta o módulo