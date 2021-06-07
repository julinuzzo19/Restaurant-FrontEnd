import {URL_API_MERCADERIA, URL_API_COMANDA} from '../js/constants.js';

var precioActual = 0;

const actualizarTotal = async (precioMercaderia) => {
  precioActual = precioActual + precioMercaderia;
  const element = document.getElementById('total');

  element.innerHTML = `Precio total: $${precioActual}`;
};

const getMercaderiaById = async (mercaderiaId) => {
  return await fetch(URL_API_MERCADERIA + '/' + mercaderiaId)
    .then((response) => response.json())
    .then((res) => {
      return res;
    });
};

export const listarMercaderias = (tipoMercaderiaId) => {
  let urlGetMercaderias = URL_API_MERCADERIA;

  if (tipoMercaderiaId != null || tipoMercaderiaId != undefined) {
    urlGetMercaderias = urlGetMercaderias + `?TipoMercaderiaId=${tipoMercaderiaId}`;
  }

  fetch(urlGetMercaderias)
    .then((response) => response.json())
    .then((response) => {
      mostrarMercaderias(response);
    });
};

const mostrarMercaderias = (mercaderias) => {
  const place = document.getElementById('listaMercaderias');

  place.innerHTML = ``;

  if (mercaderias.length == 0) {
    place.innerHTML = `
    <h2 class="text-center mt-5 mb-5 h-100">No hay platos del tipo seleccionado.</h2>
    <i class="far fa-frown mb-5 mt-2 fa-6x text-center"></i>
    `;
  }
  for (const mercaderia of mercaderias) {
    const element = document.createElement('div');
    element.className = 'd-inline-block col-3 mt-2 ';

    element.innerHTML = `    
          <div class="card d-inline-block">
            <img src="${mercaderia.imagen}" height="120" class="card-img-top" data-bs-toggle="modal"
            data-bs-target="#modal${mercaderia.mercaderiaId}"/>
            <div class="card-body" data-bs-toggle="modal"
            data-bs-target="#modal${mercaderia.mercaderiaId}">
              <h4 class="card-title">${mercaderia.nombre}</h4>
              <p class="card-text mt-2">${mercaderia.tipoMercaderia}</p>
              <h4 class="precio">$${mercaderia.precio}</h4>
              </div>
              <div class="card-footer">
              <div class="col-6 d-inline-block ">
                <a name="btn-mercaderia-card" id="btn-card-${mercaderia.mercaderiaId}" class="btn btn-success bg-gradient btn-footer-card">Agregar</a>
              
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
  const place = document.getElementById('lista-modals');
  const element = document.createElement('div');

  element.innerHTML = `
    <div class="modal" tabindex="-1" id="modal${mercaderia.mercaderiaId}">
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
      
            <h5 class="mt-2">Preparación</h5>
            ${mercaderia.preparacion}
          </div>
          <div class="modal-footer d-block">
            <div class="row justify-content-center ">
              <div class="col-6"><button  data-bs-toggle="modal"
                data-bs-target="#modal${mercaderia.mercaderiaId}" class="btn btn-danger w-100">Cerrar</button></div>
              
              
              <div class="col-6"><button name="btn-mercaderia-card" id="btn-add-modal-${mercaderia.mercaderiaId}"  class="btn btn-success bg-gradient w-100">Agregar al pedido</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
  `;

  place.appendChild(element);
};

const listarMercaderiaPedida = (mercaderia, cantidad) => {
  const place = document.getElementById('ListadoPedido');

  const element = document.createElement('div');
  element.id = `${mercaderia.mercaderiaId}`;
  element.className = 'row pedido-row border border-dark mb-2';
  element.innerHTML = `
     <div class="col-3 p-0">
     <img  src="${mercaderia.imagen}" height="91px" width="80px" >
     </div> 
     
     <div class="col-9 p-0">
   
     <div class="row">
     <span class="nombre-pedido">${mercaderia.nombre}</span class="nombre-pedido">
     </div> 
     <div class="row">
    
    <div class="col-4">
     <h6>${mercaderia.tipoMercaderia}</h6>
     <h6 class="fw-bold" >$${mercaderia.precio * cantidad}</h6> 
     </div>
     <div class="col-4">
     <p class="pedido-row-cant text-center" id="cant-${
       mercaderia.mercaderiaId
     }" >Cantidad: ${cantidad}</p>
     </div>


     <div class="col-4">
     <button name="remove-item-pedido" id="btn-${
       mercaderia.mercaderiaId
     }" type="button" class="btn btn-danger "><i class="fas fa-trash"></i></button>

      </div>     
      </div> 
      </div>   
  `;
  place.appendChild(element);
  actualizarTotal(mercaderia.precio * cantidad);
};

const crearComanda = (envio, mercaderia) => {
  let formaEntrega = envio.tipo;

  let bodyPedido = {
    mercaderia,
    formaEntrega
  };
  let bodyPedidoJson = JSON.stringify(bodyPedido);

  let formCanvasOff = document.getElementById('offcanvas-body');

  fetch(URL_API_COMANDA, {
    method: 'post',
    headers: {'Content-Type': 'application/json;charset=UTF-8'},
    body: bodyPedidoJson
  })
    .then((response) => {
      response.json();

      if (response.status == 201) {
        formCanvasOff.innerHTML = ` 
      <div class="card text-center p-0 my-2  w-100">
        <div class="card-header bg-transparent text-success border-0">
          <i class="far fa-check-circle display-4 d-block"></i>
          <h5 class="card-title text-success display-4 d-block">Compra exitosa!</h5>    
        </div>
        <div class="card-body fw-bold">
          <p class="card-text lead">La compra se ha realizado con éxito.</p>
          <p class="mt-5">Direccion de envio: ${envio.direccion}</p>
          <p>Partido: ${envio.partido}</p>
          <p>Telefono: ${envio.telefono}</p>
          <p>Forma de envio: ${envio.nombreTipo}</p>
          <a  href="javascript:location.reload()" class="btn btn-primary  mt-2">Volver al menú </a>
        </div>
      </div>`;
      } else {
        formCanvasOff.innerHTML = ` <div class="card text-center p-0 my-2 w-100">
      <div class="card-header bg-transparent text-danger border-0">
      <i class="fas fa-exclamation-triangle fa-3x"></i>
        <h5 class="card-title text-danger display-4 d-block">Compra Fallida!</h5>
      </div>
      <div class="card-body">
        <p class="card-text lead">La compra no se ha realizado.</p>
        <a  href="javascript:location.reload()" class="btn btn-danger mt-3">Volver al menú </a>
      </div>
    </div>`;
      }
    })
    .catch(() => {
      formCanvasOff.innerHTML = ` <div class="card text-center p-0 my-2 w-100">
      <div class="card-header bg-transparent text-danger border-0">
      <i class="fas fa-exclamation-triangle fa-3x"></i>
        <h5 class="card-title text-danger display-4 d-block">Compra Fallida!</h5>
      </div>
      <div class="card-body">
        <p class="card-text lead">La compra no se ha realizado.</p>
        <a  href="javascript:location.reload()" class="btn btn-danger mt-3">Volver al menú </a>
      </div>
    </div>`;
    });
};

document.addEventListener('click', async (e) => {
  e.stopImmediatePropagation();
  if (e.target.name == 'btn-mercaderia-card') {
    let itemId = e.target.id.charAt(e.target.id.length - 1);

    let cantidad = document.getElementById(`input-cant-${itemId}`).value;

    let mercaderia = await getMercaderiaById(itemId);
    listarMercaderiaPedida(mercaderia, cantidad);
  }

  if (e.target.name == 'remove-item-pedido') {
    let btnId = e.target.id;
    let itemId = btnId.substring(4, btnId.lenght);

    let itemPedido = document.getElementById(`${itemId}`);
    let place = itemPedido.parentNode;

    let mercaderia = await getMercaderiaById(itemId);

    let cantidad = document.getElementById(`input-cant-${itemId}`).value;

    place.removeChild(itemPedido);

    actualizarTotal(-mercaderia.precio * cantidad);
  }
});

window.onsubmit = (event) => {
  event.preventDefault();
  let direccion = document.getElementById('direccion').value;
  let partido = document.getElementById('partido').value;
  let telefono = document.getElementById('telefono').value;
  let tipoEnvio;
  let nombreTipoEnvio;

  let btnradio1 = document.getElementById('Delivery');
  let btnradio2 = document.getElementById('Salon');
  let btnradio3 = document.getElementById('Pedidos Ya');

  if (btnradio1.checked) {
    tipoEnvio = parseInt(btnradio1.value);
    nombreTipoEnvio = btnradio1.id;
  }
  if (btnradio2.checked) {
    tipoEnvio = parseInt(btnradio2.value);
    nombreTipoEnvio = btnradio2.id;
  }
  if (btnradio3.checked) {
    tipoEnvio = parseInt(btnradio3.value);
    nombreTipoEnvio = btnradio3.id;
  }

  let envio = {
    direccion: direccion,
    partido: partido,
    telefono: telefono,
    tipo: tipoEnvio,
    nombreTipo: nombreTipoEnvio
  };

  let listaPedidos = [];
  const place = document.getElementById('ListadoPedido');
  place.childNodes.forEach((element) => {
    let cantidad = document.getElementById(`input-cant-${element.id}`).value;

    for (let index = 0; index < cantidad; index++) {
      listaPedidos.push(parseInt(element.id));
    }
  });

  crearComanda(envio, listaPedidos);
};

const inputFilter = document.getElementById('tipoMercaderiaSelect');

inputFilter.oninput = () => {
  if (inputFilter.value != 0) {
    listarMercaderias(inputFilter.value);
  } else {
    listarMercaderias();
  }
};
