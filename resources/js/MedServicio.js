"use strict";
/** @constructor
 * @extends {MedDetalle}
 * @param {HTMLElement} padre elemento que contiene la forma.
 * @param {string} viewId id del elemento que contiene la forma.
 * @param {string} urlMaestra url de la form maestra.
 * @param {CtrlAbc} controlador controlador. */
function MedServicio(padre, viewId, urlMaestra, controlador) {
  MedDetalle.call(this, padre, viewId, urlMaestra, controlador);
}
Object.defineProperty(MedServicio, "PROV_NOMBRE", {value: "prov_nombre"});
Object.defineProperty(MedServicio, "DESCRIPCION_SERVICIO", {value: "descripcion_servicio"});
MedServicio.prototype = Object.create(MedDetalle.prototype);
MedServicio.prototype.constructor = MedServicio;
/** Despliega el modelo en la forma de detalle. Las fechas llegan como string.
 * @override
 * @param {boolean} nuevo true si el modelo no está registrado en el servidor.
 * @param {Object} viewModel contiene los datos a mostrar. */
MedServicio.prototype.muestraViewModel = function (nuevo, viewModel) {
  muestraValue(this.forma,
      MedServicio.PROV_NOMBRE, viewModel[MedServicio.PROV_NOMBRE], viewModel[MedServicio.DESCRIPCION_SERVICIO]);
};