import { URL_API_COMANDA } from "../js/constants.js";

export const listarComandas = () => {
  fetch(URL_API_COMANDA)
    .then((response) => response.json())
    .then((response) => {
      mostrarComandas(response);
    });
};

const mostrarComandas = (comandas) => {
  console.log(comandas);

  for (const comanda of comandas) {
    const place = document.getElementById("listaComandas");
    const element = document.createElement("div");

    element.innerHTML = `
    <article class="article-item">

    </article>
    `;

    place.appendChild(element);
  }
};
