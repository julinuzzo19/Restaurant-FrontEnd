import { URL_API_MERCADERIA } from "../js/constants.js";

export const listarMercaderias = () => {
  fetch(URL_API_MERCADERIA)
    .then((response) => response.json())
    .then((response) => {
      mostrarMercaderias(response);
    });
};

const mostrarMercaderias = (mercaderias) => {
  console.log(mercaderias);
  const place = document.getElementById("listaMercaderias");
  for (const mercaderia of mercaderias) {
    
    
    
    const element = document.createElement("div");
    element.className = "d-inline-block col-3 mt-2";

    element.innerHTML = `    
          <div class="card d-inline-block" data-bs-toggle="modal"
          data-bs-target="#modal${mercaderia.mercaderiaId}">
            <img src="${mercaderia.imagen}" height="170" class="card-img-top"/>
            <div class="card-body">
              <h5 class="card-title">${mercaderia.nombre}</h5>
              <p class="card-text">${mercaderia.ingredientes}.</p>
              <div class="col-6 d-inline-block">
                <a href="#" class="btn btn-primary">Agregar</a>
              </div>
              <div class="col-5 d-inline-block text-end">
                <h4 class="precio">$${mercaderia.precio}</h4>
              </div>
            </div>
          </div>
      `;

    place.appendChild(element);
    crearModal(mercaderia);
  
  }
};

 const crearModal=(mercaderia)=>{
    
    const place = document.getElementById("lista-modals");
    const element = document.createElement("div");
    
    element.innerHTML=`
    <div class="modal w-100" tabindex="-1" id="modal${mercaderia.mercaderiaId}">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header p-0">
            <img
              id="img-modal"
              src="${mercaderia.imagen}"
            />
          </div>
          <div class="modal-body">
            <h2 class="fw-bold">${mercaderia.nombre}</h2>
            <h5>$${mercaderia.precio}</h5>

            <h5>Ingredientes</h5>
            ${mercaderia.ingredientes}
            <p></p>
            <h5>Preparación</h5>
            ${mercaderia.preparacion}
          </div>
          <div class="modal-footer d-block">
            <div class="row justify-content-center ">
              <div class="col-6"><button  data-bs-toggle="modal"
                data-bs-target="#modal${mercaderia.mercaderiaId}" class="btn btn-danger w-100">Cerrar</button></div>
              
              
              <div class="col-6"><button class="btn btn-primary w-100">Agregar al pedido</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
  `

  place.appendChild(element);
}