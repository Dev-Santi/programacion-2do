// Funciones  - obligatorio 2do semestre 2023

let sistema = new Sistema();

window.addEventListener("load", programa);

function programa() {
  /* --- Testeo --- */

  /* Categorias */
  let btnAgregarCategoria = document.getElementById("idBotonAgregarCategoria");
  btnAgregarCategoria.addEventListener("click", crearCategoria);

  let btnEliminarCategoria = document.getElementById("idBotonBajaCategoria");
  btnEliminarCategoria.addEventListener("click", eliminarCategoria);

  /* Experiencias */
  let btnAgregarExperiencia = document.getElementById("idBotonAltaExperiencia");
  btnAgregarExperiencia.addEventListener("click", agregarExperiencia);

  let btnEliminarExperiencia = document.getElementById("idBotonBajaExperiencia");
  btnEliminarExperiencia.addEventListener("click", eliminarExperiencia);

  /* Compras */
  resetearExperienciaSeleccionada();
  agregarEventoExperienciaSeleccionada();

  let btnComprar = document.getElementById("idBotonComprar");
  btnComprar.addEventListener("click", agregarCompra);

  /* Combo Categorías */
  let comboCategorias = document.getElementById("idComboCategoriasIzquierda");
  comboCategorias.addEventListener("change", detalleComprasCategoria);
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
    let nombreCategoria = document.getElementById("idCategoriaExperiencia").value;

    let categoria = sistema.categorias.find(function (categoriaActual) {
      return categoriaActual.nombre === nombreCategoria;
    });

    let experiencia = new Experiencia(titulo, descripcion, precio, cantidadPersonas, categoria);
    sistema.agregarExperiencia(experiencia);

    formulario.reset();

    actualizarCombosExperiencia();
    actualizarSeccionExperiencias();
    mostrarExperienciaMasCara();
  }
}

