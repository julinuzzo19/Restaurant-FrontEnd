import {URL_API_COMANDA} from '../js/constants.js';

export const obtenerFecha = () => {};

export const listarComandas = () => {
  let fechaActual = new Date();
  let fechaDia =
    fechaActual.getDate() +
    '/' +
    (fechaActual.getMonth() + 1) +
    '/' +
    fechaActual.getFullYear();
  let fechaQuery =
    fechaActual.getFullYear() +
    '/' +
    (fechaActual.getMonth() + 1) +
    '/' +
    fechaActual.getDate();

  document.getElementById('fechaActual').innerText = fechaDia;
  fetch(URL_API_COMANDA + `?Fecha=${fechaQuery}`)
    .then((response) => response.json())
    .then((response) => {
      mostrarComandas(response);
    });
};

const mostrarComandas = (comandas) => {
  let contador = 0;
  const place = document.getElementById('listaComandas');
  if (comandas.length == 0) {
    let element = document.createElement('div');
    element.className = 'text-center mt-3';
    element.innerHTML = `<h3 class="mb-5 mt-5">No hay comandas en el dia de la fecha </h3>
    <i class="far fa-frown mb-5 fa-6x"></i>`;
    place.appendChild(element);
  }

  for (let item of comandas) {
    contador++;
    let element = document.createElement('div');
    element.className = 'row text-center';

    element.innerHTML = `
    <div class="accordion-item w-75 mb-2 p-0">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed text-white bg-dark"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapse-${item.comandaId}">
       
        <div class="col-4">
          <div class="row text-center">
            <div class="row row-comanda "><span class="fw-bold">#${contador}</span></div>
          </div>
        </div>
        <div class="col-4">
          <div class="row text-center">     
            <div class="row text-center"><span class="fw-bold">${item.formaEntrega}</span></div>
          </div>
        </div>
        <div class="col-4">
          <div class="row text-center">        
            <div class="row"><span class="fw-bold">$${item.precioTotal}</span></div>
          </div>
        
        </div>
      </button>
    </h2>
    <div
      id="collapse-${item.comandaId}"
      class="accordion-collapse collapse"
      data-bs-parent="#accordionComanda"
    >
      <div class="accordion-body p-1">
        <ul id="listaMercaderia-${item.comandaId}"> 
        </ul>
      </div>
    </div>
  </div>

    `;

    place.appendChild(element);

    let mercaderiaSinRepeticion = [];
    item.nombreMercaderia.forEach((item) => {
      if (!mercaderiaSinRepeticion.includes(item)) {
        mercaderiaSinRepeticion.push(item);
      }
    });

    for (let mercaderia of mercaderiaSinRepeticion) {
      const place2 = document.getElementById(`listaMercaderia-${item.comandaId}`);
      let element2 = document.createElement('li');
      element2.className = 'fw-bold';

      let listaContadorRepetidos = item.nombreMercaderia.reduce(
        (contador, actual) => (
          contador[actual] ? (contador[actual] += 1) : (contador[actual] = 1),
          contador
        ),
        {}
      );

      let cantidad = listaContadorRepetidos[mercaderia];

      place2.append(element2);
      element2.innerHTML = `
      <div class="row">
      <div class="col-3">${mercaderia}</div>
      <div class="col-3">x ${cantidad}</div>
      </div>
      
      `;
    }
  }
};
