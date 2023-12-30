// Define una variable para almacenar el inventario de vehículos
let inventarioVehiculos = [];

// Función que se ejecuta cuando el DOM está cargado
document.addEventListener("DOMContentLoaded", () => {
  // Intenta obtener el inventario almacenado en localStorage; si no existe, usa un array vacío
  inventarioVehiculos =
    JSON.parse(localStorage.getItem("inventarioVehiculos")) || [];
  // Actualiza la interfaz del inventario
  actualizarInventarioVehiculos();
});

// Función para agregar un vehículo al inventario
function agregar() {
  const nombre = document.getElementById("nombreInput").value;
  const serie = document.getElementById("serieInput").value;
  const modelo = document.getElementById("modeloInput").value;
  const tipo = document.getElementById("tipoInput").value;
  const annio = document.getElementById("annioInput").value;
  const telefono = document.getElementById("telefonoInput").value;

  // Busca si el vehículo ya existe en el inventario
  const vehiculoExistente = inventarioVehiculos.find((v) => v.serie === serie);

  // Si el vehículo ya existe, actualiza la información
  if (vehiculoExistente) {
    vehiculoExistente.nombre = nombre;
    vehiculoExistente.modelo = modelo;
    vehiculoExistente.tipo = tipo;
    vehiculoExistente.annio = annio;
    vehiculoExistente.telefono = telefono;
  } else {
    // Si el vehículo no existe, agrégalo al inventario
    inventarioVehiculos.push({ nombre, serie, modelo, tipo, annio, telefono });
  }

  // Limpia los campos de entrada
  limpiarInputs();
  // Actualiza la interfaz del inventario
  actualizarInventarioVehiculos();
  // Guarda los datos en localStorage
  guardarDatos();
}

// Función para quitar un vehículo del inventario
function quitar() {
  const serie = document.getElementById("serieInput").value;

  // Busca el vehículo en el inventario
  const vehiculoExistente = inventarioVehiculos.find((v) => v.serie === serie);

  // Si el vehículo existe y se intenta quitar, elimínalo del inventario
  if (vehiculoExistente) {
    const indice = inventarioVehiculos.indexOf(vehiculoExistente);
    inventarioVehiculos.splice(indice, 1);
    // Actualiza la interfaz del inventario
    actualizarInventarioVehiculos();
    // Guarda los datos en localStorage
    guardarDatos();
  } else {
    alert(
      "No se encontró ningún vehículo con el número de serie proporcionado."
    );
  }
}

// Función para limpiar los campos de entrada
function limpiarInputs() {
  document.getElementById("nombreInput").value = "";
  document.getElementById("serieInput").value = "";
  document.getElementById("modeloInput").value = "";
  document.getElementById("tipoInput").value = "";
  document.getElementById("annioInput").value = "";
  document.getElementById("telefonoInput").value = "";
}

// Función para actualizar la interfaz del inventario de vehículos
function actualizarInventarioVehiculos() {
  const inventarioTableBody = document.querySelector("#inventarioBody");
  inventarioTableBody.innerHTML = "";

  inventarioVehiculos.forEach((vehiculo) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${vehiculo.nombre}</td>
      <td>${vehiculo.serie}</td>
      <td>${vehiculo.modelo}</td>
      <td>${vehiculo.tipo}</td>
      <td>${vehiculo.annio}</td>
      <td>${vehiculo.telefono}</td>
    `;
    inventarioTableBody.appendChild(fila);
  });
}

// Función para reiniciar el inventario de vehículos
function reiniciarLista() {
  inventarioVehiculos = [];
  // Actualiza la interfaz del inventario
  actualizarInventarioVehiculos();
  // Guarda los datos en localStorage
  guardarDatos();
}

// Función para filtrar vehículos en el inventario
function filtrar() {
  const buscarInput = document.getElementById("buscarInput");
  const filtro = buscarInput.value.toLowerCase();
  const inventarioFiltrado = inventarioVehiculos.filter(
    (vehiculo) =>
      vehiculo.nombre.toLowerCase().includes(filtro) ||
      vehiculo.serie.toLowerCase().includes(filtro) ||
      vehiculo.modelo.toLowerCase().includes(filtro) ||
      vehiculo.tipo.toLowerCase().includes(filtro) ||
      vehiculo.annio.toLowerCase().includes(filtro) ||
      vehiculo.telefono.toLowerCase().includes(filtro)
  );

  const inventarioTableBody = document.getElementById("inventarioBody");
  inventarioTableBody.innerHTML = "";

  inventarioFiltrado.forEach((vehiculo) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${vehiculo.nombre}</td>
      <td>${vehiculo.serie}</td>
      <td>${vehiculo.modelo}</td>
      <td>${vehiculo.tipo}</td>
      <td>${vehiculo.annio}</td>
      <td>${vehiculo.telefono}</td>
    `;
    inventarioTableBody.appendChild(fila);
  });
}

// Función para guardar el inventario de vehículos en localStorage
function guardarDatos() {
  localStorage.setItem(
    "inventarioVehiculos",
    JSON.stringify(inventarioVehiculos)
  );
}
