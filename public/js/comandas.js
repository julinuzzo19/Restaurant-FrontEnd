import {listarComandas, obtenerFecha} from '../services/comandaService.js';

window.onload = () => {
  obtenerFecha();
  listarComandas();
};
