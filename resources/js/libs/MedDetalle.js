"use strict";
/** @constructor
 * @param {HTMLElement} padre elemento donde localiza la forma.
 * @param {string} viewId id del objeto que muestra la forma.
 * @param {string} urlMaestra url de la form maestra.
 * @param {CtrlAbc} controlador controlador.
 * @param {Object} parametrosGet parámetros para el servicio al usar get.
 * @param {function(string,*):*=} reviver reviver de JSON. */
function MedDetalle(padre, viewId, urlMaestra, controlador, parametrosGet) {
  this.padre = padre;
  this.urlMaestra = urlMaestra;
  this.controlador = controlador;
  this.parametrosGet = parametrosGet;
  Object.defineProperty(this, "viewId", {
    value: viewId,
    writable: false,
    enumerable: true
  });
  this.indicador = busca(padre, "#indicador");
  this.forma = padre.querySelector("form");
  this.cancelar = padre.querySelector("#cancelar");
  this.fab = padre.querySelector("#fab");
  this.eliminar = padre.querySelector("#eliminar");
  this.mensajeEliminar = "Confirma la eliminación.\n¡Se perderán los datos!";
  if (this.fab) {
    this.fab.disabled = true;
  }
}
MedDetalle.prototype = {
  muestraViewModel: function (nuevo, viewModel) {},
  creaViewModel: function (nuevo, id) {
    return new FormData(this.forma);
  },
  inicia: function () {
    if (this.cancelar) {
      this.cancelar.addEventListener("click", this.regresa.bind(this), false);
    }
    if (this.viewId) {
      this.configuraEdicion();
    } else {
      this.configuraNuevo();
    }
    if (this.viewId) {
      this.indicador.activo = true;
      this.get(this.viewId);
    } else {
      this.indicador.activo = false;
      this.iniciaNuevo();
    }
  },
  get: function (id) {
    this.controlador.get(id, this.parametrosGet,
        this.recibeViewModel.bind(this),
        recibeError.bind(null, this.indicador));
  },
  recibeViewModel: function (viewModel) {
    this.indicador.activo = false;
    var msjError = viewModel.msjError;
    if (msjError) {
      muestraError(msjError);
    } else {
      this.iniciaEdicion(viewModel);
    }
  },
  regresa: function () {
    location.href = this.urlMaestra;
  },
  submit: function () {
    muestraError(this.padre, "");
    var viewModel = this.creaViewModel(!this.viewId, this.viewId);
    this.indicador.activo = true;
    if (this.viewId) {
      this.controlador.update(this.viewId, viewModel, this.regresa.bind(this),
          recibeError.bind(null, this.indicador));
    } else {
      this.controlador.insert(viewModel, this.regresa.bind(this),
          recibeError.bind(null, this.indicador));
    }
  },
  clicEnEliminar: function () {
    if (confirm(this.mensajeEliminar)) {
      this.indicador.activo = true;
      this.controlador.remove(this.viewId, this.regresa.bind(this),
          recibeError.bind(null, this.indicador));
    }
  },
  configuraNuevo: function () {
    if (this.eliminar) {
      this.eliminar.style.display = "none";
    }
  },
  configuraEdicion: function () {
    if (this.eliminar) {
      this.eliminar.disabled = true;
    }
  },
  iniciaNuevo: function () {
    this.configuraGuardar();
  },
  iniciaEdicion: function (viewModel) {
    this.configuraGuardar();
    if (this.viewId && this.eliminar) {
      this.eliminar.
          addEventListener("click", this.clicEnEliminar.bind(this), false);
      this.eliminar.disabled = false;
    }
    var titulo = viewModel.titulo;
    if (titulo) {
      document.title = titulo;
      var t = this.padre.querySelector("h1");
      if (t) {
        t.textContent = titulo;
      }
    }
    this.muestraViewModel(!this.viewId, viewModel);
  },
  configuraGuardar: function () {
    if (this.forma) {
      this.forma.addEventListener("submit", this.submit.bind(this), false);
    } else if (this.fab) {
      this.fab.addEventListener("click", this.submit.bind(this), false);
    }
    if (this.fab) {
      this.fab.disabled = false;
    }
  }
};