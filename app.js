//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
// lista de amigos.
let friendsList = [];
// o primeiro nome inserido é considerado como o nome do usuário.
let userName;

// funcao de inicializacao.
window.onload = (event) => {
    resetTitle("Digite o seu nome");
    console.log("page is fully loaded");
  };

// funcao para manipular o campo de titulo para informar o usuario que nome inserir.
function resetTitle(titulo) {
    let firstTittle = document.getElementById("titulo");
    firstTittle.innerHTML = titulo;
}

/**
 * funcao para salvar os nomes na lista.
 * esta funcao verifica se o nome eh valido e se o nome eh do proprio usuario.
 */
function addFriend() {
    let name = document.getElementById("amigo").value;
    if (!isValidName(name)) {
    } else if (friendsList.length === 0) {
        userName = name;
        friendsList.push(name);
        console.log(friendsList);
    } else {
        friendsList.push(name);
        console.log(friendsList);
    }
    clearFields();
    updateListUI();
    resetTitle("Digite o nome dos seus amigos");
}

// helper function para atualizar e exibir a lista de nomes na interface do usuario.
function updateListUI() {
    const listaDeAmigos = document.getElementById("listaAmigos");
    listaDeAmigos.innerHTML = "";
    friendsList.forEach((friend) => {
        const itemList = document.createElement("li");
        itemList.innerHTML = friend;
        listaDeAmigos.appendChild(itemList);
    })
}

/**
 * funcao para sortear de forma aleatorio o amigo secreto.
 * esta funcao verifica se o sorteio eh valido evitando que o usuario sorteie o proprio nome.
 * caso isso ocorra, utilizando de uma recursao a funcao realiza um novo sorteio.
 */
function drawFriend() {
    const randomIndex = Math.floor(Math.random() * friendsList.length);
    const result = friendsList[randomIndex];
    const alreadyPopped = [];
    if (friendsList.length === 0) {
        alert("Todos os nomes ja foram sorteados")
    } else if (friendsList.length > 1) {
        if (!(result === userName) && !(alreadyPopped.includes(result))) {
            document.getElementById("resultado").innerHTML = `Seu amigo secreto é: ${result}`;
            alreadyPopped.push(result);
            friendsList = friendsList.filter(item => item !== result);
        }
        else {
            drawFriend();
        }
    } else {
        document.getElementById("resultado").innerHTML = `Seu amigo secreto é: ${friendsList[0]}`;
        friendsList.pop(friendsList[0]);        
    }
    updateListUI();
}

// funcao para encerrar o sorteio e reiniciar as funcoes da pagina.
function resetDraw() {
    friendsList.length = 0;
    document.getElementById("resultado").innerHTML = "";
    updateListUI();
    resetTitle("Digite o seu nome");
}

// helper function para verificar se o nome inserido eh valido.
function isValidName(name) {
    if (name === "") {
        alert(`O campo está vazio, insira um nome válido.`);
    }
    else if (friendsList.includes(name)) {
        alert(`Esse nome já foi inserido. Adicione outro nome.`);
    }
    else {
        return true;
    }
}

//  helper function para limpar os campos de digitacao.
function clearFields() {
    document.getElementById("amigo").value = "";
}
