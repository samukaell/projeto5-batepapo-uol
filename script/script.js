let mensagens =[]

function entrarNoChat(){
    let tela = document.querySelector(".tela-cadastro");
    tela.classList.add('cadastro-escondido');
}

function acionarBarraLateral(){
    let barra = document.querySelector(".barra-escondida");
    barra.classList.remove('barra-escondida');

    let fundoBarra = document.querySelector(".fundo-barra-escondido");
    fundoBarra.classList.remove('fundo-barra-escondido');
}

function desacinarBarraLateral(){
    let barra = document.querySelector(".barra-lateral");
    barra.classList.add('barra-escondida');

    let fundoBarra = document.querySelector(".fundo-barra-lateral");
    fundoBarra.classList.add('fundo-barra-escondido');
}


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

buscarDados();
setInterval(recarregarChat, 5000);


function renderizarMensagens(){
    let mensagem = "";
    
    for(let i = 0; i<mensagens.length; i++){
        if(mensagens[i].type ==="message"){
            mensagem = mensagem +`
            <div class="mensagem mensagem-tipo-normal">
                <p class="data">(${mensagens[i].time})</p>
                <p class="nome">${mensagens[i].from}</p>
                <p class="para">${mensagens[i].to}:</p>
                <p class="conteudo"> ${mensagens[i].text}</p>
            </div>
            `
        }else if(mensagens[i].type ==="status"){
            mensagem = mensagem +`
            <div class="mensagem mensagem-tipo-entrada">
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

function enviarMensagem (){
    const valorInput = document.querySelector(".input-escreva").value;
    

    if(valorInput != null && valorInput != ""){
        let post = {
            from: "Samuel",
            to: "Todos",
            text: valorInput,
            type: "message"
        }

        const requisicao = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', post);
        requisicao.then(tratarSucessoPost);
        requisicao.catch(tratarErrorPost);

        recarregarChat();
    }
}

function tratarSucessoPost(){
    console.log("Sua mensagem foi enviada!");
}

function tratarErrorPost(erro){
    console.log("Status code: " + erro.response.status);
    console.log("Mensagem de erro: " + erro.response.data);
}

