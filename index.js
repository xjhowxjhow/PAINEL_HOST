
// status senhas
// 0 = senha em espera guiiche (mostar no painel)
// 1 = senha em atendimento guiche
// 2 = senha em espera sala (mostar no painel)
// 3 = senha em atendimento sala
// 4 = finalizada

const moment = require('moment');
const { Op } = require('sequelize');

function localTime() {

    return moment().format('HH:mm:ss');
}



setInterval(function () {
    //console.log(localTime());
    if (localTime() == '00:00:00') {
        console.log('hora de zerar');
        // deleta toddas as senhas que estejam com status 4
        Post.destroy({
            where: {
                status_senha: 4
            }
        });

    }
}, 1000);






const express = require('express');	                                            // importa o módulo express # express = framework
const app = express();	                                                        // cria uma instância do express const para nao ser sobrescrita por outra variável  PARA RODAR O SERVIDOR DIGITE NO TERMINAL node index.js
const handlebars = require('express-handlebars');	                            // importa o módulo handlebars PARA TRABALHAR COM HTML
const bodyParser = require('body-parser');	                                    // importa o módulo body-parser PARA TRABALHAR COM FORMULARIOS

// Models
const Post = require('./models/Posts');
const Salas = require('./models/Salas');
const Giches = require('./models/Giches');
const UltimasGuiche = require('./models/UltimasGuiche');
const UltimasSala = require('./models/UltimasSala');
const Adm = require('./models/adm');

// socket.io 
const Socket = require('socket.io');                                            // importa o módulo socket.io
const { truncate } = require('fs');
const { where } = require('sequelize');
const Server = require('http').Server(app);                                     // cria um servidor HTTP usando o objeto app como middleware
const io = Socket(Server);                                                      // Inicie o Socket.io usando o servidor HTTP criado acima







app.engine('hbs', handlebars.engine({ defaultLayout: 'main' }));
app.set('views', __dirname + '/views/');
app.set('view engine', 'hbs');

//configurar operadores de comparação do handlebars
var hbs = handlebars.create({});
hbs.handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});





// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.urlencoded({extended: true}))
// app.use(express.json())

// cria usuario e senha adm 
Adm.sync({ force: true }).then(function () {
    Adm.create({
        usuario: 'admin',
        senha: 'adminsispainel'
    });
});


//enviar arquivos estaticos
app.use(express.static(__dirname + '/public'));
//envia css e js para o handlebars

app.get('/', function (req, res) {
    res.render('main_device/select_device');	                                        // renderiza a pagina painel_device.handlebars

});


// pega eventos 



// inicio administrador

app.get('/config_adm', function (req, res) {
    //giches
    Giches.findAll().then(function (giches_actives) {
        console.log(giches_actives);
        res.render('adm/config_adm', { giches_actives: giches_actives });	// renderiza a pagina config_adm.handlebars                                       
    });
});
app.get('/config_adm_salas', function (req, res) {
    //salas
    console.log('entrou');
    Salas.findAll().then(function (salas_actives) {
        console.log(salas_actives);
        res.render('adm/config_adm_salas', { salas_actives: salas_actives });	// renderiza a pagina config_adm.handlebars
    });
});

app.get('/config_adm_painel', function (req, res) {
    res.render('adm/config_adm_painel');	// renderiza a pagina config_adm.handlebars
});





// cria novo guiche
app.post('/add_new_guiche', function (req, res) {
    //recebe dados via requisao do javascript e salva no banco de dados
    console.log(req.body.guiche);
    console.log(req.body.desc);
    Giches.create({
        nome: req.body.guiche,
        descricao: req.body.desc,
        status_giche: 0
    }).then(function () {
        res.send('ok');
    }).catch(function (erro) {
        res.send('error ' + erro);
    });
});

// deleta guiche
app.post('/delete_guiche', function (req, res) {
    //recebe dados via requisao do javascript e salva no banco de dados
    console.log(req.body.id_guiche);
    Giches.destroy({
        where: { 'id': req.body.id_guiche }
    }).then(function () {
        res.send('ok');
    }).catch(function (erro) {
        res.send('error ' + erro);
    });
});

