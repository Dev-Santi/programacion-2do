// Oblig 2do semestre 2023 - Clases

class Categoria {
  constructor(nombre, descripcion) {
    this.nombre = nombre;
    this.descripcion = descripcion;
  }
}

class Experiencia {
  constructor(titulo, descripcion, precio, cantidadPersonas, categoria) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.cantidadPersonas = cantidadPersonas;
    this.categoria = categoria;
  }
}

class Compra {
  constructor(experiencia, comprador, email) {
    this.experiencia = experiencia;
    this.comprador = comprador;
    this.email = email;
  }
}

class Sistema {
  constructor() {
    this.categorias = [];
    this.experiencias = [];
    this.compras = [];
  }

  // Gestión de categorías
  agregarCategoria(categoria) {
    let estaRepetida = false;

    for (let i = 0; i < this.categorias.length && !estaRepetida; i++) {
      if (this.categorias[i].nombre === categoria.nombre) {
        estaRepetida = true;
      }
    }

    if (estaRepetida) {
      alert("Error, categoría existente");
    } else {
      this.categorias.push(categoria);
    }
  }

  eliminarCategoria(categoria) {
    let tieneExperiencias = false;

    for (let i = 0; i < this.experiencias.length && !tieneExperiencias; i++) {
      if (this.experiencias[i].categoria.nombre === categoria.nombre) {
        tieneExperiencias = true;
      }
    }

    if (tieneExperiencias) {
      alert("Error, existen experiencias que poseen dicha categoría.");
    } else {
      let indexDeCategoria = this.categorias.findIndex(function (categoriaActual) {
        return categoriaActual.nombre === categoria.nombre;
      });

      this.categorias.splice(indexDeCategoria, 1);
    }
  }

  // Gestión de experiencias
  agregarExperiencia(experiencia) {
    let estaRepetida = false;

    for (let i = 0; i < this.experiencias.length && !estaRepetida; i++) {
      if (this.experiencias[i].titulo === experiencia.titulo) {
        estaRepetida = true;
      }
    }

    if (estaRepetida) {
      alert("Error, la experiencia ya existe.");
    } else {
      this.experiencias.push(experiencia);
    }
  }
}

/* 
En la parte de Informes se debe mostrar el monto de la experiencia más cara registrada (independientemente de si tuvo
compras o no), una lista con las experiencias más veces compradas (se muestra su título) y los datos relativos a la categoría
seleccionada arriba a la izquierda. Los datos completos de la categoría se muestran en el título “Información detallada de
la categoría” y se presenta una lista con todas las compras realizadas. De cada una se pone nombre, mail, fecha y hora de
realizada.

Se puede eliminar una categoría solamente si no hay experiencias de ella.
Se puede eliminar una experiencia solamente si no hay compras de ella


*/
