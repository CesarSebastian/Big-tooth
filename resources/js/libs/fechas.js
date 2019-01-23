/* Copyright 2016 Gilberto Pacheco Gallegos Licensed under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License. */
/* Funciones para el manejo de fechas. */
"use strict";
/** @param {number} cantidad
 * @return {string} */
function aDosCaracteres(cantidad) {
  return cantidad < 10 ? "0" + cantidad : cantidad.toString();
}
/** @param {Date} d
 * @return {string} */
function dateAFechaUTC(d) {
  return d ? (d.getUTCFullYear() + "-" + aDosCaracteres(d.getUTCMonth() + 1)
      + "-" + aDosCaracteres(d.getUTCDate())) : "";
}
/** @param {Date} d
 * @return {string} */
function dateAHoraUTC(d) {
  return d ? (aDosCaracteres(d.getUTCHours()) + ":" + aDosCaracteres(
      d.getUTCMinutes())) : "";
}
/** @param {Date} d
 * @return {string} */
function dateAFechaHoraLocal(d) {
  return d ? (d.getFullYear() + "-" + aDosCaracteres(d.getMonth() + 1) + "-"
      + aDosCaracteres(d.getDate()) + "T" + aDosCaracteres(d.getHours())
      + ":" + aDosCaracteres(d.getMinutes())) : "";
}
/** @param {Date} d
 * @return {string} */
function dateAFechaLocal(d) {
  return d ? (d.getFullYear() + "-" + aDosCaracteres(d.getMonth() + 1) + "-"
      + aDosCaracteres(d.getDate())) : "";
}
/** @param {string} t
 * @return {Date} */
function fechaADate(t) {
  return t ? new Date(t) : null;
}
/** @param {string} t
 * @return {Date} */
function horaUTCADate(t) {
  return t ? new Date("1970-01-01T" + t + "Z") : null;
}
/** @param {string} t
 * @return {Date} */
function fechaUTCADate(t) {
  return t ? new Date(t + "T00:00Z") : null;
}
function getZonaHorariaSimple() {
  var offset = new Date().getTimezoneOffset();
  return (offset < 0 ? "+" : "-") +
      aDosCaracteres(Math.abs(offset / 60)) + ":" +
      aDosCaracteres(Math.abs(offset % 60));
}
/** @param {string} t
 * @return {Date} */
function fechaHoraLocalADate(t) {
  var zhs = getZonaHorariaSimple();
  return t ? new Date(t + zhs) : null;
}
/** @return {Date} */
function fechaActualUtc() {
  return fechaUTCADate(dateAFechaLocal(new Date()));
}