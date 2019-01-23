/* Copyright 2016 Gilberto Pacheco Gallegos Licensed under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License. */
"use strict";
/** @constructor
 * @param {HTMLElement} padre elemento donde localiza la forma.
 * @param {string} viewId id del objeto que muestra la forma.
 * @param {string} urlMaestra
 * @param {string} urlDetalle
 * @param {Adapter} adapter
 * @param {CtrlAbc} controlador controlador.
 * @param {function} funcionCreaParametros funcionCreaParametros.
 *  */
function MedVentas(padre, viewId, urlMaestra, urlDetalle, adapter, controlador,
    funcionCreaParametros) {
  this.padre = padre;
  Object.defineProperty(this, "viewId", {
    value: viewId,
    writable: false,
    enumerable: true
  });
  this.urlMaestra = urlMaestra;
  this.urlDetalle = urlDetalle;
  this.adapter = adapter;
  this.controlador = controlador;
  this.funcionCreaParametros = funcionCreaParametros;
  this.indicador = busca(padre, "#indicador");
  adapter.listado = [];
}
Object.defineProperties(MedVentas, {
  TOTAL: {value: "total"},
  DETALLES: {value: "detalles"}
});
MedVentas.prototype = {
  inicia: function () {
    this.indicador.activo = true;
    if (this.viewId) {
      this.controlador.get(this.viewId, null, this.recibeViewModel.bind(this),
          recibeError.bind(null, this.indicador));
    } else {
      // Registra una nueva venta y pide su id.
      this.controlador.insert(null, this.recibeId.bind(this),
          recibeError.bind(null, this.indicador));
    }
  },
  recibeId: function (viewModel) {
    this.indicador.activo = false;
    location.href = this.urlMaestra
        + this.funcionCreaParametros.call(null, {id: viewModel.id});
  },
  recibeViewModel: function (viewModel) {
    this.indicador.activo = false;
    busca(this.padre, "#fab").
        addEventListener("click", this.clicEnFab.bind(this), false);
    busca(this.padre, "#cancelar").
        addEventListener("click", this.clicEnCancelar.bind(this), false);
    busca(this.padre, "#guardar").
        addEventListener("click", this.clicEnGuardar.bind(this), false);
    this.adapter.listado = viewModel[MedVentas.DETALLES];
    muestraTexto(this.padre, '#' + MedVentas.TOTAL,
        viewModel[MedVentas.TOTAL]);
  },
  clicEnFab: function () {
    location.href = this.urlDetalle
        + this.funcionCreaParametros.call(this, {vnt_folio: this.viewId});
  },
  clicEnGuardar: function () {
    this.indicador.activo = true;
    this.controlador.update(this.viewId, null, this.descartaContenido.bind(this),
        recibeError.bind(null, this.indicador));
  },
  clicEnCancelar: function () {
    this.indicador.activo = true;
    this.controlador.remove(-1, this.descartaContenido.bind(this),
        recibeError.bind(null, indicador));
  },
  descartaContenido: function () {
    this.indicador.activo = false;
    if (this.viewId) {
      location.href = this.urlMaestra;
    } else {
      location.reload();
    }
  }
};