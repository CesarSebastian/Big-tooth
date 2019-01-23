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
 * @param {HTMLElement} padre elemento donde localiza el listado.
 * @param {string} urlDetalle
 * @param {Adapter} adapter
 * @param {CtrlAbc} controlador
 * @param {Object} parametros */
function MedMaestro(padre, urlDetalle, adapter, controlador, parametros) {
  this.urlDetalle = urlDetalle;
  this.controlador = controlador;
  this.parametros = parametros;
  this.adapter = adapter;
  this.fab = padre.querySelector("#fab");
  this.adapter.listado = [];
  this.indicador = padre.querySelector("#indicador");
  if (this.fab) {
    this.fab.addEventListener("click", this.clicEnFab.bind(this), false);
  }
}
MedMaestro.prototype = {
  clicEnFab: function () {
    location.href = this.urlDetalle;
  },
  list: function () {
    this.indicador.activo = true;
    this.controlador.list(this.parametros, this.recibeViewModel.bind(this),
        recibeError.bind(null, this.indicador));
  },
  recibeViewModel: function (viewModel) {
    this.indicador.activo = false;
    this.lista = viewModel.listado;
  },
  set lista(lista_) {
    this.adapter.listado = lista_;
  }
};