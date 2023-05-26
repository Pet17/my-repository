const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

function init() {
    itens.forEach((elemento) => {
        criaElemento(elemento);
    });

    form.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nome = evento.target.elements.nome;
        const quantidade = evento.target.elements.quantidade;

        const existe = itens.find((elemento) => elemento.nome === nome.value);

        const itemAtual = {
            nome: nome.value,
            quantidade: quantidade.value
        };

        if (existe) {
            itemAtual.id = existe.id;

            atualizaElemento(itemAtual);

            itens[existe.id] = itemAtual;
        } else {
            itemAtual.id = itens.length;

            criaElemento(itemAtual);

            itens.push(itemAtual);
        }

        localStorage.setItem("itens", JSON.stringify(itens));

        nome.value = "";
        quantidade.value = "";
    });

    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete")) {
            const item = event.target.parentNode;
            const itemId = item.dataset.id;
            deletaElemento(item, itemId);
        }
    });

    animateButton();
}

function criaElemento(item) {
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");

    const numeroItem = document.createElement("strong");
    numeroItem.textContent = item.quantidade;
    numeroItem.dataset.id = item.id;
    novoItem.appendChild(numeroItem);

    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);
}

function atualizaElemento(item) {
    const elementoAtualizado = document.querySelector(`[data-id='${item.id}'] strong`);
    elementoAtualizado.textContent = item.quantidade;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";
    elementoBotao.classList.add("delete");
    elementoBotao.dataset.id = id;

    return elementoBotao;
}

function deletaElemento(tag, itemId) {
    tag.remove();
    itens.splice(itemId, 1);
    localStorage.setItem("itens", JSON.stringify(itens));
}

function animateButton() {
    const botao = document.querySelector(".cadastrar");
    botao.addEventListener("click", function() {
        botao.classList.add("clicked");
        setTimeout(function() {
            botao.classList.remove("clicked");
        }, 500);
    });
}

document.addEventListener("DOMContentLoaded", init);
