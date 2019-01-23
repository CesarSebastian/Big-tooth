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
 * @param {string} vnt_folio folio de la venta. */
function MedDetalleVenta(padre, viewId, urlMaestra, controlador, vnt_folio) {
  MedDetalle.call(this, padre, viewId, urlMaestra, controlador);
  this.vnt_folio = vnt_folio;
  this.adapter_prd_id = new AdapterSelect(padre, '#' + MedDetalleVenta.PRD_ID);
}
MedDetalleVenta.prototype = Object.create(MedDetalle.prototype);
MedDetalleVenta.prototype.constructor = MedDetalleVenta;
MedDetalleVenta.prototype.iniciaNuevo = function () {
  this.get(this.vnt_folio + "/-1");
};
Object.defineProperties(MedDetalleVenta, {
  VNT_FOLIO: {value: "vnt_folio"},
  PRD_ID: {value: "prd_id"},
  DET_VNT_CANTIDAD: {value: "det_vnt_cantidad"},
  DET_VNT_PRECIO: {value: "det_vnt_precio"}
});
/** Despliega el modelo en la forma de detalle. Las fechas llegan como string.
 * @override
 * @param {boolean} nuevo true si el modelo no está registrado en el servidor.
 * @param {Object} viewModel contiene los datos a mostrar. */
MedDetalleVenta.prototype.muestraViewModel = function (nuevo, viewModel) {
  muestraValue(this.forma, MedDetalleVenta.DET_VNT_CANTIDAD,
      viewModel[MedDetalleVenta.DET_VNT_CANTIDAD]);
  muestraValue(this.forma, MedDetalleVenta.DET_VNT_PRECIO,
      viewModel[MedDetalleVenta.DET_VNT_PRECIO]);
  this.adapter_prd_id.lista = viewModel[MedDetalleVenta.PRD_ID];
  busca(this.padre, '#' + MedDetalleVenta.PRD_ID).disabled = !nuevo;
};
/** Pasa al modelo los datos capturados en la forma de detalle.
 * @override
 * @param {boolean} nuevo true si el modelo no está registrado en el servidor.
 * @param {String} id del viewModel. */
MedDetalleVenta.prototype.creaViewModel = function (nuevo, id) {
  var viewModel = MedDetalle.prototype.creaViewModel.call(this, nuevo, id);
  viewModel.append(MedDetalleVenta.VNT_FOLIO, this.vnt_folio);
  return viewModel;
};