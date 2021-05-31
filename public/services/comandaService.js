import { URL_API_COMANDA } from "../js/constants.js";

export const obtenerFecha = () => {};

export const listarComandas = () => {
  let fechaActual = new Date();
  let fechaDia =
    fechaActual.getDate() +
    "/" +
    (fechaActual.getMonth() + 1) +
    "/" +
    fechaActual.getFullYear();
  let fechaQuery =
    fechaActual.getFullYear() +
    "/" +
    (fechaActual.getMonth() + 1) +
    "/" +
    fechaActual.getDate();

  document.getElementById("fechaActual").innerText = fechaDia;
  fetch(URL_API_COMANDA + `?Fecha=${fechaQuery}`)
    .then((response) => response.json())
    .then((response) => {
      mostrarComandas(response);
    });
};

const mostrarComandas = (comandas) => {
  console.log(comandas);
  let contador = 0;
  const place = document.getElementById("listaComandas");
  for (let item of comandas) {
    contador++;
    let element = document.createElement("div");
    element.className = "row ";

    element.innerHTML = `
    <div class="accordion-item w-50 mb-2 p-0">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapse-${item.comandaId}">
       
        <div class="col-4">
          <div class="row text-center">
            <h5>Comanda</h5>
            <div class="row row-comanda "><span>#${contador}</span></div>
          </div>
        </div>

        <div class="col-4">
          <div class="row text-center">
            <h5>Forma de entrega</h5>
            <div class="row text-center"><span>${item.formaEntrega}</span></div>
          </div>
        </div>

        <div class="col-4">
          <div class="row text-center">
            <h5>Precio total</h5>
            <div class="row text-center"><span>$${item.precioTotal}</span></div>
          </div>
        
        </div>
      </button>
    </h2>
    <div
      id="collapse-${item.comandaId}"
      class="accordion-collapse collapse"
      data-bs-parent="#accordionComanda"
    >
      <div class="accordion-body">
        <ul id="listaMercaderia-${item.comandaId}">
        
        </ul>
      </div>
    </div>
  </div>

    `;

    place.appendChild(element);

    for (let mercaderia of item.nombreMercaderia) {
      const place2 = document.getElementById(
        `listaMercaderia-${item.comandaId}`
      );
      let element2 = document.createElement("li");

      place2.append(element2);
      element2.innerHTML = `${mercaderia}`;
    }
  }
};
