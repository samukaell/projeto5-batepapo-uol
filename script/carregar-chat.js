function buscarDados(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    promessa.then(processarResposta);
    promessa.catch(tratarErro);
}

function processarResposta(resposta) {
    mensagens = resposta.data;
    renderizarMensagens();
}

function tratarErro(erro) {
    console.log("Status code: " + erro.response.status);
    console.log("Mensagem de erro: " + erro.response.data);
}

function recarregarChat(){
    mensagens = [];
    buscarDados();
}

function renderizarMensagens(){
    let mensagem = "";
    
    for(let i = 0; i<mensagens.length; i++){
        if(mensagens[i].type ==="message"){
            mensagem = mensagem +`
            <div class="mensagem mensagem-tipo-normal" data-identifier="message">
                <p class="data">(${mensagens[i].time})</p>
                <p class="nome">${mensagens[i].from}</p>
                <p class="para">${mensagens[i].to}:</p>
                <p class="conteudo"> ${mensagens[i].text}</p>
            </div>
            `
        }else if(mensagens[i].type ==="status"){
            mensagem = mensagem +`
            <div class="mensagem mensagem-tipo-entrada" data-identifier="message">
                <p class="data">(${mensagens[i].time})</p>
                <p class="nome">${mensagens[i].from}</p>
                <p class="para">${mensagens[i].to}:</p>
                <p class="conteudo"> ${mensagens[i].text}</p>
            </div>
            `
        }
    }
    const chat = document.querySelector(".chat");
    chat.innerHTML = chat.innerHTML + mensagem;
}