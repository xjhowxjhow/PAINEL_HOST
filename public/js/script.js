



//funcao documentgetelementbyid
const host_ip = window.location.hostname+':3000';
var status_guiche = false;
var status_sala = false;

//socket io


let socket = io.connect('http://'+host_ip+'');
socket.emit('connection', 'guiche conectado');
//recebe mensagem do servidor
socket.on('message', function(data){
    console.log(data);
});




// bloqueia transição de pagina
history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});


window.addEventListener("beforeunload", function(event) {
    xhttp.open("GET", "http://"+host_ip+"/f5_guiche", true);
    xhttp.send();

 });

function getElm(elm) {
    return document.getElementById(elm);
}




function voltar_main_choice_device(){
    url = 'http://'+host_ip+'/';
    return loadContent(url);
}






// funcao se a url comtem o nome recep_newatendi
function url_recep_newatendi(){
    console.log('VERIFICANDO SE EXISTE ATENDIMENTO NESTE GUICHE')
    let url = window.location.href;
    if (url.includes('recep_newatendi')){
        var id_guiche = getElm('identifi-guiche').getAttribute('value');
        console.log('GUICHE: ' + id_guiche);
        url_bkp_atendimento = 'http://'+host_ip+'/verifica_senha_guiche';

        let xhttp = new XMLHttpRequest();
        // method, url, async'
        xhttp.open("POST", url_bkp_atendimento, false);
        // headers
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // body
        xhttp.send("id_guiche="+id_guiche);//A execução do script pára aqui até a requisição retornar do servidor
         
        var response = xhttp.responseText;
        if (response != 'error'){
            console.log('ATENDIMENTO ENCONTRADO');
            status_guiche = true;
            //bkp_values = JSON.parse(response);
            
            // altera css do fichya group-ficha-redict para mostrar 
            getElm('group-ficha-redict').style.display = 'block';
            valuesJson = JSON.parse(response);
            console.log(valuesJson);
            getElm('value-form-guiche-tipo_senha').innerHTML = valuesJson.tipo_senha;
            getElm('id-senha-client-guiche').innerHTML = valuesJson.id;
            getElm('view-senha-client-guiche').innerHTML = valuesJson.senha;
            getElm('hora-created-senha').innerHTML = valuesJson.createdAt;

        }
        else{
            console.log('ATENDIMENTO NAO ENCONTRADO');
            console.log(response);
            return false;
        }
        

    }
    else{
        console.log('url nao recep_newatendi');
    }
}


function url_sala_newatendi(){
    console.log('VERIFICANDO SE EXISTE ATENDIMENTO NESTA SALA')
    let url = window.location.href;
    if (url.includes('sala_newatendi')){
        var id_sala = getElm('identifi-sala').getAttribute('value');
        console.log('GUICHE: ' + id_sala);
        url_bkp_atendimento = 'http://'+host_ip+'/verifica_senha_sala';

        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", url_bkp_atendimento, false);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("id_sala="+id_sala);//A execução do script pára aqui até a requisição retornar do servidor
         
        var response = xhttp.responseText;
        if (response != 'error'){
            console.log('ATENDIMENTO ENCONTRADO - SALA');
            status_sala = true;
            //bkp_values = JSON.parse(response);
            
            // altera css do fichya group-ficha-redict para mostrar 
            getElm('group-ficha-redict').style.display = 'block';
            valuesJson = JSON.parse(response);
            console.log(valuesJson);
            console.log('ta aqui?');
            getElm('value-form-sala-tipo_senha').innerHTML = valuesJson.tipo_senha;
            getElm('id-senha-client-sala').innerHTML = valuesJson.id;
            // converte em string valuesJson.senha
            senha = valuesJson.senha.toString();
            getElm('view-senha-client-sala').innerHTML = senha;
            getElm('hora-created-senha-sala').innerHTML = valuesJson.createdAt;
            getElm('nome-cliente-sala').innerHTML = valuesJson.nome_paciente;
        }
        else{
            console.log('ATENDIMENTO NAO ENCONTRADO');
            console.log(response);
            return false;
        }
        

    }
    else{
        console.log('url nao sala_newatendi');
    }
}



