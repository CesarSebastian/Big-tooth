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
 * @extends Adapter
 * @param {HTMLElement} padre elemento donde localiza el listado.
 * @param {type} urlDetalle url que se invoca al activar el hipervínculo. */
function AdapterLista(padre, urlDetalle) {
  Adapter.call(this, padre, "#lista", null);
  this.funcionMuestraElemento = this.muestraElemento.bind(this);
  this.urlDetalle = urlDetalle;
}
AdapterLista.prototype = Object.create(Adapter.prototype);
AdapterLista.prototype.constructor = AdapterLista;
AdapterLista.prototype.muestraElemento = function (elemento, modelo) {
  var a = elemento.querySelector("a");
  if (a) {
    a.href = this.urlDetalle + creaParametrosSearch({id: modelo.id});
  }
  var imagen = modelo.imagen;
  if (imagen) {
    var elementImagen = elemento.querySelector(".imagen");
    if (elementImagen) {
      elementImagen.src = imagen;
    }
  }
  var campo1 = modelo.campo1;
  if (campo1) {
    var elementCampo1 = elemento.querySelector(".campo1");
    if (elementCampo1) {
      elementCampo1.textContent = campo1;
    }
  }
  var campo2 = modelo.campo2;
  if (campo2) {
    var elementCampo2 = elemento.querySelector(".campo2");
    if (elementCampo2) {
      elementCampo2.textContent = campo2;
    }
  }
};