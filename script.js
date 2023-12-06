// Preços de cada material
let valoresMateriais = {
  "mdf-tx-15": 185,
  "mdf-tx-18": 260,
  "mdf-tx-6": 150,
  "mdf-ca-15": 500,
  "cr-lt-250": 16.29,
  "cr-lt-300": 1,
  "cr-lt-400": 16.9,
  "cr-lt-450": 1,
  "cr-lt-500": 1,
  "cr-lt-25": 9,
  "cr-lt-40": 14,
  "cr-lg-500": 1,
  "cr-lg-550": 1,
  "cr-lg-600": 1,
  "db-rt-35": 2.53,
  "db-ps-35": 2,
  "px-al-96": 8.5,
  "px-al-128": 10.5,
  "px-crm": 7.5,
  "ft-tx-22": 30,
  "ft-tx-35": 42,
  "ft-tx-45": 1,
  "ft-tx-60": 1,
  "ft-bt-md": 42,
  "ftg-bd": 2.99,
  "spt-pq": 2.5,
  "spt-md": 4.5,
  "spq-gd": 1,
  "otr-cola": 26,
  "otr-rodizio": 1,
  "otr-prfs": 6,
  "crt-tr": 2.5,
  "crt-tr": 3.5,
  "tf-br-13": 3.99,
  "tf-md-13": 5,
  "cnt-cp": 14,
};

// Elementos
const btnCalcular = document.querySelector(".calcular");
const htmlContainerResultado = document.querySelector(".col-2");
const htmlItens = document.querySelectorAll(".item input[type='number']");
const btnNovo = document.querySelector(".novo");
const htmlItensSelec = document.querySelector(".itens-selec");
const htmlComFrete = document.querySelector(".com-frete");
const htmlSemFrete = document.querySelector(".sem-frete");

btnCalcular.addEventListener("click", (e) => {
  e.preventDefault();

  let somaTotal = 0;
  // Adicionando itens na lista de orçamento
  htmlItens.forEach((item) => {
    if (item.value != 0 && item.value != null) {
      // Multiplicando a quantidade inserida pelo valor no obj e adicionando a somaTotal
      let atributoNome = item.getAttribute("name");
      somaTotal += valoresMateriais[`${atributoNome}`] * Number(item.value);
      // Adicionando o item e quantidade visualmente a lista de itens selecionados
      let nome = document.querySelector(
        `label[for='${atributoNome}']`
      ).innerHTML;
      let quantidade = item.value;
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
  let textFrete = document.createTextNode(`R$ ${somaTotal + 200}`);
  spanFrete.appendChild(textFrete);
  htmlComFrete.appendChild(spanFrete);
  // Sem frete
  let spanSemFrete = document.createElement("span");
  let textSemFrete = document.createTextNode(`R$ ${somaTotal}`);
  spanSemFrete.appendChild(textSemFrete);
  htmlSemFrete.appendChild(spanSemFrete);
  // Revelando o container de resultado do orçamento
  htmlContainerResultado.classList.remove("ativar");
});

// Botão de reset
btnNovo.addEventListener("click", (e) => {
  e.preventDefault();
  // Esconde novamente o container de resultado
  htmlContainerResultado.classList.add("ativar");
  // Voltando os elementos ao estado original
  htmlItensSelec.innerText = "";
  htmlComFrete.innerText = "🡻 Total com frete ";
  htmlSemFrete.innerText = "🡻 Total sem frete ";
  // Zerando os inputs
  htmlItens.forEach((item) => {
    item.value = null;
  });

  somaTotal = 0;
});