// cria nova sala
app.post('/add_new_sala', function (req, res) {
    //recebe dados via requisao do javascript e salva no banco de dados
    console.log(req.body.sala);
    console.log(req.body.desc);
    Salas.create({
        nome: req.body.sala,
        tipo_sala: req.body.desc,
        status_sala: 0
    }).then(function () {
        res.send('ok');
    }).catch(function (erro) {
        res.send('error ' + erro);
    });
});

// deleta sala
app.post('/delete_sala', function (req, res) {
    //recebe dados via requisao do javascript e salva no banco de dados
    console.log(req.body.id_sala);
    Salas.destroy({
        where: { 'id': req.body.id_sala }
    }).then(function () {
        res.send('ok');
    }).catch(function (erro) {
        res.send('error ' + erro);
    });
});

// fim administrador


app.get('/painel_req', function (req, res) {
    res.render('painel_req');
});
//senhas que ja foram chamadas por status_senha = 1 por ordem data DESC    
//painel recepcao                         
app.get('/painel_view', function (req, res) {
    // pege todas as senhas ques eja diferente de 0 3 e 4   
    UltimasGuiche.findAll({ order: [['updatedAt', 'DESC']] }).then(function (ultimas_guiche) {
        // PEGA O INDEX 0 PARA VER O NOME DO GUICHE QUE ESTA SENDO CHAMADO pelo id
        if (ultimas_guiche.length > 0) {
            Giches.findOne({ where: { 'id': ultimas_guiche[0].id_guiche } }).then(function (guiche) {
                // envia o nome do guiche para o painel
                res.render('painel/painel_view', { ultimas_guiche: ultimas_guiche, guiche: guiche.nome });
            });

        } else {
            res.render('painel/painel_view', { ultimas_guiche: ultimas_guiche, guiche: '' });

        }


        //console.log(posts_edit);
    });
});

//painel salas
app.get('/painel_salas', function (req, res) {
    UltimasSala.findAll({ order: [['updatedAt', 'DESC']] }).then(function (ultimas_salas) {

        if (ultimas_salas.length > 0) {

            Post.findOne({ where: { 'senha': ultimas_salas[0].senha } }).then(function (posts) {
                res.render('painel/painel_salas', { ultimas_salas: ultimas_salas, posts: posts });
            });

        } else {
            const posts = 10;
            res.render('painel/painel_salas', { ultimas_salas: ultimas_salas, posts });
            console.log('Sem senhas para serem chamadas');
        }
    }
    );
});



// visualiza guiches disponiveis

app.get('/view_guiche', function (req, res) {
    //recebe dados via requisao do javascript e salva no banco de dados
    console.log('asdasd');
    Giches.findAll().then(function (guiche) {

        //res.status(200).send(guiche);	// renderiza a pagina config_adm.handlebars
        //res.status(200).send(guiche);	// renderiza a pagina config_adm.handlebars
        res.render('guiches/view_guiche_render', { guiche: guiche });	// renderiza a pagina config_adm.handlebars

        //res.render('giches/view_guiche', {guiche: guiche});	// renderiza a pagina config_adm.handlebars                                                                        
    });
});

// visualiza salas disponiveis
app.get('/view_salas', function (req, res) {
    //recebe dados via requisao do javascript e salva no banco de dados
    console.log('asdasd');
    Salas.findAll().then(function (salas) {

        res.render('salas/view_salas_render', { salas: salas });	// renderiza a pagina config_adm.handlebars

        //res.render('giches/view_guiche', {guiche: guiche});	// renderiza a pagina config_adm.handlebars                                                                        
    });
});



