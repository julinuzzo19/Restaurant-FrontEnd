import { URL_API_MERCADERIA } from "../js/constants.js";

var precioActual = 0;

const getMercaderiaById = async (mercaderiaId) => {
  return await fetch(URL_API_MERCADERIA + "/" + mercaderiaId)
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      return res;
    });
};

export const listarMercaderias = () => {
  fetch(URL_API_MERCADERIA)
    .then((response) => response.json())
    .then((response) => {
      mostrarMercaderias(response);
    });
};

const mostrarMercaderias = (mercaderias) => {
  const place = document.getElementById("listaMercaderias");
  for (const mercaderia of mercaderias) {
    const element = document.createElement("div");
    element.className = "d-inline-block col-3 mt-2";

    element.innerHTML = `    
          <div class="card d-inline-block">
            <img src="${mercaderia.imagen}" height="120" class="card-img-top" data-bs-toggle="modal"
            data-bs-target="#modal${mercaderia.mercaderiaId}"/>
            <div class="card-body" data-bs-toggle="modal"
            data-bs-target="#modal${mercaderia.mercaderiaId}">
              <h4 class="card-title">${mercaderia.nombre}</h4>
              <p  class="card-text mt-2">${mercaderia.tipoMercaderia}</p>
              <h4 class="precio">$${mercaderia.precio}</h4>
              </div>
              <div class="card-footer">
              <div class="col-6 d-inline-block ">
                <a name="btn-mercaderia-card" id="${mercaderia.mercaderiaId}" class="btn btn-success bg-gradient btn-footer-card">Agregar</a>
              
              </div>
              <div class="col-5 d-inline-block text-end div-footer-cant">
              <label class="fw-light label-input-card">Cantidad</label>
              <input class="cantItem" type="number" value=1 id="input-cant-${mercaderia.mercaderiaId}">
                
              </div>
              </div>
            
          </div>
      `;

    place.appendChild(element);
    crearModal(mercaderia);
  }
};

const crearModal = (mercaderia) => {
  const place = document.getElementById("lista-modals");
  const element = document.createElement("div");

  element.innerHTML = `
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
      
            <h5>Preparación</h5>
            ${mercaderia.preparacion}
          </div>
          <div class="modal-footer d-block">
            <div class="row justify-content-center ">
              <div class="col-6"><button  data-bs-toggle="modal"
                data-bs-target="#modal${mercaderia.mercaderiaId}" class="btn btn-danger w-100">Cerrar</button></div>
              
              
              <div class="col-6"><button class="btn btn-success bg-gradient w-100">Agregar al pedido</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
  `;

  place.appendChild(element);
};

const listarMercaderiaPedida = (mercaderia, cantidad) => {
  const place = document.getElementById("ListadoPedido");
  const element = document.createElement("div");
  element.id = `pedido-row-${mercaderia.mercaderiaId}`;
  element.className = "row pedido-row border border-dark mb-2";
  element.innerHTML = `
        <div class="col-3 p-0">
      <img class="border border-dark" src="${
        mercaderia.imagen
      }" height="100px" width="150px" alt="">
        </div>
    <div class="col-3 ">
      <h3>${mercaderia.nombre}</h3>
      <h6>${mercaderia.tipoMercaderia}</h6>
      <h6 class="fw-bold" >$${mercaderia.precio * cantidad}</h6> 
    </div>
    <div class="col-3">
    <p class="pedido-row-cant" id="cant-${
      mercaderia.mercaderiaId
    }" >Cantidad: ${cantidad}</p>
    
    </div>
    
    <div class="col-3">
      <button name="remove-item-pedido" id=${
        mercaderia.mercaderiaId
      } type="button" class="btn btn-danger mt-4 w-50"><i class="fas fa-trash"></i></button>
    </div>
  `;
  place.appendChild(element);
  actualizarTotal(mercaderia.precio * cantidad);
};

document.addEventListener("click", async (e) => {
  e.stopImmediatePropagation();
  if (e.target.name == "btn-mercaderia-card") {
    let itemId = e.target.id;
    let cantidad = document.getElementById(`input-cant-${itemId}`).value;

    let mercaderia = await getMercaderiaById(itemId);
    listarMercaderiaPedida(mercaderia, cantidad);
  }

  if (e.target.name == "remove-item-pedido") {
    
    let itemId=e.target.id;
    const place = document.getElementById("ListadoPedido");
    let itemPedido = document.getElementById(`pedido-row-${itemId}`);

    let mercaderia = await getMercaderiaById(itemId);

    //obtener cantidad de mercaderia
    let cantidad = document.getElementById(`input-cant-${itemId}`).value;

    actualizarTotal(-mercaderia.precio*cantidad);

    place.removeChild(itemPedido);
  }
});

const actualizarTotal = async (precioMercaderia) => {
  precioActual = precioActual + precioMercaderia;
  const element = document.getElementById("total");

  element.innerHTML = `Precio total: $${precioActual}`;
};
