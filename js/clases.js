// Marianela Vázquez (325335) y Santiago Larrosa (251816)

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
  constructor(experiencia, comprador, email, fechaHora) {
    this.experiencia = experiencia;
    this.comprador = comprador;
    this.email = email;
    this.fechaHora = fechaHora;
  }
}

class ExperienciasCompras {
  constructor(experiencia, cantCompras) {
    this.experiencia = experiencia;
    this.cantCompras = cantCompras;
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

  eliminarExperiencia(experiencia) {
    let tieneCompras = false;

    for (let i = 0; i < this.compras.length && !tieneCompras; i++) {
      if (this.compras[i].experiencia.titulo === experiencia.titulo) {
        tieneCompras = true;
      }
    }

    if (tieneCompras) {
      alert("Error, existen compras que contienen dicha experiencia.");
    } else {
      let indexDeExperiencia = this.experiencias.findIndex(function (experienciaActual) {
        return experienciaActual.titulo === experiencia.titulo;
      });

      this.experiencias.splice(indexDeExperiencia, 1);
    }
  }

  // Gestión de compras
  agregarCompra(compra) {
    this.compras.push(compra);
  }

  // Informes
  montoExperienciaMasCara() {
    let max = Number.MIN_SAFE_INTEGER;
    for (let e of this.experiencias) {
      if (e.precio > max) {
        max = e.precio;
      }
    }
    return max;
  }

  /*   experienciasMasCompradas() {
    let expMasCompradas = [];
    let cantidadComprasMax= 0;
    for (let e of this.experiencias){
      let cantidadCompras = 0;
      for (let c of this.compras) { 
        if (e.titulo == c.experiencia.titulo) {
          cantidadCompras++;
        }
      }
      if (cantidadCompras > cantidadComprasMax){
        cantidadComprasMax = cantidadCompras;
      }
    }
    for (let e of this.experiencias){
      let cantidadCompras = 0;
      for (let c of this.compras) { 
        if (e.titulo == c.experiencia.titulo) {
          cantidadCompras++;
        }
      }
     if (cantidadComprasMax == cantidadCompras) {
      expMasCompradas.push(e);
     }
    }
    return expMasCompradas;
  } */

  experienciasMasCompradas() {
    let listaExperiencias = [];
    let expMasCompradas = [];
    for (let e of this.experiencias) {
      let cantidadCompras = 0;
      for (let c of this.compras) {
        if (e.titulo == c.experiencia.titulo) {
          cantidadCompras++;
        }
      }
      listaExperiencias.push(new ExperienciasCompras(e, cantidadCompras));
    }

    let cantidadComprasMax = 0;
    for (let expCant of listaExperiencias) {
      if (expCant.cantCompras > cantidadComprasMax) {
        cantidadComprasMax = expCant.cantCompras;
      }
    }

    for (let expCant of listaExperiencias) {
      if (cantidadComprasMax == expCant.cantCompras) {
        expMasCompradas.push(expCant.experiencia);
      }
    }
    return expMasCompradas;
  }
}

/* 
En la parte de Informes se debe mostrar el monto de la experiencia más cara registrada (independientemente de si tuvo
compras o no), una lista con las experiencias más veces compradas (se muestra su título) y los datos relativos a la categoría
seleccionada arriba a la izquierda. Los datos completos de la categoría se muestran en el título “Información detallada de
la categoría” y se presenta una lista con todas las compras realizadas. De cada una se pone nombre, mail, fecha y hora de
realizada.
*/
