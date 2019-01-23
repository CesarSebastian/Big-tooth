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
/** Componente para desplegar y seleccionar opciones en un un grupo de
 * checkboxes de HTML.
 * @constructor
 * @param {HTMLElement} padre del element donde se colocan los checkbox.
 * @param {string} selector selector del element donde se colocan los checkbox.
 * @param {string} name valor del atributo name de los checkbox. */
function AdapterCheckboxes(padre, selector, name) {
  this.element = busca(padre, selector);
  this.name = name;
  this.checks = [];
}
AdapterCheckboxes.prototype = {
  /** Asigna el arreglo de Objetos que contiene las opciones para seleccionar.
   * @param {Array<Object>} lista_ */
  set lista(lista_) {
    this.limpia();
    this.checks = [];
    var componentHandler = window.componentHandler;
    if (lista_ && lista_.length) {
      for (var i = 0, longitud = lista_.length; i < longitud; i++) {
        var opcion = lista_[i];
        var id = this.name + "-" + i;
        var label = document.createElement("label");
        var check = document.createElement("input");
        check.type = "checkbox";
        check.name = this.name;
        check.value = opcion.valor;
        label.appendChild(check);
        label.appendChild(document.createTextNode(opcion.texto));
        this.element.appendChild(label);
        this.checks.push(check);
        if (componentHandler) {
          label.htmlFor = id;
          check.id = id;
        }
        check.checked = opcion.seleccionada;
      }
    }
  },
  /** Devuelve los valores seleccionados.
   * @returns {Array<string>} */
  get val() {
    return Array.prototype.map.call(this.element.querySelectorAll(":checked"),
        function (check) {
          return check.value;
        });
  },
  limpia: function () {
    borraTodosLosElementos(this.element);
  }
};