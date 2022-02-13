
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

//Funcionalidades da lista de usuarios logados

function carregarContatosBarraLateral(){
    const contatos = document.querySelector(".caixa-contato-participantes");
    let participantes = "";

    console.log(participantes);
    for(let i = 0; i<usuarios.length;i++){
        participantes = participantes+ `
        <div class="participantes" onclick="selecionarParticipante(this)" data-identifier="participant">
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