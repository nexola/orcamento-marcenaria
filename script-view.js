import ItensJSON from "./itens.json" assert { type: "json" };

const htmlInicial = document.querySelectorAll(".lista");
let btnEditar;
let htmlItens;

const criarLi = function (codigo, nome, valor) {
  const liEle = `<li class="item">
  <h3 id="${codigo}">${nome}</h3>
  <span id="${codigo}">${valor}</span>
  <a href="" id="${codigo}">EDITAR</a>
</li>`;

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
        elemento.insertAdjacentHTML("beforebegin", liEle);
        htmlItens = document.querySelectorAll(".item input[type='number']");
        btnEditar = document.querySelectorAll(".item a");
      }
    });
  });
};

const criarInputs = function (codigo, nome, valor) {
  return `<input type="text" name="${codigo}" id="${codigo}" value="${nome}" style="width: fit-content;">
  <input type="text" name="${codigo}" id="${codigo}" value="${valor}" width="44px">
  <a href="" id="${codigo}">OK</a>`;
};

const editarItem = function (e) {
  e.preventDefault();
  Array.from(ItensJSON).map((item) => {
    if (item.codigo === e.currentTarget.id) {
      const liHtml = document.querySelector(`li:has(> h3#${item.codigo})`);
      const input = criarInputs(item.codigo, item.nome, item.valor);
      liHtml.innerHTML = input;
    }
  });
};

carregarItens();

btnEditar.forEach((e) => {
  e.addEventListener("click", editarItem);
});
