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
/** Permite desplegar y controlar los datos que se muestran en un listado.
 * Toma un elemento y hace una copia de los elementos con la clase "elemento" y
 * "vacio". Las copias se clonan posteriormente para generar el contenido.
 * @constructor
 * @param {HTMLElement} padre elemento donde localiza el listado.
 * @param {string} selector selector del elemento dom que muestra el listado.
 * @param {function(Element,Object,number)} funcionMuestraElemento
 * despliega el contenido de un elemento de listado. La función toma como
 * parámetros el elemento dom, el modelo y la posición en el lsitado.
 * @param {string=} selectorElemento selector que representa un elemento del
 * listado. Por omisión es ".elemento".
 * @param {string=} selectorVacio selector representa un renglón vacío. Por omisión
 *  es ".vacio". */
function Adapter(padre, selector, funcionMuestraElemento, selectorElemento,
    selectorVacio) {
  this.lista = busca(padre, selector);
  this.funcionMuestraElemento = funcionMuestraElemento;
  this.selectorElemento = selectorElemento ? selectorElemento : ".elemento";
  this.selectorVacio = selectorVacio ? selectorVacio : ".vacio";
  this.elemento = busca(this.lista, this.selectorElemento);
  this.vacio = busca(this.lista, this.selectorVacio);
}
Adapter.prototype = {
  /** Asigna y muestra los modelos.
   * @param {Array<Object>} listado_ modelos que se muestran. */
  set listado(listado_) {
    this.limpia();
    if (!listado_ || !listado_.length || listado_.length === 0) {
      this.lista.appendChild(this.vacio);
    } else {
      for (var i = 0, longitud = listado_.length; i < longitud; i++) {
        var elemento = this.elemento.cloneNode(true);
        this.funcionMuestraElemento.call(null, elemento, listado_[i], i);
        this.lista.appendChild(elemento);
      }
    }
  },
  limpia: function () {
    borraTodosLosElementos(this.lista);
  }
};