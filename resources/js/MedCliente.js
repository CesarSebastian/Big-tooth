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
 * @extends {MedDetalle}
 * @param {HTMLElement} padre elemento que contiene la forma.
 * @param {string} viewId id del elemento que contiene la forma.
 * @param {string} urlMaestra url de la form maestra.
 * @param {CtrlAbc} controlador controlador.
 * @param {Object} parametrosGet id del elemento que contiene la forma. */
function MedCliente(padre, viewId, urlMaestra, controlador, parametrosGet) {
  MedDetalle.call(this, padre, viewId, urlMaestra, controlador, parametrosGet);
  Object.defineProperty(this, "adapter_usu_id",
      {value: new AdapterSelect(padre, '#' + MedCliente.USU_ID)});
}
Object.defineProperties(MedCliente, {
  CLI_NACIMIENTO: {value: "cli_nacimiento"},
  CLI_HORA_FAV: {value: "cli_hora_fav"},
  CLI_PROX_CITA: {value: "cli_prox_cita"},
  USU_ID: {value: "usu_id"},
  TIME_ZONE: {get: function () {
      return "GMT" + getZonaHorariaSimple();
    }}
});
MedCliente.prototype = Object.create(MedDetalle.prototype);
MedCliente.prototype.constructor = MedCliente;
MedCliente.prototype.iniciaNuevo = function () {
  this.get("-1");
};
/** Despliega el modelo en la forma de detalle. Las fechas llegan como string.
 * @override
 * @param {boolean} nuevo true si el modelo no está registrado en el servidor.
 * @param {Object} viewModel contiene los datos a mostrar. */
MedCliente.prototype.muestraViewModel = function (nuevo, viewModel) {
  muestraValue(this.forma,
      MedCliente.CLI_NACIMIENTO, viewModel[MedCliente.CLI_NACIMIENTO]);
  muestraValue(this.forma,
      MedCliente.CLI_HORA_FAV, viewModel[MedCliente.CLI_HORA_FAV]);
  muestraValue(this.forma,
      MedCliente.CLI_PROX_CITA, viewModel[MedCliente.CLI_PROX_CITA]);
  this.adapter_usu_id.lista = viewModel[MedCliente.USU_ID];
  this.adapter_usu_id.select.disabled = !nuevo;
};
/** Pasa al modelo los datos capturados en la forma de detalle.
 * @override
 * @param {boolean} nuevo true si el modelo no está registrado en el servidor.
 * @param {String} id del viewModel. */
MedCliente.prototype.creaViewModel = function (nuevo, id) {
  var viewModel = MedDetalle.prototype.creaViewModel.call(this, nuevo, id);
  viewModel.append("timeZone", MedCliente.TIME_ZONE);
  return viewModel;
};