url_recep_newatendi();
url_sala_newatendi();



function choiceDevice(id_clk){
  let url_user= 'http://'+host_ip+'/painel_req';
  let url_adm = 'http://'+host_ip+'/painel_adm';
  let url_panel = 'http://'+host_ip+'/painel_view';
  let url_panel_salas = 'http://'+host_ip+'/painel_salas';
  let config_adm = 'http://'+host_ip+'/config_adm';
  let view_guiches = 'http://'+host_ip+'/view_guiche';
  let view_salas = 'http://'+host_ip+'/view_salas';

// adicione este elemento no seu HTML

  if (id_clk == 'device_btn_adm'){
    console.log('adm');
    loadContent(url_adm);
  }
  else if (id_clk == 'device_btn_user'){
    console.log('adm');
    loadContent(url_user);
  }
  else if (id_clk == 'device_btn_panel'){
    console.log('adm');
    window.location.href = url_panel
  }
  else if (id_clk == 'config_adm'){
    console.log('adm_master');
    url = 'http://'+host_ip+'/login_adm';
    // abre input de usuario e senha do navegador
    let login = prompt('Digite o usuario');
    let senha = prompt('Digite a senha');


    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("login="+login+"&senha="+senha);//A execução do script pára aqui até a requisição retornar do servidor
    var response = xhttp.responseText;
    if (response == 'error'){
        alert('Usuario ou senha incorretos');
        return false;
    }
    else{
        console.log(response);  
        window.location.href=config_adm
    }
    
    

  }
  else if (id_clk == 'enter_view_giches'){
    loadContent(view_guiches);
  }
  else if (id_clk == 'enter_view_salas'){
    loadContent(view_salas);
  }
  else if (id_clk == 'enter_panel_salas'){
    window.location.href =url_panel_salas;
  }
}

