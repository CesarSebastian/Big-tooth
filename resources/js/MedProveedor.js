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
 * @param {CtrlAbc} controlador controlador. */
function MedProveedor(padre, viewId, urlMaestra, controlador) {
  MedDetalle.call(this, padre, viewId, urlMaestra, controlador);
}
Object.defineProperty(MedProveedor, "PROV_NOMBRE", {value: "prov_nombre"});
MedProveedor.prototype = Object.create(MedDetalle.prototype);
MedProveedor.prototype.constructor = MedProveedor;
/** Despliega el modelo en la forma de detalle. Las fechas llegan como string.
 * @override
 * @param {boolean} nuevo true si el modelo no está registrado en el servidor.
 * @param {Object} viewModel contiene los datos a mostrar. */
MedProveedor.prototype.muestraViewModel = function (nuevo, viewModel) {
  muestraValue(this.forma,
      MedProveedor.PROV_NOMBRE, viewModel[MedProveedor.PROV_NOMBRE]);
};