app.get('/sala_newatendi/:id', function (req, res) {

    // verifica primeiro se existe a sala com o id passado
    Salas.findOne({ where: { id: req.params.id } }).then(function (sala) {
        if (sala != undefined) {


            console.log('sala de atendimento' + req.params.id + 'entrou');
            //pega o nome da sala ex: sala 1
            Salas.findOne({ where: { id: req.params.id } }).then(function (sala) {
                //pega todas as senhas com status 2 do tipo da sala
                console.log('Nome Sala de atendimento: ' + sala.tipo_sala);

                Post.findAll({ where: { status_senha: '2', tipo_sala: sala.id }, order: [['id', 'ASC']] }).then(function (posts_edit) {

                    Salas.findAll().then(function (salas_actives) {

                        //conta todas as senhas preferenciais e comum    
                        const salas_acti = salas_actives;
                        const posts = posts_edit;
                        const qtd_senha_pref = posts.filter(function (post) {
                            return post.tipo_senha == 'preferencial';
                        }).length;
                        const qtd_senha_comum = posts.filter(function (post) {
                            return post.tipo_senha == 'comum';
                        }).length;
                        //console.log(posts);
                        console.log(qtd_senha_pref);
                        console.log(qtd_senha_comum);
                        res.render('salas/sala_newatendi', { posts: posts, qtd_senha_pref: qtd_senha_pref, qtd_senha_comum: qtd_senha_comum, sala: sala, id_sala: req.params.id, salas_acti: salas_acti });
                    });



                });
            });
            // Update Status sala para 1
            Salas.update({ status_sala: '1' }, { where: { id: req.params.id } }).then(function () {
                console.log('Status da sala ' + req.params.id + ' atualizado para 1');
            });
        } else {
            res.redirect('/');
        }

    });
});











//chama senhas do totem
app.get('/recep_newatendi/:id', function (req, res) {

    console.log(req.params.id);

    Post.findAll({ where: { status_senha: '0' }, order: [['id', 'ASC']] }).then(function (posts_edit) {
        // pega todas as salas e salva em uma variavel
        Salas.findAll().then(function (salas_actives) {
            Giches.findAll().then(function (guiches_actives) {
                // pega o nome e descricao do guiche
                Giches.findOne({ where: { id: req.params.id } }).then(function (guiche) {
                    const desc = guiche.descricao;
                    const nome = guiche.nome;
                    //conta todas as senhas preferenciais e comum    
                    const salas = salas_actives;
                    const posts = posts_edit;
                    const qtd_senha_pref = posts.filter(function (post) {
                        return post.tipo_senha == 'preferencial';
                    });
                    const qtd_senha_comum = posts.filter(function (post) {
                        return post.tipo_senha == 'comum';
                    });
                    console.log(qtd_senha_pref.length);
                    console.log(qtd_senha_comum.length);
                    //console.log(posts_edit);
                    res.render('guiches/recep_newatendi', {
                        posts: posts_edit,
                        salas: salas_actives,
                        qtd_senha_pref: qtd_senha_pref.length,
                        qtd_senha_comum: qtd_senha_comum.length,
                        id: req.params.id,
                        nome: nome,
                        desc: desc
                    });

                });
            });

        });
    });

    //atualiza status do guiche para 1
    Giches.update({
        status_giche: 1
    }, {
        where: { 'id': req.params.id }
    }).then(function () {
        console.log('ok');
    }
    ).catch(function (erro) {
        console.log('error ' + erro);
    }
    );
});


// verifica se existe senha com status_senha = 1  e com o id do guiche 
app.post('/verifica_senha_guiche', function (req, res) {
    console.log('guiche:', req.body.id_guiche);
    Post.findOne({ where: { status_senha: '1', id_status_giche: req.body.id_guiche } }).then(function (posts_active) {

        var posts = posts_active;
        if (posts != null) {

            // encaminho 

            res.status(200).send(posts_active);
        } else {

            res.status(200).send('error');
        }
    });
});
// verifica se existe senha com status_senha = 3 e com o id do guiche 
app.post('/verifica_senha_sala', function (req, res) {
    console.log('guiche:', req.body.id_sala);
    Post.findOne({ where: { status_senha: '3', id_status_sala: req.body.id_sala } }).then(function (posts_active) {

        var posts = posts_active;
        if (posts != null) {

            // encaminho 

            res.status(200).send(posts_active);
        } else {

            res.status(200).send('error');
        }
    });
});



