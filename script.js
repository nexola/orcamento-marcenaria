import ItensJSON from "./itens.json" assert { type: "json" };

// Elementos
const btnCalcular = document.querySelector(".calcular");
const htmlContainerResultado = document.querySelector(".col-2");
const btnNovo = document.querySelector(".novo");
const htmlItensSelec = document.querySelector(".itens-selec");
const htmlComFrete = document.querySelector(".com-frete");
const htmlSemFrete = document.querySelector(".sem-frete");
const htmlInicial = document.querySelectorAll(".lista");

// Funções auxiliares
const criarLi = function (codigo, nome) {
  const liEle = document.createElement("li");
  liEle.classList.add("item");
  // label
  const labelEle = document.createElement("label");
  labelEle.setAttribute("for", codigo);
  const labelTxt = document.createTextNode(nome);
  labelEle.appendChild(labelTxt);
  // input
  const inputEle = document.createElement("input");
  inputEle.setAttribute("type", "number");
  inputEle.setAttribute("name", codigo);
  inputEle.setAttribute("id", codigo);

  liEle.appendChild(labelEle);
  liEle.appendChild(inputEle);

  return liEle;
};

const carregarItens = function () {
  Array.from(ItensJSON).map((item) => {
    htmlInicial.forEach((elemento) => {
      if (item.codigo.substring(0, 3) === elemento.id) {
        const liEle = criarLi(item.codigo, item.nome);
        elemento.appendChild(liEle);
        const itensNode = document.querySelectorAll(
          ".item input[type='number']"
        );
        htmlItens = itensNode;
      }
    });
  });
};

const zerarInputs = function () {
  htmlItens.forEach((item) => {
    item.value = null;
  });
};

const esconderBtn = function () {
  btnCalcular.style.display = "none";
};

const mostrarBtn = function () {
  btnCalcular.style.display = "block";
};

let htmlItens;

// Criando lista inicial
carregarItens();

let somaTotal = 0;

// Botão calcular
btnCalcular.addEventListener("click", (e) => {
  e.preventDefault();
  // Verificando se existe algum input preenchido
  const inputsHtml = Array.from(htmlItens)
    .map((x) => x.value)
    .filter((x) => x > 0);
  // Se sim, o botão executa sua função
  if (inputsHtml.length !== 0) {
    // Adicionando itens na lista de orçamento
    htmlItens.forEach((item) => {
      if (item.value != 0 && item.value != null) {
        // Multiplicando a quantidade inserida pelo valor no obj e adicionando a somaTotal
        let atributoNome = item.getAttribute("name");
        let quantidade = item.value;
        // Somando os valores selecionados
        Array.from(ItensJSON).forEach((elemento) => {
          if (elemento.codigo === atributoNome) {
            somaTotal += elemento.valor * Number(quantidade);
          }
        });
        // Adicionando o item e quantidade visualmente a lista de itens selecionados
        let nome = document.querySelector(
          `label[for='${atributoNome}']`
        ).innerHTML;

        let liEle = document.createElement("li");
        let textEl = document.createTextNode(`${nome} `);
        let spanEle = document.createElement("span");
        let textSpan = document.createTextNode(`x${quantidade}`);
        // Adicionando-os a um elemento li
        spanEle.appendChild(textSpan);
        liEle.appendChild(textEl);
        liEle.appendChild(spanEle);
        htmlItensSelec.appendChild(liEle);
      }
    });
    // Mostrando visualmente o valor total, com e sem o frete
    // Com frete
    let spanFrete = document.createElement("span");
    let textFrete = document.createTextNode(
      `R$ ${
        somaTotal > 0 ? (somaTotal + 200).toFixed(2) : somaTotal.toFixed(2)
      }`
    );
    spanFrete.appendChild(textFrete);
    htmlComFrete.appendChild(spanFrete);
    // Sem frete
    let spanSemFrete = document.createElement("span");
    let textSemFrete = document.createTextNode(`R$ ${somaTotal.toFixed(2)}`);
    spanSemFrete.appendChild(textSemFrete);
    htmlSemFrete.appendChild(spanSemFrete);
    // Revelando o container de resultado do orçamento
    htmlContainerResultado.classList.add("ativar");
    // Limpando os inputs
    zerarInputs();
    esconderBtn();
  }
});

// Botão reset
btnNovo.addEventListener("click", (e) => {
  e.preventDefault();
  // Esconde novamente o container de resultado
  htmlContainerResultado.classList.remove("ativar");
  // Voltando os elementos ao estado original
  htmlItensSelec.innerText = "";
  htmlComFrete.innerText = "🡻 Total com frete ";
  htmlSemFrete.innerText = "🡻 Total sem frete ";

  somaTotal = 0;

  mostrarBtn();
  zerarInputs();
});
