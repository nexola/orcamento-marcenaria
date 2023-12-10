import ItensJSON from "./itens.json" assert { type: "json" };

const htmlInicial = document.querySelectorAll(".lista");
let btnEditar;
let htmlItens;

const criarLi = function (codigo, nome, valor) {
  const liEle = document.createElement("li");
  liEle.classList.add("item");
  // label
  const h3Ele = document.createElement("h3");
  h3Ele.setAttribute("id", codigo);
  const h3Txt = document.createTextNode(nome);
  const h3Span = document.createElement("span");
  h3Span.setAttribute("id", codigo);
  const spanTxt = document.createTextNode(" " + valor);
  h3Span.appendChild(spanTxt);
  h3Ele.appendChild(h3Txt);
  // input
  const aEle = document.createElement("a");
  aEle.setAttribute("id", codigo);
  aEle.innerHTML = "EDITAR";

  liEle.appendChild(h3Ele);
  liEle.appendChild(h3Span);
  liEle.appendChild(aEle);

  return liEle;
};

const carregarItens = function () {
  Array.from(ItensJSON).map((item) => {
    htmlInicial.forEach((elemento) => {
      if (item.codigo.substring(0, 3) === elemento.id) {
        const liEle = criarLi(
          item.codigo,
          item.nome,
          `R$ ${item.valor.toFixed(2)}`
        );
        elemento.appendChild(liEle);
        htmlItens = document.querySelectorAll(".item input[type='number']");
        btnEditar = document.querySelectorAll(".item a");
      }
    });
  });
};

const criarInputs = function (li, codigo, nome, valor) {
  const inputNome = document.createElement("input");
  inputNome.setAttribute("type", "text");
  inputNome.setAttribute("name", codigo);
  inputNome.setAttribute("id", codigo);
  inputNome.setAttribute("value", nome);
  inputNome.style.width = "fit-content";
  const inputValor = document.createElement("input");
  inputValor.setAttribute("type", "text");
  inputValor.setAttribute("name", codigo);
  inputValor.setAttribute("id", codigo);
  inputValor.setAttribute("value", valor);
  inputValor.style.width = "44px";
  li.replaceChild(inputNome, document.querySelector(`h3#${codigo}`));
  li.replaceChild(inputValor, document.querySelector(`span#${codigo}`));
  document.querySelector(`a#${codigo}`).innerHTML = "OK";
};

const editarItem = function (e) {
  e.preventDefault();
  Array.from(ItensJSON).map((item) => {
    if (item.codigo === e.currentTarget.id) {
      const liHtml = document.querySelector(`li:has(> h3#${item.codigo})`);
      criarInputs(liHtml, item.codigo, item.nome, item.valor);
    }
  });
};

carregarItens();

btnEditar.forEach((e) => {
  e.addEventListener("click", editarItem);
});
