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
function MedSesion(padre, controlador) {
  this.padre = padre;
  this.controlador = controlador;
  this.indicador = busca(padre, "#indicadorSesion");
  this.avatar = busca(padre, "#avatarDeSesion");
  this.terminar = busca(padre, "#terminarSesion");
}
MedSesion.prototype = {
  inicia: function () {
    this.indicador.activo = true;
    this.terminar.
        addEventListener("change", this.clicEnTerminar.bind(this), false);
    this.controlador.
        list(null, this.recibeSesion.bind(this), this.recibeError.bind(this));
  },
  clicEnTerminar: function () {
    if (this.terminar.value === "terminar") {
      this.controlador.remove("", this.sesionTerminada.bind(this),
          this.recibeError.bind(this));
    }
  },
  recibeSesion: function (sesion) {
    this.indicador.activo = false;
    window.sesion = sesion;
    var usu_clave = sesion.usu_clave;
    muestraTexto(this.padre, "#claveDeSesion", usu_clave);
    muestraTexto(this.padre, "#nombreDeSesion", sesion.usu_nombre);
    this.avatar.src = texto(sesion.usu_avatar);
    this.terminar.style.display = usu_clave ? "inline-block" : "none";
    this.terminar.value = "usuario";
    if (window.sesionRecibida) {
      window.sesionRecibida(sesion);
    }
  },
  sesionTerminada: function (viewModel) {
    location.href = viewModel.url;
  },
  recibeError: function (e) {
    this.indicador.activo = false;
    alert(texto(e));
  }
};