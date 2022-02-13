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