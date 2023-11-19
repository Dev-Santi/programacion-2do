// Marianela Vázquez (325335) y Santiago Larrosa (251816)

function crearCategorias(cantidad) {
  for (let i = 0; i < cantidad; i++) {
    let id = Math.floor(Math.random() * 999999);
    let nombre = "Categoria de prueba ID:" + id;
    let descripcion = "Descripción de la categoria ID:" + id;

    let categoria = new Categoria(nombre, descripcion);
    sistema.agregarCategoria(categoria);
  }
  actualizarCombosCategorias();
}

function crearExperiencias(cantidad) {
  for (let i = 0; i < cantidad; i++) {
    let id = Math.floor(Math.random() * 999999);
    let posiblesCantidadesDePersonas = ["uno", "dos", "varias"];

    let titulo = "Titulo experiencia ID:" + id;
    let descripcion = "Descripcion de la experiencia";
    let precio = Math.floor(Math.random() * 5000);
    let cantidadPersonas = posiblesCantidadesDePersonas[Math.floor(Math.random() * 3)];
    let categoria = sistema.categorias[Math.floor(Math.random() * sistema.categorias.length)];

    let experiencia = new Experiencia(titulo, descripcion, precio, cantidadPersonas, categoria);
    sistema.agregarExperiencia(experiencia);
  }

  actualizarCombosExperiencia();
  actualizarSeccionExperiencias();
  mostrarExperienciaMasCara();
}

/* 
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
  }
}
*/
