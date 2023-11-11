// Funciones  - obligatorio 2do semestre 2023

let listaDeCategorias = [];

window.addEventListener("load", programa);

function programa() {
  let btnAgregar = document.getElementById("idBotonAgregarCategoria");
  btnAgregar.addEventListener("click", crearCategoria);
}

function actualizarCombos() {
  let combosDeCategorias = document.getElementById(
    "idComboCategoriasIzquierda"
  );

  let combosDeCategoriasEliminar = document.getElementById(
    "idComboCategoriasAbajo"
  );

  combosDeCategorias.innerHTML = "";
  combosDeCategoriasEliminar.innerHTML = "";

  for (let i = 0; i < listaDeCategorias.length; i++) {
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");

    option1.value = listaDeCategorias[i].nombre;
    option1.text = listaDeCategorias[i].nombre;
    option2.value = listaDeCategorias[i].nombre;
    option2.text = listaDeCategorias[i].nombre;

    combosDeCategorias.appendChild(option1);
    combosDeCategoriasEliminar.appendChild(option2);
  }
}

function crearCategoria() {
  let nombre = document.getElementById("idNombreCategoria").value;
  let descripcion = document.getElementById("idDetallesCategoria").value;

  let categoriaNueva = new Categoria(nombre, descripcion);
  let estaRepetida = false;

  for (let i = 0; i < listaDeCategorias.length && !estaRepetida; i++) {
    if (listaDeCategorias[i].nombre === categoriaNueva.nombre) {
      estaRepetida = true;
    }
  }

  if (!estaRepetida) {
    listaDeCategorias.push(categoriaNueva);
  } else {
    alert("Error, categoría existente");
  }

  document.getElementById("idNombreCategoria").value = "";
  document.getElementById("idDetallesCategoria").value = "";

  actualizarCombos();
}