// pagina fila de espera
app.get('/fila_espera_guiche:id', function (req, res) {
    Post.findAll({ where: { status_senha: '0' }, order: [['id', 'ASC']] }).then(function (posts_edit) {
        res.render('guiches/recep_fila_espera', { posts: posts_edit, id: req.params.id });


    });

});

app.get('/fila_espera_sala:id', function (req, res) {
    Post.findAll({ where: { status_senha: '2', tipo_sala: req.params.id }, order: [['id', 'ASC']] }).then(function (posts_edit) {
        Salas.findOne({ where: { id: req.params.id } }).then(function (sala) {
            res.render('salas/sala_fila_espera', { posts: posts_edit, id: req.params.id, sala: sala });
        });
    });
});




//funcoes guiche

//fecha guiche
app.post('/close_guiche', function (req, res) {
    //recebe dados via requisao do javascript e salva no banco de dados
    console.log(req.body.id_guiche);
    Giches.update({
        status_giche: 0
    }, {
        where: { 'id': req.body.id_guiche }
    }).then(function () {
        res.send('ok');
    }).catch(function (erro) {
        res.send('error ' + erro);
    });
});

app.post('/close_sala', function (req, res) {
    //recebe dados via requisao do javascript e salva no banco de dados
    console.log(req.body.id_sala + ' sala fechada');
    Salas.update({
        status_sala: 0
    }, {
        where: { 'id': req.body.id_sala }
    }).then(function () {
        res.send('ok');
    }).catch(function (erro) {
        res.send('error ' + erro);
    });
});





//chama senha preferencial
app.post('/respon_senha_preferencial', function (req, res) {
    const senha_comum = Post.findOne({ where: { status_senha: '0', tipo_senha: 'preferencial' }, order: [['createdat', 'ASC']] }).then(function (posts_edit) {
        //    update senha 

        if (posts_edit == null) {
            res.send('error');
        } else {
            // encaminha para o guiche
            Post.update({ status_senha: '1', historico_painel_guiche: '1', id_status_giche: req.body.id_guiche }, { where: { id: posts_edit.id } }).then(function () {
                console.log(posts_edit);
                res.status(200).send(posts_edit);
                // manda senha e tipo para o historico
                UltimasGuiche.create({
                    senha: posts_edit.senha,
                    tipo_senha: posts_edit.tipo_senha,
                    id_guiche: req.body.id_guiche

                }).then(function () {
                    console.log('ok');
                }).catch(function (erro) {
                    console.log('error ' + erro);
                });
            });
        }
    });
});

app.post('/respon_senha_preferencial_sala', function (req, res) {
    const senha_comum = Post.findOne({ where: { status_senha: '2', tipo_senha: 'preferencial' }, order: [['createdat', 'ASC']] }).then(function (posts_edit) {
        //    update senha 

        if (posts_edit == null) {
            res.send('error');
        } else {
            //encaminha para a sala
            Post.update({ status_senha: '3', historico_painel_sala: '2', id_status_sala: req.body.id_sala }, { where: { id: posts_edit.id } }).then(function () {
                console.log(posts_edit);
                res.status(200).send(posts_edit);
                // manda senha e tipo para o historico
                //pesquisa o nome da sala
                Salas.findOne({ where: { id: req.body.id_sala } }).then(function (sala_n) {
                    UltimasSala.create({
                        senha: posts_edit.senha,
                        tipo_senha: posts_edit.tipo_senha,
                        sala: sala_n.tipo_sala

                    }).then(function () {
                        console.log('ok');
                    }
                    ).catch(function (erro) {
                        console.log('error ' + erro);
                    }
                    );
                });
            });
        }
    });
});

