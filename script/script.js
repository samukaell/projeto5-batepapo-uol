//Capturar o (enter) = "e.which ==13"

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



/* Chamadas */
buscarDados();
carregarContatosBarraLateral();
setInterval(carregarContatosBarraLateral,10000);
setInterval(recarregarChat, 5000);
manterLogin();