import {listarMercaderias, listarPedido} from '../services/MercaderiaService.js';

const carritoVacio = () => {
  const place = document.getElementById('ListadoPedido');
  place.innerHTML = `<h1>holaa</h1>`;
};

window.onload = () => {
  carritoVacio();
  listarMercaderias();
  listarPedido();
};