//chama senha comum
app.post('/respon_comum_preferencial_sala', function (req, res) {

    const senha_comum = Post.findOne({ where: { status_senha: '2', tipo_senha: 'comum' }, order: [['createdat', 'ASC']] }).then(function (posts_edit) {
        //    update senha 

        if (posts_edit == null) {
            res.send('error');
        } else {
            //encaminha para a sala
            Post.update({ status_senha: '3', historico_painel_sala: '2', id_status_sala: req.body.id_sala }, { where: { id: posts_edit.id } }).then(function () {
                console.log(posts_edit);
                res.status(200).send(posts_edit);
                // manda senha e tipo para o historico
                Salas.findOne({ where: { id: req.body.id_sala } }).then(function (sala_n) {
                    UltimasSala.create({
                        senha: posts_edit.senha,
                        tipo_senha: posts_edit.tipo_senha,
                        sala: sala_n.tipo_sala,
                        nome: sala_n.nome

                    }).then(function () {
                        console.log('ok');
                    }
                    ).catch(function (erro) {
                        console.log('error ' + erro);
                    }
                    );
                });
            });
        }
    });
});

app.post('/respon_senha_comum', function (req, res) {
    const senha_comum = Post.findOne({ where: { status_senha: '0', tipo_senha: 'comum' }, order: [['createdat', 'ASC']] }).then(function (posts_edit) {
        //    update senha 
        //atualizar id_status_giche com o guiche atendido e status_senha para 1
        console.log('id para att o guiche da senha atendida: ' + req.body.id_guiche)
        if (posts_edit == null) {
            res.send('error');
        } else {
            // encaminha para o guiche
            Post.update({ status_senha: '1', historico_painel_guiche: '1', id_status_giche: req.body.id_guiche }, { where: { id: posts_edit.id } }).then(function () {
                console.log(posts_edit);
                res.status(200).send(posts_edit);
                // manda senha e tipo para o historico
                UltimasGuiche.create({
                    senha: posts_edit.senha,
                    tipo_senha: posts_edit.tipo_senha,
                    id_guiche: req.body.id_guiche

                }).then(function () {
                    console.log('ok');
                }
                ).catch(function (erro) {
                    console.log('error ' + erro);
                }
                );

            });
        }
    });
});




//destroi senha atendida abort 
app.post('/destroy_senha_guiche', function (req, res) {
    //recebe dados via requisao do javascript e salva no banco de dados

    console.log('id do guiche  para ser destruida: ' + req.body.id_guiche);

    console.log('acao para senha ' + req.body.action);

    var action = req.body.action;

    if (action == 'destroy') {

        Post.destroy({ where: { id_status_giche: req.body.id_guiche, status_senha: '1' } }).then(function () {
            res.send('ok');
        }).catch(function (erro) {
            res.send('error ' + erro);
        });
    }
    else if (action == 'volta') { // volta a senha para a fila de espera
        Post.update({ status_senha: '0', id_status_giche: null }, { where: { id_status_giche: req.body.id_guiche, status_senha: '1' } }).then(function () {
            res.send('ok');
        }).catch(function (erro) {
            res.send('error ' + erro);
        });
    }
});

// encaminha senha para sala de espera pega o nome do paciente e o id da senha e encerra o atendimento
app.post('/encaminha_senha_guiche', function (req, res) {
    //recebe dados via requisao do javascript e salva no banco de dados
    console.log('id do guiche que encaminhou o paciente: ' + req.body.id_guiche);
    console.log('id da senha: ' + req.body.id_senha);
    console.log('nome do paciente: ' + req.body.nome_cliente);
    console.log('id da sala: ' + req.body.encaminhar_para);

    console.log('chamar por nome ou numero: ' + req.body.chamar_por_current);
    //atualizar id_status_giche para null e status_senha para 2 e nome_paciente e para qual sala foi encaminhado e se quer chamar a senha por nome ou numero de senha
    Post.update({
        status_senha: '2',
        id_status_giche: null,
        nome_paciente: req.body.nome_cliente,
        tipo_sala: req.body.encaminhar_para,
        chamar_por: req.body.chamar_por

    }, { where: { id: req.body.id_senha } }).then(function () {

        res.send('ok');
    }
    ).catch(function (erro) {
        res.send('error ' + erro);
    });
});

