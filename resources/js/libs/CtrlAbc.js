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
/** Realiza las operaciones básicas para acceder a los datos. Bàsicamente sirve
 * como documentación.
 * @interface*/
function CtrlAbc() {
}
CtrlAbc.prototype = {
  /** lista los objetos registrados sin usar id.
   * @param {Object} parametros parámetros de la consulta.
   * @param {function(Object)} funcionExito recibe la lista recuperada.
   * @param {function(Object)} funcionError */
  list: function (parametros, funcionExito, funcionError) {
  },
  /** Recupera un objeto.
   * @param {Object} id id del objeto que se busca.
   * @param {Object} parametros parámetros de la consulta.
   * @param {function(Object)} funcionExito recibe la lista recuperada.
   * @param {function(Object)} funcionError */
  get: function (id, parametros, funcionExito, funcionError) {
  },
  /** Agrega un objeto.
   * @param {Object} modelo
   * @param {function(Object=)} funcionExito
   * @param {function(Object)} funcionError */
  insert: function (modelo, funcionExito, funcionError) {
  },
  /** Modifica un objeto.
   * @param {Object} id id del objeto que se modifica.
   * @param {Object} modelo
   * @param {function(Object=)} funcionExito
   * @param {function(Object)} funcionError */
  update: function (id, modelo, funcionExito, funcionError) {
  },
  /** Elimina un objeto
   * @param {Object} id
   * @param {function(Object=)} funcionExito
   * @param {function(Object)} funcionError */
  remove: function (id, funcionExito, funcionError) {
  }
};