function loadContent(url) {
  let contentDiv = document.getElementById('contentdevice'); 
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      contentDiv.innerHTML = this.responseText;
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

//tela de login feycj
// function choiceDevice(id_clk){
//     let url_user= 'http://'+host_ip+'/painel_req';
//     let url_adm = 'http://'+host_ip+'/painel_adm';
//     let url_panel = 'http://'+host_ip+'/painel_view';
//     let url_panel_salas = 'http://'+host_ip+'/painel_salas';
//     let config_adm = 'http://'+host_ip+'/config_adm';
//     let view_guiches = 'http://'+host_ip+'/view_guiche';
//     let view_salas = 'http://'+host_ip+'/view_salas';
//     let contentDiv = document.getElementById('contentdevice'); // adicione este elemento no seu HTML

  
//     if (id_clk == 'device_btn_adm'){
//       console.log('adm');
//       fetch(url_adm)
//         .then(response => response.text())
//         .then(html => {
//           contentDiv.innerHTML = html;
//         });
//     }
//     else if (id_clk == 'device_btn_user'){
//       console.log('adm');
//       fetch(url_user)
//         .then(response => response.text())
//         .then(html => {
//           contentDiv.innerHTML = html;
//         });
//     }
//     else if (id_clk == 'device_btn_panel'){
//       console.log('adm');
//       fetch(url_panel)
//         .then(response => response.text())
//         .then(html => {
//           contentDiv.innerHTML = html;
//         });
//     }
//     else if (id_clk == 'config_adm'){
//       console.log('adm_master');
//       fetch(config_adm)
//         .then(response => response.text())
//         .then(html => {
//           contentDiv.innerHTML = html;
//         });
//     }
//     else if (id_clk == 'enter_view_giches'){
//       fetch(view_guiches)
//         .then(response => response.text())
//         .then(html => {
//           contentDiv.innerHTML = html;
//         });
//     }
//     else if (id_clk == 'enter_view_salas'){
//       fetch(view_salas)
//         .then(response => response.text())
//         .then(html => {
//           contentDiv.innerHTML = html;
//         });
//     }
//     else if (id_clk == 'enter_panel_salas'){
//       fetch(url_panel_salas)
//         .then(response => response.text())
//         .then(html => {
//           contentDiv.innerHTML = html
//         });
//     }
// }

// function choiceDevice(id_clk){

//     let url_user= 'http://'+host_ip+'/painel_req';
//     let url_adm = 'http://'+host_ip+'/painel_adm';
//     let url_panel = 'http://'+host_ip+'/painel_view';
//     let url_panel_salas = 'http://'+host_ip+'/painel_salas';
//     let config_adm = 'http://'+host_ip+'/config_adm';
//     let view_guiches = 'http://'+host_ip+'/view_guiche';
//     let view_salas = 'http://'+host_ip+'/view_salas';

//     if (id_clk == 'device_btn_adm'){
//         console.log('adm');
//         let href = url_adm;
//         window.location.href = href;
//         }
//     else if (id_clk == 'device_btn_user'){
//         console.log('adm');
//         let href = url_user;
//         window.location.href = href;
//         }
//     else if (id_clk == 'device_btn_panel'){
//         console.log('adm');
//         let href = url_panel;
//         window.location.href = href;
//         }
//     else if (id_clk == 'config_adm'){
//         console.log('adm_master');
//         let href = config_adm;
//         window.location.href = href;
//     }
//     else if (id_clk == 'enter_view_giches'){
//         let href = view_guiches;
//         window.location.href = href;
//     }
//     else if (id_clk == 'enter_view_salas'){
//         let href = view_salas;
//         window.location.href = href;}
    
//     else if (id_clk == 'enter_panel_salas'){
//         let href = url_panel_salas;
//         window.location.href = href;
//     }
// }


// btn page adm

function pages_adm(id_clk){

    let url_guiche= 'http://'+host_ip+'/config_adm';
    let url_salas = 'http://'+host_ip+'/config_adm_salas';

    if (id_clk == 'pag_adm_guiche'){
        console.log('adm');
        let href = url_guiche;
        window.location.href = href;
        }
    if (id_clk == 'pag_adm_salas'){
        console.log('adm');
        let href = url_salas;
        window.location.href = href;
        }
}

// ´Painel adm



//funcao para chamar a funcao check_status_guiche




// modal de configuração giche
//abre o modal
getElm("btn-add-new-giche").addEventListener("click", function() {
    console.log('add giche');
    getElm("modal-giche").style.display = "block";
});
//fecha o modal guigche
getElm("btn-close-modal-add-guiche").addEventListener("click", function() {
    console.log('close modal');
    getElm("modal-giche").style.display = "none";
});

getElm("btn-add-guiche-cancelar").addEventListener("click", function() {
    console.log('cancelar add guiche');
    getElm("modal-giche").style.display = "none";
});



//funcao para adicionar guiche

getElm("btn-add-guiche-salvar").addEventListener("click", function() {
    //pega input do modal
    let input_guiche = getElm("nome-guiche-new").value;
    let input_desc = getElm("desc-guiche-new").value;
    console.log(input_guiche);
    console.log(input_desc);
    if (input_guiche == '' || input_desc == ''){
        //alerta de erro janela
        alert('Preencha todos os campos');
        getElm("modal-giche").style.display = "none";
    }
    else{
        //envia dados para o banco de dados
        //envia dados para o banco de dados
        let host = host_ip;
        let url = 'http://'+host+'/add_new_guiche';
        console.log(url);
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", url, false);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("guiche="+input_guiche+"&desc="+input_desc);//A execução do script pára aqui até a requisição retornar do servidor
        if (xhttp.responseText == 'ok'){
            alert('Guiche adicionado com sucesso');
            getElm("modal-giche").style.display = "none";
            location.reload();
        }
        else{
            alert('Erro ao adicionar guiche');
            getElm("modal-giche").style.display = "none";
        }
    

        
    }
    
});


//funcao para deletar guiche na lista se houver cadastrado

function delete_guiche_list(id_guiche) {
    //pega valor da div
    console.log(id_guiche);
    let host = host_ip;
    let url = 'http://'+host+'/delete_guiche';
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id_guiche="+id_guiche);//A execução do script pára aqui até a requisição retornar do servidor
    if (xhttp.responseText == 'ok'){
        alert('Guiche deletado com sucesso');
        location.reload();
    }
    else{
        alert('Erro ao deletar guiche'+xhttp.responseText);

    }
}



    


// modal giche end


// modal de configuração salas

//pega evento botao vtnsalvarsala


function add_new_sala() {
    //pega input do modal
    console.log('add sala');
    let input_sala = getElm("nome_sala_new").value;
    let input_tipo = getElm("desc_sala_new").value;
    console.log(input_sala);
    console.log(input_tipo);
    if (input_sala == '' || input_tipo == ''){
        //alerta de erro janela
        alert('Preencha todos os campos');
        getElm("modal-giche").style.display = "none";
    }
    else{
        //envia dados para o banco de dados
        //envia dados para o banco de dados
        let host = host_ip;
        let url = 'http://'+host+'/add_new_sala';
        console.log(url);
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", url, false);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("sala="+input_sala+"&desc="+input_tipo);//A execução do script pára aqui até a requisição retornar do servidor
        if (xhttp.responseText == 'ok'){
            alert('sala adicionado com sucesso');
            getElm("modal-giche").style.display = "none";
            location.reload();
        }
        else{
            alert('Erro ao adicionar sala');
            getElm("modal-giche").style.display = "none";
        }
    

        
    }
    
};


//funcao para deletar sala na lista se houver cadastrado

function delete_sala_list(id_sala) {
    //pega valor da div
    console.log(id_sala);
    let host = host_ip;
    let url = 'http://'+host+'/delete_sala';
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id_sala="+id_sala);//A execução do script pára aqui até a requisição retornar do servidor
    if (xhttp.responseText == 'ok'){
        alert('sala deletado com sucesso');
        location.reload();
    }
    else{
        alert('Erro ao deletar guiche'+xhttp.responseText);

    }
}
// INICIO FUNCOES DE GUICHE

function choice_guiche(id_guiche){
    console.log('giche para entrar'+id_guiche);
    let host = host_ip;
    let url = 'http://'+host+'/recep_newatendi/'+id_guiche;
    window.location.href = url;
}




function fechaGuiche(id_guiche){
    console.log('giche para fechar'+id_guiche);
    let host = host_ip;
    let url = 'http://'+host+'/close_guiche';
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id_guiche="+id_guiche);//A execução do script pára aqui até a requisição retornar do servidor
    if (xhttp.responseText == 'ok'){
        alert('Guiche fechado com sucesso');
        // redirect view_guiches
        let url = 'http://'+host+'/view_guiche';
        window.location.href = url;
    }
    else{
        alert('Erro ao fechar guiche'+xhttp.responseText);

    }
}

function fechaSala(id_sala){
    console.log('giche para fechar'+id_sala);
    let host = host_ip;
    let url = 'http://'+host+'/close_sala';
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id_sala="+id_sala);//A execução do script pára aqui até a requisição retornar do servidor
    if (xhttp.responseText == 'ok'){
        alert('Sala fechado com sucesso');
        // redirect view_guiches
        let url = 'http://'+host+'/view_salas';
        window.location.href = url;
    }
    else{
        alert('Erro ao fechar sala'+xhttp.responseText);

    }
}

function redirect_fila_espera(id_guiche){
    console.log('giche para fila de espera'+id_guiche);
    let host = host_ip;
    let url = 'http://'+host+'/fila_espera_guiche'+id_guiche;
    window.location.href = url;
}



function solicitar_senha(id_clk){
    let url_preferencial = 'http://'+host_ip+'/request_senha_preferencial';
    let url_comum = 'http://'+host_ip+'/request_senha_comum'
    //verifica qual botao foi clicado pelo id


    //pega o valor do id do botao

    if (id_clk == 'btn_preferencial'){
        console.log('preferencial');
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", url_preferencial, false);

        xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
        console.log(xhttp.responseText); //Aqui você pode fazer o que quiser com a resposta do servidor
        //seta o valor da senha no html do h1
        getElm('genera_senha').innerHTML = xhttp.responseText;
        // envia um emit para o servidor do sokcet io
        socket.emit('senha_emit', 'att-painel-guiche');
    }
    else if (id_clk == 'btn_comum'){
        console.log('comum');
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", url_comum, false);
        xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
        console.log(xhttp.responseText); //Aqui você pode fazer o que quiser com a resposta do servidor
        //seta o valor da senha no html do h1
        getElm('genera_senha').innerHTML = xhttp.responseText;
        socket.emit('senha_emit', 'att-painel-guiche');
    }

    
}


function atender_senha(id_clk){ // nao usa mais

    let url_preferencial = 'http://'+host_ip+'/respon_senha_preferencial';
    let url_comum = 'http://'+host_ip+'/respon_senha_comum';


    if (id_clk == 'btn_preferencial_adm'){
        console.log('preferencial');
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", url_preferencial, false);

        xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
        console.log(xhttp.responseText); 
        // envia um emit para o servidor do sokcet io
        socket.emit('att-painel-view-recep', 'show_senha_painel_recepcao');
    }
    else if (id_clk == 'btn_comum_adm'){
        console.log('comum');
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", url_comum, false);
        xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
        console.log(xhttp.responseText); //Aqui você pode fazer o que quiser com a resposta do servidor
        socket.emit('att-painel-view-recep', 'show_senha_painel_recepcao');
    }

}



function atender_senha_recepcao(id_clk){


    let res_preferencial = 'http://'+host_ip+'/respon_senha_preferencial';
    let res_comum = 'http://'+host_ip+'/respon_senha_comum';

    if(status_guiche == true){
        alert('Guiche já está atendendo clique em abortar para cancelar');
        return;
    }
    else{

        if (id_clk == 'btn-chama-preferencial-giche'){
        console.log('preferencial');
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", res_preferencial, false);
        var id_guiche = getElm('btn-chama-preferencial-giche').getAttribute('value');
        console.log('Id do guiche para att a senha '+id_guiche);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send('id_guiche='+id_guiche);//A execução do script pára aqui até a requisição retornar do servidor

        
        // chama SetValuesFormGuiche
        // se null nao faz nada
        if (xhttp.responseText != 'error'){
            console.log(xhttp.responseText);
            let formulario = getElm('group-ficha-redict');
            formulario.style.display = 'block';
            SetValuesFormGuiche(xhttp.responseText);
            socket.emit('att-painel-view-recep', 'show_senha_painel_recepcao');
            return status_guiche = true;
            
        }
        else{
            alert('Não há senhas para atender');
        }
        

        }
    
    else if (id_clk == 'btn-chama-comum-giche'){
        console.log('comum');
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", res_comum, false);
        //pega o valor do id do botao
        var id_guiche = getElm('btn-chama-comum-giche').getAttribute('value');

        console.log('Id do guiche para att a senha '+id_guiche);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhttp.send('id_guiche='+id_guiche);//A execução do script pára aqui até a requisição retornar do servidor

        // chama SetValuesFormGuiche
        // se null nao faz nada
        if (xhttp.responseText != 'error'){
            console.log(xhttp.responseText);
            let formulario = getElm('group-ficha-redict');
            formulario.style.display = 'block';
            SetValuesFormGuiche(xhttp.responseText);
            socket.emit('att-painel-view-recep', 'show_senha_painel_recepcao');
            return status_guiche = true;
        }
        else{
            alert('Não há senhas para atender');
        }
    }

    }
}


function SetValuesFormGuiche(values){
    // recebe em json e converte para objeto e seta os valores na tag P do html
    let obj = JSON.parse(values);
    console.log(obj);
    getElm('value-form-guiche-tipo_senha').innerHTML = obj.tipo_senha;
    getElm('id-senha-client-guiche').innerHTML = obj.id;
    getElm('view-senha-client-guiche').innerHTML = obj.senha;
    getElm('hora-created-senha').innerHTML = obj.createdAt;

}

function SetValuesFormSala(values){
    // recebe em json e converte para objeto e seta os valores na tag P do html
    let valuesJson = JSON.parse(values);
    console.log(valuesJson);
    getElm('value-form-sala-tipo_senha').innerHTML = valuesJson.tipo_senha;
    getElm('id-senha-client-sala').innerHTML = valuesJson.id;
    // converte em string valuesJson.senha
    senha = valuesJson.senha.toString();
    getElm('view-senha-client-sala').innerHTML = senha;
    getElm('hora-created-senha-sala').innerHTML = valuesJson.createdAt;
    getElm('nome-cliente-sala').innerHTML = valuesJson.nome_paciente;

}



function CancelsenhaGuiche(){
    // abre modal para confirmar cancelamento da senha
    getElm('modal-content-cancel-ficha').style.display = 'block';

}
function FechaModalCancelSenhaGuiche(){
    getElm('modal-content-cancel-ficha').style.display = 'none';
}

function CancelarSenhaGuicheConfirm(id_btn){
    // cancela a senha do guiche
    let url_cancel = 'http://'+host_ip+'/destroy_senha_guiche';
    if (id_btn == 'btn-destroy-senha-guiche'){
        //pega o valor do id do botao
        var action = 'destroy';
    }
    else if (id_btn == 'btn-volta-senha-guiche'){

        var action = 'volta';
    }
    else{
        return;
    }



    var id_guiche = getElm('identifi-guiche').getAttribute('value');


    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", url_cancel, false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('id_guiche='+id_guiche+'&action='+action);//A execução do script pára aqui até a requisição retornar do servidor
    console.log(xhttp.responseText);
    if (xhttp.responseText == 'ok'){
        // limpa os campos do formulario
        getElm('value-form-guiche-tipo_senha').innerHTML = '';
        getElm('id-senha-client-guiche').innerHTML = '';
        getElm('view-senha-client-guiche').innerHTML = '';
        getElm('hora-created-senha').innerHTML = '';
        // esconde o formulario
        getElm('group-ficha-redict').style.display = 'none';
        // fecha o modal
        getElm('modal-content-cancel-ficha').style.display = 'none';
        // seta o status do guiche para false
        status_guiche = false;
    }
    else{
        alert('Erro ao cancelar senha');
    }
}

function EncamainhaSenhaSala(id_guiche){
    // pega todos os valores do formulario
    let id_senha = getElm('id-senha-client-guiche').innerHTML;
    let encaminhar_para = getElm('select-salas').value;
    // combobox chamar por
    let chamar_por = getElm('select-type-senha')
    chamar_por_current = chamar_por.options[chamar_por.selectedIndex].text;
    let nome_cliente = getElm('nome-cliente').value;
    console.log('id_senha: '+id_senha);
    console.log('id_guiche: '+id_guiche);
    console.log('encaminhar_para: '+encaminhar_para);
    console.log('chamar_por: '+chamar_por_current);
    console.log('nome_cliente: '+nome_cliente);
    // valida os campos
    if (nome_cliente == ''){
        alert('Preencha o nome do cliente');
        return;
    }
    else{
        // envia os dados para o servidor
        let url_encaminha = 'http://'+host_ip+'/encaminha_senha_guiche';
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", url_encaminha, false);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send('id_senha='+id_senha+'&id_guiche='+id_guiche+'&encaminhar_para='+encaminhar_para+'&chamar_por='+chamar_por_current+'&nome_cliente='+nome_cliente);//A execução do script pára aqui até a requisição retornar do servidor
        console.log(xhttp.responseText);
        if (xhttp.responseText == 'ok'){
            // limpa os campos do formulario
            getElm('value-form-guiche-tipo_senha').innerHTML = '';
            getElm('id-senha-client-guiche').innerHTML = '';
            getElm('view-senha-client-guiche').innerHTML = '';
            getElm('hora-created-senha').innerHTML = '';
            getElm('nome-cliente').value = '';
            //verifica se realmente foi limpo os campos
            
            // esconde o formulario
            getElm('group-ficha-redict').style.display = 'none';
            // fecha o modal
            getElm('modal-content-cancel-ficha').style.display = 'none';
            // seta o status do guiche para false
            status_guiche = false;
            // envia a sala para o servidor atualizar a pagina da sala 
            socket.emit('encaminha_senha_guiche_p_sala', encaminhar_para);
            // reload na pagina
            window.location.reload();
            return;
        }
        else{
            alert('Erro ao encaminhar senha');
        }
    }


}

// FIM FUNCOES GUICHE



// FUNCOES SALAS DE ESPERA

function choice_sala(id_sala){
    console.log('Sala para entrar'+id_sala);
    let host = host_ip;
    let url = 'http://'+host+'/sala_newatendi/'+id_sala;
    window.location.href = url;
}

function redirect_fila_espera_sala(id_sala){
    console.log('giche para fila de espera'+id_sala);
    let host = host_ip;
    let url = 'http://'+host+'/fila_espera_sala'+id_sala;
    window.location.href = url;
}

function atender_senha_sala(id_clk){

    let res_preferencial = 'http://'+host_ip+'/respon_senha_preferencial_sala';
    let res_comum = 'http://'+host_ip+'/respon_comum_preferencial_sala';
    if(status_sala == true){
        alert('Guiche já está atendendo finalize o atendimento ou clique em abortar para cancelar o atendimento');
        return;
    }
    else{

        if (id_clk == 'btn-chama-preferencial-sala'){
            console.log('preferencial');
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST", res_preferencial, false);
            console.log('chama preferencial' + 'para sala'+id_clk);
            var id_sala = getElm('btn-chama-preferencial-sala').getAttribute('value');
            console.log('Id do sala para att a senha '+id_sala);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send('id_sala='+id_sala);//A execução do script pára aqui até a requisição retornar do servidor

        
        // chama SetValuesFormGuiche
        // se null nao faz nada
            if (xhttp.responseText != 'error'){

                console.log(xhttp.responseText);
                let formulario = getElm('group-ficha-redict');
                formulario.style.display = 'block';
                SetValuesFormSala(xhttp.responseText);
                //emit 
                socket.emit('att-painel-view-sala', id_sala);
                return status_sala = true;
            }
            else{
                alert('Não há senhas para atender');
                return;
            }
        }
        else if (id_clk == 'btn-chama-comum-sala'){
            console.log('chama comum' + ' para sala'+id_clk);
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST", res_comum, false);
            var id_sala = getElm('btn-chama-comum-sala').getAttribute('value');
            console.log('Id do sala para att a senha '+id_sala);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send('id_sala='+id_sala);//A execução do script pára aqui até a requisição retornar do servidor
            
            if (xhttp.responseText != 'error'){
                let formulario = getElm('group-ficha-redict');
                formulario.style.display = 'block';
                SetValuesFormSala(xhttp.responseText);
                //emit
                socket.emit('att-painel-view-sala', id_sala);
                return status_sala = true;
            }
            else{
                alert('Não há senhas para serem atendidas');
                return;
            }
            

        }


    }

}


function EncaminharSenhaSalaSala(id_sala){


    let id_senha = getElm('id-senha-client-sala').innerHTML;
    let encaminhar_para = getElm('select-salas').value;
    // combobox chamar por
    let chamar_por = getElm('select-type-senha')
    chamar_por_current = chamar_por.options[chamar_por.selectedIndex].text;

    let nome_cliente = getElm('nome-cliente-sala').innerHTML;

    console.log('id_senha: '+id_senha);
    console.log('id_SALA: '+id_sala);
    console.log('encaminhar_para_sala: '+encaminhar_para);
    console.log('chamar_por: '+chamar_por_current);
    console.log('nome_cliente: '+nome_cliente);

    
        // // envia os dados para o servidor
        let url_encaminha = 'http://'+host_ip+'/encaminha_senha_sala_sala';
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", url_encaminha, false);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send('id_senha='+id_senha+'&id_guiche='+id_sala+'&encaminhar_para='+encaminhar_para+'&chamar_por='+chamar_por_current+'&nome_cliente='+nome_cliente);//A execução do script pára aqui até a requisição retornar do servidor
        console.log(xhttp.responseText);
        if (xhttp.responseText == 'ok'){
            // limpa os campos do formulario
            getElm('value-form-sala-tipo_senha').innerHTML = '';
            getElm('id-senha-client-sala').innerHTML = '';
            getElm('view-senha-client-sala').innerHTML = '';
            getElm('hora-created-senha-sala').innerHTML = '';
            getElm('nome-cliente-sala').value = '';
            //verifica se realmente foi limpo os campos
            
            // esconde o formulario
            getElm('group-ficha-redict').style.display = 'none';
            // fecha o modal
            getElm('modal-content-cancel-ficha').style.display = 'none';
            // seta o status do guiche para false
            status_guiche = false;
            // envia a sala para o servidor atualizar a pagina da sala 
            socket.emit('encaminha_senha_guiche_p_sala', encaminhar_para);
            // reload na pagina
            window.location.reload();
            return;
        }
        else{
            alert('Erro ao encaminhar senha');
        }
    



};


function FinalizaSenhaSala(id_sala){
    console.log('Finaliza senha da sala' + id_sala);
    let host = host_ip;
    let url = 'http://'+host+'/finaliza_senha_sala';
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('id_sala='+id_sala);//A execução do script pára aqui até a requisição retornar do servidor
    console.log(xhttp.responseText);
    if (xhttp.responseText == 'ok'){
        // limpa os campos do formulario
        getElm('value-form-sala-tipo_senha').innerHTML = '';
        getElm('id-senha-client-sala').innerHTML = '';
        getElm('view-senha-client-sala').innerHTML = '';
        getElm('hora-created-senha-sala').innerHTML = '';
        getElm('nome-cliente-sala').value = '';
        //verifica se realmente foi limpo os campos
        
        // esconde o formulario
        getElm('group-ficha-redict').style.display = 'none';
        // fecha o modal
        getElm('modal-content-cancel-ficha').style.display = 'none';
        // seta o status do guiche para false
        status_sala = false;
    }
    else{
        alert('Erro ao encaminhar senha');
    }

};

function CancelsenhaSala(){
    // abre modal para confirmar cancelamento da senha
    getElm('modal-content-cancel-ficha').style.display = 'block';

}
function FechaModalCancelSenhaSala(){
    getElm('modal-content-cancel-ficha').style.display = 'none';
}

function CancelarSenhaSalaConfirm(id_btn){
    // cancela a senha do guiche
    let url_cancel = 'http://'+host_ip+'/destroy_senha_sala';
    if (id_btn == 'btn-destroy-senha-sala'){
        //pega o valor do id do botao
        var action = 'destroy';
    }
    else if (id_btn == 'btn-volta-senha-sala'){

        var action = 'volta';
    }
    else{
        return;
    }



    var id_sala = getElm('identifi-sala').getAttribute('value');


    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", url_cancel, false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('id_sala='+id_sala+'&action='+action);//A execução do script pára aqui até a requisição retornar do servidor
    console.log(xhttp.responseText);
    if (xhttp.responseText == 'ok'){
        // limpa os campos do formulario
        getElm('value-form-sala-tipo_senha').innerHTML = '';
        getElm('id-senha-client-sala').innerHTML = '';
        // converte em string valuesJson.senha
        getElm('view-senha-client-sala').innerHTML = '';
        getElm('hora-created-senha-sala').innerHTML = '';
        getElm('nome-cliente-sala').innerHTML = '';
        // esconde o formulario
        getElm('group-ficha-redict').style.display = 'none';
        // fecha o modal
        getElm('modal-content-cancel-ficha').style.display = 'none';
        // seta o status do guiche para false
        status_sala = false;
    }
    else{
        alert('Erro ao cancelar senha');
    }
}


