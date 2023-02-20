


const  host_ip = window.location.hostname+':3000';

// Reseta todas as senhas 

function resetar_all_senha() {
    url = 'http://'+host_ip+'/resetar_senha';
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
    let response = xhttp.responseText;
    if (response != 'error'){
        alert('Senha resetada com sucesso');
    }
    else{
        alert('Erro ao resetar senha');
    }

}

