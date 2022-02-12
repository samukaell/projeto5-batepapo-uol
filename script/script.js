let mensagens =[]
let usuarios =[];
let postUser = {
    name: null
}

let contatoPrivado = {
    name:null
}

let mensagemPrivada = false;

document.addEventListener('keypress', function(e){
    if(e.which == 13 && mensagemPodeSerEnviada){
       enviarMensagem();
       console.log("Tecla enter foi precionada");
    }
 }, false);

function mensagemPodeSerEnviada(){
    const valorInput = document.querySelector(".input-escreva").value;
    if(valorInput !== null){
        enviarMensagem();
    }
}

function logar(){
    verificarUsuarios();
    const nome = document.querySelector('.input-nome').value;

    for(let i = 0; i<usuarios.length;i++){
        if(nome === usuarios[i].name){ 
            alert("Já existe usuario com este nome");
            return;
        }
    }

    postUser.name=nome;
    realizarLogin();
    
}

function verificarUsuarios(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/uol/participants');
    promessa.then(processarRespostaVerificarUsuarios);
    promessa.catch(tratarErroLogar);
    
}

function realizarLogin(){
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', postUser);
    requisicao.then(processarRespostaLogar);
    requisicao.catch(tratarErroLogar);
}

function processarRespostaVerificarUsuarios(resposta){
    console.log("Usuarios verificados");
    usuarios = resposta.data;
    console.log(usuarios);
}

function processarRespostaLogar(resposta) {
    console.log("OK! logado com sucesso");
    entrarNoChat();
}

function tratarErroLogar(erro) {
    console.log("Erro Login -> Status code: " + erro.response.status);
    console.log("Erro Login -> Mensagem de erro: " + erro.response.data);
}

function manterLogin(){
    setInterval(realizarLogin, 3000);
}

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
        let post = "";

        if(mensagemPrivada === true && contatoPrivado.name !== null){
            post = enviarMensagemPrivada(valorInput,contatoPrivado.name);
        }
        else{
            post =  enviarMensagemPublica(valorInput);
        }

        const requisicao = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', post);
        requisicao.then(tratarSucessoPost);
        requisicao.catch(tratarErrorPost);

        recarregarChat();
    }
}

function enviarMensagemPublica(valorInput){
    let post = {
        from: postUser.name,
        to: "Todos",
        text: valorInput,
        type: "message"
    }

    return post;
}

function enviarMensagemPrivada(valorInput,participante){
    let post = {
        from: postUser.name,
        to: participante,
        text: valorInput,
        type: "message"
    }

    return post;
}


function tratarSucessoPost(){
    console.log("Sua mensagem foi enviada!");
}

function tratarErrorPost(erro){
    console.log("Status code: " + erro.response.status);
    console.log("Mensagem de erro: " + erro.response.data);
}

function carregarContatosBarraLateral(){
    const contatos = document.querySelector(".caixa-contato-participantes");
    let participantes = "";

    console.log(participantes);
    for(let i = 0; i<usuarios.length;i++){
        participantes = participantes+ `
        <div class="participantes" onclick="selecionarParticipante(this)">
            <ion-icon name="person-circle" class="contato-barra-lateral"></ion-icon>
            <p class="nome-user">${usuarios[i].name}</p>
        </div>
        `
    }
     

    contatos.innerHTML=participantes;
}

function selecionarParticipante(elemento){
    const elelmentoAnterior = document.querySelector(".participante-selecionado");
    
    if(elelmentoAnterior !== null ){
        elelmentoAnterior.classList.remove("participante-selecionado");
    }

    elemento.classList.add("participante-selecionado");
    let usuarioSelecionado = elemento.querySelector(".nome-user").innerText;
    contatoPrivado.name = usuarioSelecionado;
    console.log(usuarioSelecionado);
}

function selecionarStatusMensagemPublico(elemento){
    mensagemPrivada = false;

    const statusMensagem = document.querySelector(".status-mensagem");
    
    if(statusMensagem !== null ){
        statusMensagem.classList.remove("status-mensagem");
    }

    elemento.classList.add("status-mensagem");
    
}

function selecionarStatusMensagemPrivado(elemento){
    mensagemPrivada = true;

    const statusMensagem = document.querySelector(".status-mensagem");
    
    if(statusMensagem !== null ){
        statusMensagem.classList.remove("status-mensagem");
    }

    elemento.classList.add("status-mensagem");
}

/* Chamadas */
buscarDados();
setInterval(carregarContatosBarraLateral,6000);
setInterval(recarregarChat, 5000);
manterLogin();