import { listarMercaderias } from "../services/MercaderiaService.js";

window.onload = () => {
  listarMercaderias();
};

window.onsubmit = (event) => {
    event.preventDefault();
    let direccion = document.getElementById("direccion").value;
    let partido = document.getElementById("partido").value;
    let telefono = document.getElementById("telefono").value;
    let tipoEnvio;
  
    let btnradio1 = document.getElementById("btnradio1");
    let btnradio2 = document.getElementById("btnradio2");
    let btnradio3 = document.getElementById("btnradio3");
    if (btnradio1.checked) tipoEnvio = btnradio1.value;
    if (btnradio2.checked) tipoEnvio = btnradio2.value;
    if (btnradio3.checked) tipoEnvio = btnradio3.value;
  

  
  };
