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
function getMensaje(e) {
  return e.message;
}
function getParametrosSearch() {
  var search = location.search;
  var objetoSearch = {};
  if (search.length > 0) {
    var params = search.substr(1).split("&");
    for (var i = 0, longitud = params.length; i < longitud; i++) {
      var par = params[i].split("=");
      if (par.length === 1) {
        objetoSearch[par[0]] = decodeURIComponent(par[0]);
      } else if (par.length >= 2) {
        objetoSearch[par[0]] = decodeURIComponent(par[1]);
      }
    }
  }
  return objetoSearch;
}
function creaParametrosSearch(parametros) {
  if (!parametros) {
    return "";
  } else {
    var search = "";
    for (var p in parametros) {
      search += "&" + encodeURIComponent(p) + "=" + encodeURIComponent(
          parametros[p]);
    }
    return search.length > 0 ? "?" + search.substr(1) : "";
  }
}
function busca(padre, id) {
  var element = padre.querySelector(id);
  if (element) {
    return element;
  } else {
    throw new Error("No se encuentra " + id);
  }
}
function buscaName(forma, name) {
  var element = forma[name];
  if (element) {
    return element;
  } else {
    throw new Error("El name " + id + " no está en la forma HTML.");
  }
}
function texto(s) {
  return s ? s : "";
}
function getValue(forma, name) {
  return buscaName(forma, name).value;
}
/** Cambia el valor de un campo.
 * @param {HTMLFormElement} forma forma que contiene el elemento que muestra.
 * @param {string} name name del elemento que se modifica.
 * @param {string} valor valor que se asigna. */
function muestraValue(forma, name, valor) {
  buscaName(forma, name).value = texto(valor);
}
function muestraTexto(padre, selector, t) {
  var element = busca(padre, selector);
  element.textContent = texto(t);
}
function recibeError(indicador, e) {
  indicador.activo = false;
  muestraError(document, e);
}
/** Muestra un mensaje de error.
 * @param {HTMLElement} padre elemento que contiene el elemento donde se muestra.
 * @param {string} error mensaje que se muestra. */
function muestraError(padre, error) {
  busca(padre, "#error").textContent = texto(error);
}
function borraTodosLosElementos(padre) {
  while (padre.firstChild) {
    padre.removeChild(padre.firstChild);
  }
}