function eliminarExperiencia() {
  let nombreExperiencia = document.getElementById("idComboBajaExperiencia").value;

  let experiencia = sistema.experiencias.find(function (experienciaActual) {
    if (experienciaActual.titulo === nombreExperiencia) {
      return experienciaActual;
    }
  });

  sistema.eliminarExperiencia(experiencia);

  actualizarCombosExperiencia();
  actualizarSeccionExperiencias();
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

function actualizarSeccionExperiencias() {
  let tabla = document.getElementById("idTabla");
  tabla.innerHTML = "";

  let tbody = document.createElement("tbody");
  tabla.appendChild(tbody);

  //Crear una fila si hay experiencias, y crear otra cada dos tarjetas
  let fila = 1;
  for (let i = 0; i < sistema.experiencias.length; i = i + 2) {
    let tr = document.createElement("tr");
    tr.dataset.row = fila;
    tbody.appendChild(tr);
    fila++;
  }

  //Agregar tarjetas a las filas correspondientes, máximo 2 por fila
  let filaActual = 0;
  for (let i = 0; i < sistema.experiencias.length; i++) {
    let td = document.createElement("td");
    td.classList.add("experiencia");

    let elementoTitulo = document.createElement("p");
    let elementoDescripcion = document.createElement("p");
    let elementoPrecio = document.createElement("p");

    elementoTitulo.textContent = sistema.experiencias[i].titulo;
    elementoDescripcion.textContent = sistema.experiencias[i].descripcion;
    elementoDescripcion.classList.add("descripcion");
    elementoPrecio.textContent = "$" + sistema.experiencias[i].precio;

    let elementoImagen = document.createElement("img");
    let cantidadDePersonas = sistema.experiencias[i].cantidadPersonas;
    agregarLaImagen(cantidadDePersonas, elementoImagen);

    td.appendChild(elementoTitulo);
    td.appendChild(elementoDescripcion);
    td.appendChild(elementoPrecio);
    td.appendChild(elementoImagen);

    //Comprueba que cada fila solo tenga 2 tarjetas como máximo
    if (tbody.children[filaActual].children.length < 2) {
      tbody.children[filaActual].appendChild(td);
    } else {
      filaActual++;
      tbody.children[filaActual].appendChild(td);
    }
  }

  agregarEventoExperienciaSeleccionada();
}

function agregarLaImagen(cantidadDePersonas, imagen) {
  switch (cantidadDePersonas) {
    case "uno":
      imagen.src = "img/uno.png";
      imagen.alt = "Imagen de contorno de una persona";
      break;
    case "dos":
      imagen.src = "img/dos.png";
      imagen.alt = "Imagen de contorno de dos personas";
      break;
    case "varias":
      imagen.src = "img/muchos.png";
      imagen.alt = "Imagen de contorno de varias personas";
      break;
    default:
      imagen.src = "";
      imagen.alt = "Imagen no encontrada";
      break;
  }
}

/* Gestion de Compras */
function resetearExperienciaSeleccionada() {
  let textoExperienciaCompra = document.getElementById("idCualExperiencia");
  textoExperienciaCompra.textContent = "Experiencia: sin datos";
  document.getElementById("idBotonComprar").disabled = true;
}

function agregarEventoExperienciaSeleccionada() {
  let experiencias = document.getElementsByClassName("experiencia");
  for (let i = 0; i < experiencias.length; i++) {
    experiencias[i].addEventListener("click", function () {
      let textoExperienciaCompra = document.getElementById("idCualExperiencia");
      textoExperienciaCompra.textContent = "Experiencia: " + experiencias[i].children[0].textContent;
      document.getElementById("idBotonComprar").disabled = false;
    });
  }
}

function agregarCompra() {
  let formulario = document.getElementById("idFormCompra");
  if (formulario.reportValidity()) {
    let nombreExperiencia = document.getElementById("idCualExperiencia").textContent.slice(13); // .textContent.slice(13) saltea el contenido: "Experiencia: " para acceder directamente al titulo de la experiencia.
    let comprador = document.getElementById("idNombreComprador").value;
    let email = document.getElementById("idMail").value;

    let experiencia = sistema.experiencias.find(function (experienciaActual) {
      return experienciaActual.titulo === nombreExperiencia;
    });

    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth();
    let anio = fecha.getFullYear();
    let hora = fecha.getHours();
    let fechaHora = dia + " " + mes + " " + anio + " " + hora;

    let compra = new Compra(experiencia, comprador, email, fechaHora);
    sistema.agregarCompra(compra);

    formulario.reset();
    resetearExperienciaSeleccionada();

    alert("Compra realizada con éxito");
    mostrarExpMasCompradas();
    detalleComprasCategoria();
  }
}

/* Utils */

function actualizarBtns() {
  let btnEliminarCategoria = document.getElementById("idBotonBajaCategoria");
  let btnAgregarExperiencia = document.getElementById("idBotonAltaExperiencia");
  let btnEliminarExperiencia = document.getElementById("idBotonBajaExperiencia");

  //Actualizar botones de categorias
  if (sistema.categorias.length > 0) {
    btnEliminarCategoria.disabled = false;
    btnAgregarExperiencia.disabled = false;
  } else {
    btnEliminarCategoria.disabled = true;
    btnAgregarExperiencia.disabled = true;
  }

  //Actualizar botones de experiencias
  if (sistema.experiencias.length > 0) {
    btnEliminarExperiencia.disabled = false;
  } else {
    btnEliminarExperiencia.disabled = true;
  }
}

// Informes
function mostrarExperienciaMasCara() {
  let textoExperienciaMasCara = document.getElementById("idExperienciaMasCara");
  if (sistema.experiencias.length > 0) {
    textoExperienciaMasCara.textContent = sistema.montoExperienciaMasCara();
  }
}

function mostrarExpMasCompradas() {
  if (sistema.compras.length > 0) {
    let listaExpMasCompradas = sistema.experienciasMasCompradas();
    let lista = document.getElementById("idExperienciasMasCompradas");
    lista.innerHTML = "";
    for (let e of listaExpMasCompradas) {
      let elementoDeLista = document.createElement("li");
      elementoDeLista.textContent = e.titulo;
      lista.appendChild(elementoDeLista);
    }
  }
}

function detalleComprasCategoria() {
  if (sistema.compras.length > 0) {
    let comboCategorias = document.getElementById("idComboCategoriasIzquierda");
    let categoriaSeleccionada = comboCategorias.value;
    let listaCompras = document.getElementById("idListaCompras");
    listaCompras.innerHTML = "";
    let tieneCompras = false;
    let comprasDelSistema = sistema.compras;
    for (let i = 0; !tieneCompras && i < sistema.compras.length; i++) {
      if (comprasDelSistema[i].experiencia.categoria.nombre == categoriaSeleccionada) {
        tieneCompras = true;
      }
    }
    if (tieneCompras) {
      for (let c of sistema.compras) {
        if (c.experiencia.categoria.nombre == categoriaSeleccionada) {
          let elementoDeLista = document.createElement("li");
          elementoDeLista.textContent =
            "Nombre: " + c.comprador + " Mail: " + c.email + " Fecha y hora de la compra: " + c.fechaHora;
          listaCompras.appendChild(elementoDeLista);
        }
      }
    } else {
      let elementoDeLista = document.createElement("li");
      elementoDeLista.textContent = "Sin datos";
      listaCompras.appendChild(elementoDeLista);
    }
  }
}
