import {listarMercaderias, listarPedido} from '../services/MercaderiaService.js';

window.onload = () => {
  listarMercaderias();
  listarPedido();
};
