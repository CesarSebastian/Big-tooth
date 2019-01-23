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
/** Componente para desplegar y seleccionar opciones en un select de HTML.
 * @constructor
 * @param {HTMLElement} padre elemento que contiene el select.
 * @param {string} selector selector de un select. */
function AdapterSelect(padre, selector) {
  Object.defineProperty(this, "select", {value: busca(padre, selector)});
}
AdapterSelect.prototype = {
  /** Asigna el arreglo de Objetos que contiene las opciones para seleccionar.
   * @param {Array<Object>} lista_ */
  set lista(lista_) {
    this.limpia();
    var select = this.select;
    if (lista_ && lista_.length) {
      for (var i = 0, longitud = lista_.length; i < longitud; i++) {
        var opcion = lista_[i];
        var option = document.createElement("option");
        option.selected = opcion.seleccionada;
        option.value = opcion.valor;
        option.text = opcion.texto;
        select.add(option);
      }
    }
  },
  get value() {
    return this.select.value;
  },
  limpia: function () {
    borraTodosLosElementos(this.select);
  }
};