app.post('/encaminha_senha_sala_sala', function (req, res) {

    console.log('id da sala que encaminhou o paciente: ' + req.body.id_sala);
    console.log('id da senha: ' + req.body.id_senha);
    console.log('nome do paciente: ' + req.body.nome_cliente);
    console.log('id da sala: ' + req.body.encaminhar_para);

    console.log('chamar por nome ou numero: ' + req.body.chamar_por_current);
    //atualizar id_status_giche para null e status_senha para 2 e nome_paciente e para qual sala foi encaminhado e se quer chamar a senha por nome ou numero de senha
    Post.update({
        status_senha: '2',
        id_status_sala: null,
        nome_paciente: req.body.nome_cliente,
        tipo_sala: req.body.encaminhar_para,
        chamar_por: req.body.chamar_por

    }, { where: { id: req.body.id_senha } }).then(function () {

        res.send('ok');
    }
    ).catch(function (erro) {
        res.send('error ' + erro);
    });
})

// finaliza atendimento da senha dentro da sala
app.post('/finaliza_senha_sala', function (req, res) {
    // seleciona a senha que esta sendo atendida do id da sala  
    var id_sala = req.body.id_sala;
    const senha_comum = Post.findOne({ where: { status_senha: '3', tipo_sala: id_sala }, order: [['createdat', 'ASC']] }).then(function (posts_edit) {
        console.log('id da sala: ' + req.body.id_sala);
        //    update senha para 4 e id_status_sala para null
        if (posts_edit == null) {
            res.send('error');
        } else {
            // encaminha para o guiche
            Post.update({ status_senha: '4', id_status_sala: null }, { where: { id: posts_edit.id } }).then(function () {
                res.status(200).send('ok');
            });
        }
    });
});

// destroi senha atendida abort sala
app.post('/destroy_senha_sala', function (req, res) {
    //recebe dados via requisao do javascript e salva no banco de dados
    console.log('id do sala  para ser destruida: ' + req.body.id_sala);

    console.log('acao para senha ' + req.body.action);

    var action = req.body.action;

    if (action == 'destroy') {

        Post.destroy({ where: { id_status_sala: req.body.id_sala, status_senha: '3' } }).then(function () {
            res.send('ok');
        }).catch(function (erro) {
            res.send('error ' + erro);
        });
    }
    else if (action == 'volta') { // volta a senha para a fila de espera
        Post.update({ status_senha: '2', id_status_sala: null }, { where: { id_status_sala: req.body.id_sala, status_senha: '3' } }).then(function () {
            res.send('ok');
        }).catch(function (erro) {
            res.send('error ' + erro);
        });
    }
});

//F5 com atendimento em andamento
app.post('/f5_guiche', function (req, res) {
    //recebe dados via requisao do javascript e salva no banco de dados
    console.log('apertou f5');
});




app.post('/request_senha_preferencial', function (req, res) {
    //senha
    console.log('que esta solicitando a senha');
    current_date = new Date();
    format = moment(current_date).format('YYYY-MM-DD');
    // select * from painel_hosts where createdAt  like '%2023-02-18%'
    console.log('data atual: ' + format);
    Post.findOne({ order: [['createdat', 'DESC']], where: { createdat: { [Op.like]: '%' + format + '%' } } }).then(function (posts_edit) {
        //verfica se tem senha
        if (posts_edit == null) {
            console.log('senha gerada pq nao tem senha: 1 0', posts_edit);
            var senha = 1;
        } else {      // passa senha para inteiro e soma mais 1
            var senha = parseInt(posts_edit.senha) + 1;
            console.log('senha gerada: ' + senha);
            // var senha = senha.toString();
            // var senha = senha+'P';
        }
        //salva no banco de dados
        Post.create({
            senha: senha,
            status_senha: 0,
            tipo_senha: 'preferencial'
        }).then(function () {
            console.log('senha preferencial gerada: ' + senha);
            res.send('Sua senha é: ' + senha);
        }).catch(function (erro) {
            res.send("Houve um erro: " + erro);
        });

    });
});





