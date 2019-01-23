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
function MedChat(padre, local) {
  this.padre = padre;
  this.local = local;
  this.forma = busca(document, "#forma");
  this.fab = busca(document, "#fab");
  this.salida = busca(document, "#salida");
  this.indicador = busca(document, "#indicador");
  this.indicador.activo = true;
  this.fab.disabled = true;
  MedChat.instancia = this;
}
MedChat.instanciaWebSocketAbierto = function () {
  if (MedChat.instancia) {
    MedChat.instancia.webSocketAbierto();
  }
};
MedChat.instanciaMensajeRecibido = function (evento) {
  if (MedChat.instancia) {
    MedChat.instancia.mensajeRecibido(evento);
  }
};
MedChat.instanciaProcesaError = function (evento) {
  if (MedChat.instancia) {
    MedChat.instancia.procesaError(evento);
  }
};
MedChat.instanciaWebSocketCerrado = function () {
  if (MedChat.instancia) {
    MedChat.instancia.webSocketCerrado();
  }
};
MedChat.prototype = {
  inicia: function () {
    if (!MedChat.websocket) {
      if (navigator.serviceWorker) {
        navigator.serviceWorker.register('sw.js');
      }
      if (this.local) {
        MedChat.websocket = new WebSocket("ws://localhost:8080/ctrlChatWeb");
      } else {
        MedChat.websocket = new WebSocket(
            "wss://app-ramptors.rhcloud.com:8443/ctrlChatWeb");
      }
      MedChat.websocket.onopen = MedChat.instanciaWebSocketAbierto;
      MedChat.websocket.onmessage = MedChat.instanciaMensajeRecibido;
      MedChat.websocket.onerror = MedChat.instanciaProcesaError;
      MedChat.websocket.onerror = MedChat.instanciaProcesaError;
      MedChat.websocket.onclose = MedChat.instanciaWebSocketCerrado;
    }
    this.pruebaWebSocketYSesion();
  },
  webSocketAbierto: function () {
    MedChat.websocketAbierto = true;
    this.pruebaWebSocketYSesion();
  },
  sesionRecibida: function () {
    this.pruebaWebSocketYSesion();
  },
  pruebaWebSocketYSesion: function () {
    if (MedChat.websocketAbierto && window.sesion) {
      this.indicador.activo = false;
      muestraValue(this.forma, "usu_clave", sesion.usu_clave);
      this.fab.disabled = false;
      this.forma.addEventListener("submit", this.enviar.bind(this), false);
    }
  },
  enviar: function () {
    var mensaje = getValue(this.forma, "mensaje");
    this.indicador.activo = true;
    MedChat.websocket.send(sesion.usu_clave + ": " + mensaje.trim());
  },
  mensajeRecibido: function (evento) {
    this.indicador.activo = false;
    muestraValue(this.forma, "mensaje", "");
    var texto = evento.data;
    this.salida.textContent = texto.trim() + "\n" + this.salida.textContent;
    if (window.Notification) {
      // Solicita que se autoricen las notificaciones.
      window.Notification.requestPermission(function (permission) {
        // Si el usuario acepta, se crea la notificación.
        if (permission === "granted") {
          var partes = texto.split(":");
          var titulo = partes[0];
          var opciones = {body: partes[1], icon: MedChat.iconoChat};
          try {
            new Notification(titulo, opciones);
          } catch (e) {
            navigator.serviceWorker.ready.then(function (registro) {
              registro.showNotification(titulo, opciones);
            });
          }
        }
      });
    }
  },
  procesaError: function (evento) {
    recibeError(this.indicador, evento.type);
  },
  webSocketCerrado: function () {
    MedChat.websocketAbierto = false;
    MedChat.websocket = null;
    this.forma.removeEventListener("submit", enviar);
  }
};