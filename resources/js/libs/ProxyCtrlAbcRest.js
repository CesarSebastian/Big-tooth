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
/** Utiliza un servicio REST para acceder a los datos.
 * @constructor
 * @implements {CtrlAbc}
 * @param {string} url url inicial del recurso rest.
 * @param {function(string,*):* =} reviver reviver de JSON. */
function ProxyCtrlAbcRest(url, reviver) {
  this.url = url;
  this.reviver = reviver;
}
ProxyCtrlAbcRest.prototype = {
  /** lista los objetos registrados.
   * @param {Object} parametros parámetros de la consulta.
   * @param {function(Object)} funcionExito recibe la lista recuperada.
   * @param {function(Object)} funcionError */
  list: function (parametros, funcionExito, funcionError) {
    var xhr = this.creaXhr(funcionExito, funcionError);
    xhr.open("GET", this.url + creaParametrosSearch(parametros), true);
    xhr.send();
  },
  /** Recupera un objeto.
   * @param {Object} id id del objeto que se busca.
   * @param {Object} parametros parámetros de la consulta.
   * @param {function(Object)} funcionExito recibe la lista recuperada.
   * @param {function(Object)} funcionError */
  get: function (id, parametros, funcionExito, funcionError) {
    var xhr = this.creaXhr(funcionExito, funcionError);
    xhr.open("GET", this.url + this.codificaId(id)
        + creaParametrosSearch(parametros), true);
    xhr.send();
  },
  /** Agrega un objeto.
   * @param {Object} modelo
   * @param {function(Object=)} funcionExito
   * @param {function(Object)} funcionError */
  insert: function (modelo, funcionExito, funcionError) {
    var xhr = this.creaXhr(funcionExito, funcionError);
    xhr.open("POST", this.url, true);
    xhr.send(modelo);
  },
  /** Modifica un objeto.
   * @param {Object} id id del objeto que se modifica.
   * @param {Object} modelo
   * @param {function(Object=)} funcionExito
   * @param {function(Object)} funcionError */
  update: function (id, modelo, funcionExito, funcionError) {
    var xhr = this.creaXhr(funcionExito, funcionError);
    xhr.open("POST", this.url + this.codificaId(id), true);
    xhr.send(modelo);
  },
  /** Elimina un objeto
   * @param {Object} id
   * @param {function(Object=)} funcionExito
   * @param {function(Object)} funcionError */
  remove: function (id, funcionExito, funcionError) {
    var xhr = this.creaXhr(funcionExito, funcionError);
    xhr.open("DELETE", this.url + this.codificaId(id), true);
    xhr.send();
  },
  codificaId: function (id) {
    return id ? '/' + encodeURI(id) : "";
  },
  creaXhr: function (funcionExito, funcionError) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("error", this.error.bind(this, funcionError),
        false);
    xhr.addEventListener("abort", this.abortado.bind(this, funcionError),
        false);
    xhr.addEventListener("load", this.recibeObjeto.bind(this,
        funcionExito, funcionError), false);
    return xhr;
  },
  error: function (funcionError, evento) {
    funcionError.call(null, new Error(evento.target.statusText));
  },
  abortado: function (funcionError) {
    funcionError.call(null, new Error("Abortado."));
  },
  recibeObjeto: function (funcionExito, funcionError, evento) {
    var xhr = evento.target;
    var status = xhr.status;
    if (200 <= status && status < 300) {
      var respuesta = xhr.responseText;
      try {
        var objeto = JSON.parse(respuesta, this.reviver);
        funcionExito.call(null, objeto);
      } catch (e) {
        funcionError.call(null, getMensaje(e));
      }
    } else if (status === 500) {
      funcionError.call(null, xhr.responseText);
    } else {
      funcionError.call(null, xhr.statusText);
    }
  }
};