app.post('/request_senha_comum', function (req, res) {
    //senha

    current_date = new Date();
    format = moment(current_date).format('YYYY-MM-DD');
    // select * from painel_hosts where createdAt  like '%2023-02-18%'
    console.log('data atual: ' + format);
    Post.findOne({ order: [['createdat', 'DESC']], where: { createdat: { [Op.like]: '%' + format + '%' } } }).then(function (posts_edit) {
        //verfica se tem senha
        if (posts_edit == null) {
            var senha = 1;
        } else {      // passa senha para inteiro e soma mais 1
            console.log('ultima senha gerada: ' + posts_edit.senha);
            var senha = parseInt(posts_edit.senha) + 1;
        }
        //salva no banco de dados
        Post.create({
            senha: senha,
            status_senha: 0,
            tipo_senha: 'comum'
        }).then(function () {
            res.send('Sua senha é: ' + senha);
        }).catch(function (erro) {
            res.send("Houve um erro: " + erro);
        });

    });
});



// verifica usuario e senha admin
app.post('/login_adm', function (req, res) {
    //recebe dados via requisao do javascript e salva no banco de dados
    console.log('login: ' + req.body.login);
    console.log('senha: ' + req.body.senha);
    // verifica se o usuario e senha existe
    Adm.findOne({ where: { usuario: req.body.login, senha: req.body.senha } }).then(function (posts_edit) {
        if (posts_edit == null) {
            res.send('error');
        } else {
            res.send('ok');
        }
    });
});



// retorna quantidade de senhas em espera no guiches preferencial e comum

app.post('/qtd_senhas_guiche', function (req, res) {

    const preferencial = Post.count({ where: { status_senha: '0', tipo_senha: 'preferencial' } }).then(function (posts_edit) {
        if (posts_edit == null) {
            return 0;
        } else {
            return posts_edit;
        }

    });
    const comum = Post.count({ where: { status_senha: '0', tipo_senha: 'comum' } }).then(function (posts_edit) {
        if (posts_edit == null) {
            return 0;
        } else {
            return posts_edit;
        }

    });

    Promise.all([preferencial, comum]).then(function (values) {
        console.log(values);
        res.send(values);
        console.log('preferencial: ' + values[0]);
        console.log('comum: ' + values[1]);
    }
    );

});





io.on('connection', function (socket) {
    console.log('Um usuário conectou');
    // 
    socket.on('disconnect', function () {
        console.log('Um usuário desconectou');
    });
    socket.on('msg', function (data) {
        console.log(data);
        io.emit('showmsg', data);
    });
    socket.on('senha_emit', function (data) { // atualiza o painel dos funcionarios do guiche
        console.log('senha requisitada');
        io.emit('show_senha', data);
        console.log(data);
        if (data == 'att-painel-guiche') {
            io.emit('att-painel-guiche', data);
        }
    });
    socket.on('att-painel-view-recep', function (data) { // atualiza o painel de senhas da recepção
        console.log('senha chamada para atendimento atualizar o painel de senhas da recepção');
        io.emit('show_senha_painel_recepcao', data);
        console.log(data);
    });

    socket.on('encaminha_senha_guiche_p_sala', function (data) { // atualiza o painel dos funcionarios das salas de acordo com a sala
        console.log('senha encaminhada para sala: ' + data)
        io.emit('show_senha_painel_func_sala', data);
    });

    socket.on('att-painel-view-sala', function (data) { // atualiza o painel de senhas da recepção
        io.emit('show_senha_painel_sala', data);
        console.log(data);
    });

    socket.on('rechamar_guiche', function (data) { // atualiza o painel dos funcionarios das salas de acordo com a sala
        console.log('rechamar senha guiche: ' + data)
        io.emit('rechamar_senha_guiche', data);
    });

    socket.on('rechamar_sala', function (data) { // atualiza o painel dos funcionarios das salas de acordo com a sala
        console.log('rechamar senha sala: ' + data)
        io.emit('rechamar_senha_sala', data);

    });

});



app.post('/reset_senhas', function (req, res) {
    //recebe dados via requisao do javascript e salva no banco de dados
    console.log('reset senhas');
    Post.destroy({ truncate: true, cascade: false }).then(function () {
        //destroy sqlite_sequence
        res.send('ok');
    }).catch(function (erro) {
        res.send('error');
    });

});





Server.listen(3000, () => {
    console.log('Servidor rodando )');
});



module.exports = app;


