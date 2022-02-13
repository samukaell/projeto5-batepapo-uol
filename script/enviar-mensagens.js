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
