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
/**
 * 
 * @param {HTMLElement} padre
 * @param {CtrlAbc} controlador
 * @param {Object} parametros */
function MedReporte(padre, controlador, parametros) {
  this.padre = padre;
  this.controlador = controlador;
  this.parametros = parametros;
  this.indicador = busca(padre, "#indicador");
  this.adapter = new Adapter(padre, "#lista", function (elemento, modelo) {
    busca(elemento, '.' + MedReporte.PRD_NOMBRE).textContent =
        texto(modelo[MedReporte.PRD_NOMBRE]);
    busca(elemento, '.' + MedReporte.TOTAL).textContent =
        texto(modelo[MedReporte.TOTAL]);
  });
  this.adapter.listado = [];
}
Object.defineProperties(MedReporte, {
  TOTAL: {value: "total"},
  PRD_NOMBRE: {value: "prd_nombre"}
});
MedReporte.prototype = {
  inicia: function () {
    this.indicador.activo = true;
    this.controlador.list(this.parametros, this.recibeViewModel.bind(this),
        recibeError.bind(null, this.indicador));
  },
  recibeViewModel: function (viewModel) {
    this.indicador.activo = false;
    this.adapter.listado = viewModel.listado;
  }
};