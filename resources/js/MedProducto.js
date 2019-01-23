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
function MedProducto(padre, viewId, urlMaestra, controlador) {
  MedDetalle.call(this, padre, viewId, urlMaestra, controlador);
  Object.defineProperty(this, "adapter_prov_ids",
      {value: new AdapterCheckboxes(padre,
            '#' + MedProducto.PROV_IDS, MedProducto.PROV_IDS)});
}
Object.defineProperties(MedProducto, {
  PRD_NOMBRE: {value: "prd_nombre"},
  PRD_EXISTENCIAS: {value: "prd_existencias"},
  PROV_IDS: {value: "prov_ids"},
  USU_NOMBRE: {value: "usu_nombre"},
  IMAGEN: {value: "imagen"}
});
MedProducto.prototype = Object.create(MedDetalle.prototype);
MedProducto.prototype.constructor = MedProducto;
MedProducto.prototype.iniciaNuevo = function () {
  this.get("-1");
};
/** Despliega el modelo en la forma de detalle. Las fechas llegan como string.
 * @override
 * @param {boolean} nuevo true si el modelo no está registrado en el servidor.
 * @param {Object} viewModel contiene los datos a mostrar. */
MedProducto.prototype.muestraViewModel = function (nuevo, viewModel) {
  muestraValue(this.forma,
      MedProducto.PRD_NOMBRE, viewModel[MedProducto.PRD_NOMBRE]);
  muestraValue(this.forma,
      MedProducto.PRD_EXISTENCIAS, viewModel[MedProducto.PRD_EXISTENCIAS]);
  this.adapter_prov_ids.lista = viewModel[MedProducto.PROV_IDS];
};