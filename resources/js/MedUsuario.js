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
function MedUsuario(padre, viewId, urlMaestra, controlador) {
  MedDetalle.call(this, padre, viewId, urlMaestra, controlador);
}
Object.defineProperties(MedUsuario, {
  USU_CLAVE: {value: "usu_clave"},
  USU_CONTRA: {value: "usu_contra"},
  USU_CONTRA2: {value: "usu_contra2"},
  USU_NOMBRE: {value: "usu_nombre"},
  IMAGEN: {value: "imagen"}
});
MedUsuario.prototype = Object.create(MedDetalle.prototype);
MedUsuario.prototype.constructor = MedUsuario;
/** Despliega el modelo en la forma de detalle. Las fechas llegan como string.
 * @override
 * @param {boolean} nuevo true si el modelo no está registrado en el servidor.
 * @param {Object} viewModel contiene los datos a mostrar. */
MedUsuario.prototype.muestraViewModel = function (nuevo, viewModel) {
  muestraValue(this.forma,
      MedUsuario.USU_CLAVE, viewModel[MedUsuario.USU_CLAVE]);
  muestraValue(this.forma,
      MedUsuario.USU_CONTRA, viewModel[MedUsuario.USU_CONTRA]);
  muestraValue(this.forma,
      MedUsuario.USU_CONTRA2, viewModel[MedUsuario.USU_CONTRA2]);
  muestraValue(this.forma,
      MedUsuario.USU_NOMBRE, viewModel[MedUsuario.USU_NOMBRE]);
  var imagen = busca(this.padre, '#' + MedUsuario.IMAGEN);
  imagen.style.display = nuevo ? "none" : "inline";
  imagen.src = viewModel[MedUsuario.IMAGEN];
};