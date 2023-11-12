// Funciones  - obligatorio 2do semestre 2023

let sistema = new Sistema();

window.addEventListener("load", programa);

function programa() {
  /* Categorias */
  let btnAgregarCategoria = document.getElementById("idBotonAgregarCategoria");
  btnAgregarCategoria.addEventListener("click", crearCategoria);

  let btnEliminarCategoria = document.getElementById("idBotonBajaCategoria");
  btnEliminarCategoria.addEventListener("click", eliminarCategoria);

  /* Experiencias */
  let btnAgregarExperiencia = document.getElementById("idBotonAltaExperiencia");
  btnAgregarExperiencia.addEventListener("click", agregarExperiencia);
}

/* Gestionar categorias */
function crearCategoria() {
  let formulario = document.getElementById("idFormCategoria");
  if (formulario.reportValidity()) {
    let nombre = document.getElementById("idNombreCategoria").value;
    let descripcion = document.getElementById("idDetallesCategoria").value;

    let categoria = new Categoria(nombre, descripcion);

    sistema.agregarCategoria(categoria);

    formulario.reset();
    actualizarCombosCategorias();
  }
}

function eliminarCategoria() {
  let combosDeCategoriasEliminar = document.getElementById("idComboCategoriasAbajo");

  let categoria = sistema.categorias.find(function (categoriaActual) {
    if (categoriaActual.nombre === combosDeCategoriasEliminar.value) {
      return categoriaActual;
    }
  });

  sistema.eliminarCategoria(categoria);
  actualizarCombosCategorias();
}

function actualizarCombosCategorias() {
  let comboDeCategoriasFiltro = document.getElementById("idComboCategoriasIzquierda");
  let comboDeCategoriasEliminar = document.getElementById("idComboCategoriasAbajo");
  let comboDeCategoriasExperiencias = document.getElementById("idCategoriaExperiencia");

  comboDeCategoriasFiltro.innerHTML = "";
  comboDeCategoriasEliminar.innerHTML = "";
  comboDeCategoriasExperiencias.innerHTML = "";

  for (let i = 0; i < sistema.categorias.length; i++) {
    let opcionParaComboFiltro = document.createElement("option");
    let opcionParaComboEliminar;
    let opcionParaComboExperiencias;

    opcionParaComboFiltro.value = sistema.categorias[i].nombre;
    opcionParaComboFiltro.text = sistema.categorias[i].nombre;

    opcionParaComboEliminar = opcionParaComboFiltro.cloneNode(true);
    opcionParaComboExperiencias = opcionParaComboFiltro.cloneNode(true);

    comboDeCategoriasFiltro.appendChild(opcionParaComboFiltro);
    comboDeCategoriasEliminar.appendChild(opcionParaComboEliminar);
    comboDeCategoriasExperiencias.appendChild(opcionParaComboExperiencias);
  }

  actualizarBtns();
}

/* Gestionar experiencias */

function agregarExperiencia() {
  let formulario = document.getElementById("idFormExperiencia");
  if (formulario.reportValidity()) {
    let titulo = document.getElementById("idTituloExperiencia").value;
    let descripcion = document.getElementById("idDescripcionExperiencia").value;
    let precio = document.getElementById("idPrecioExperiencia").value;
    let cantidadPersonas = document.getElementById("idCantidadPersonasExperiencia").value;
    let categoria = document.getElementById("idCategoriaExperiencia").value;

    let experiencia = new Experiencia(titulo, descripcion, precio, cantidadPersonas, categoria);
    console.log(experiencia);

    sistema.agregarExperiencia(experiencia);

    formulario.reset();
    actualizarCombosExperiencia();
  }
}

function actualizarCombosExperiencia() {
  let comboExperiencia = document.getElementById("idComboBajaExperiencia");

  comboExperiencia.innerHTML = "";

  for (let i = 0; i < sistema.experiencias.length; i++) {
    let opcionComboExperiencia = document.createElement("option");

    opcionComboExperiencia.value = sistema.experiencias[i].titulo;
    opcionComboExperiencia.text = sistema.experiencias[i].titulo;

    comboExperiencia.appendChild(opcionComboExperiencia);
  }

  actualizarBtns();
}

/* utils */

function actualizarBtns() {
  let btnEliminarCategoria = document.getElementById("idBotonBajaCategoria");
  let btnAgregarExperiencia = document.getElementById("idBotonAltaExperiencia");

  if (sistema.categorias.length > 0) {
    btnEliminarCategoria.disabled = false;
    btnAgregarExperiencia.disabled = false;
  } else {
    btnEliminarCategoria.disabled = true;
    btnAgregarExperiencia.disabled = true;
  }
}
