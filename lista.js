const inventarioVehiculosList = document.querySelector(".inventario-vehiculos-list");
const inventarioVehiculosForm = document.querySelector(".inventario-vehiculos-form");
const filterButtonsVehiculos = document.querySelectorAll("[data-filter-vehiculos]");
const clearButtonsVehiculos = document.querySelectorAll("[data-clear-vehiculos]");

document.addEventListener("DOMContentLoaded", initializeVehiculos);

// Aquí inicia la app de Inventario de Vehículos

function initializeVehiculos() {
  loadVehiculos();
  handleDragDropVehiculos();
  updateNoticeVehiculos();

  inventarioVehiculosForm.addEventListener("submit", handleFormSubmitVehiculos);

  filterButtonsVehiculos.forEach(function (button) {
    button.addEventListener("click", handleFilterSelectionVehiculos);
  });

  clearButtonsVehiculos.forEach(function (button) {
    button.addEventListener("click", handleClearItemsVehiculos);
  });
}

function saveVehiculos() {
  const listItems = inventarioVehiculosList.querySelectorAll("li");

  const inventarioVehiculosItems = [];
  listItems.forEach(function (listItem) {
    const id = listItem.getAttribute("data-id");
    const nombre = listItem.querySelector(".vehiculo-nombre").textContent;
    const serie = listItem.querySelector(".vehiculo-serie").textContent;
    const modelo = listItem.querySelector(".vehiculo-modelo").textContent;
    const tipo = listItem.querySelector(".vehiculo-tipo").textContent;
    const anno = listItem.querySelector(".vehiculo-anno").textContent;
    const telefono = listItem.querySelector(".vehiculo-telefono").textContent;
    const completado = listItem.hasAttribute("data-completed");

    inventarioVehiculosItems.push({ id, nombre, serie, modelo, tipo, anno, telefono, completado });
  });

  localStorage.setItem("inventarioVehiculosItems", JSON.stringify(inventarioVehiculosItems));
}

function loadVehiculos() {
  const inventarioVehiculosItems = JSON.parse(localStorage.getItem("inventarioVehiculosItems")) || [];

  inventarioVehiculosList.innerHTML = "";

  inventarioVehiculosItems.forEach(function (vehiculo) {
    const li = createVehiculoItem(vehiculo);

    inventarioVehiculosList.appendChild(li);
  });
}

function createVehiculoItem(vehiculo) {
  const { id, nombre, serie, modelo, tipo, anno, telefono, completado } = vehiculo;

  // checkbox
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = completado;
  input.addEventListener("change", toggleCompletedVehiculos);

  // vehiculo nombre
  const divNombre = document.createElement("div");
  divNombre.textContent = nombre;
  divNombre.classList.add("vehiculo-nombre");
  divNombre.addEventListener("click", openEditModeVehiculos);
  divNombre.addEventListener("blur", closeEditModeVehiculos);
  divNombre.addEventListener("keydown", handleEnterKeyVehiculos);

  // vehiculo serie
  const divSerie = document.createElement("div");
  divSerie.textContent = serie;
  divSerie.classList.add("vehiculo-serie");
  divSerie.addEventListener("click", openEditModeVehiculos);
  divSerie.addEventListener("blur", closeEditModeVehiculos);
  divSerie.addEventListener("keydown", handleEnterKeyVehiculos);

  // vehiculo modelo
  const divModelo = document.createElement("div");
  divModelo.textContent = modelo;
  divModelo.classList.add("vehiculo-modelo");
  divModelo.addEventListener("click", openEditModeVehiculos);
  divModelo.addEventListener("blur", closeEditModeVehiculos);
  divModelo.addEventListener("keydown", handleEnterKeyVehiculos);

  // vehiculo tipo
  const divTipo = document.createElement("div");
  divTipo.textContent = tipo;
  divTipo.classList.add("vehiculo-tipo");
  divTipo.addEventListener("click", openEditModeVehiculos);
  divTipo.addEventListener("blur", closeEditModeVehiculos);
  divTipo.addEventListener("keydown", handleEnterKeyVehiculos);

  // vehiculo anno
  const divAnno = document.createElement("div");
  divAnno.textContent = anno;
  divAnno.classList.add("vehiculo-anno");
  divAnno.addEventListener("click", openEditModeVehiculos);
  divAnno.addEventListener("blur", closeEditModeVehiculos);
  divAnno.addEventListener("keydown", handleEnterKeyVehiculos);

  // vehiculo telefono
  const divTelefono = document.createElement("div");
  divTelefono.textContent = telefono;
  divTelefono.classList.add("vehiculo-telefono");
  divTelefono.addEventListener("click", openEditModeVehiculos);
  divTelefono.addEventListener("blur", closeEditModeVehiculos);
  divTelefono.addEventListener("keydown", handleEnterKeyVehiculos);

  // delete button
  const button = document.createElement("button");
  button.innerHTML = "&times";
  button.classList.add("delete-button");
  button.addEventListener("click", removeItemVehiculos);

  // drag icon
  const span = document.createElement("span");
  span.innerHTML = "&equiv;";
  span.classList.add("drag-icon");

  const li = document.createElement("li");
  li.draggable = true;
  li.setAttribute("data-id", id);
  li.toggleAttribute("data-completed", completado);

  li.appendChild(input);
  li.appendChild(divNombre);
  li.appendChild(divSerie);
  li.appendChild(divModelo);
  li.appendChild(divTipo);
  li.appendChild(divAnno);
  li.appendChild(divTelefono);
  li.appendChild(button);
  li.appendChild(span);

  return li;
}

function removeItemVehiculos(e) {
  const listItem = e.target.parentNode;

  inventarioVehiculosList.removeChild(listItem);

  updateNoticeVehiculos();
  saveVehiculos();
}

function addVehiculoItem(vehiculo) {
  const newListItem = createVehiculoItem({
    id: generateUniqueId(),
    nombre: vehiculo.nombre,
    serie: vehiculo.serie,
    modelo: vehiculo.modelo,
    tipo: vehiculo.tipo,
    anno: vehiculo.anno,
    telefono: vehiculo.telefono,
    completado: false,
  });

  inventarioVehiculosList.prepend(newListItem);

  updateFilteredItemsVehiculos();
  updateNoticeVehiculos();
  saveVehiculos();
}

function filterItemsVehiculos(filter) {
  const listItems = inventarioVehiculosList.querySelectorAll("li");

  listItems.forEach(function (listItem) {
    const completado = listItem.hasAttribute("data-completed");

    if ("completed" === filter) {
      listItem.style.display = completado ? "flex" : "none";
    } else if ("incomplete" === filter) {
      listItem.style.display = completado ? "none" : "flex";
    } else {
      listItem.style.display = "flex";
    }
  });
}

function toggleCompletedVehiculos(e) {
  const listItem = e.target.parentNode;

  listItem.toggleAttribute("data-completed", this.checked);

  updateFilteredItemsVehiculos();
  saveVehiculos();
}

function openEditModeVehiculos(e) {
  const vehiculoProperty = e.target;
  const listItem = vehiculoProperty
