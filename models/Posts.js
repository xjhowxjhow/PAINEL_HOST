

const db = require('./db'); // importa o módulo db.js

const Post = db.sequelize.define('painel_hosts', { // cria um modelo de tabela no banco de dados # postagens = nome da tabela

    senha:{
            type: db.Sequelize.STRING
    },
    tipo_senha:{
               type: db.Sequelize.STRING
     },
     status_senha:{
               type: db.Sequelize.STRING
     },
     tipo_sala:{                                //formulario de cadastro
                 type: db.Sequelize.STRING
        },
     id_status_giche:{                                //formulario de cadastro
                        type: db.Sequelize.STRING
                  },
    nome_paciente:{                                //formulario de cadastro
                        type: db.Sequelize.STRING
                        },
    chamar_por:{                                //formulario de cadastro
               type: db.Sequelize.STRING
                                },
       id_status_sala:{                                //formulario de cadastro
                 type: db.Sequelize.STRING
       },
       historico_painel_guiche:{                                //formulario de cadastro
                        type: db.Sequelize.STRING
        },
        historico_painel_sala:{                                //formulario de cadastro
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
        Post.sync({force: true}); //
        
}
        



module.exports = Post; // exporta o módulo