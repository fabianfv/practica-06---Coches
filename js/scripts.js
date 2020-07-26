const CANCELAR = null

let nombre_usuario = null
let marca = null
let modelo = null
let antiguedad = null
let color = null
let puertas = null
let img_coche_seleccionado = null

window.onload = init

function Coche(marca, modelo, antiguedad, color, puertas) {
  this.marca = marca
  this.modelo = modelo
  this.antiguedad = antiguedad
  this.color = color
  this.puertas = puertas
}

Coche.prototype.toString = function toString() {
  let str = `Marca: ${this.marca}\nModelo: ${this.modelo}\nAntigüedad: ${this.antiguedad}\nColor: ${this.color}\nPuertas: ${this.puertas}`
  return str
}

let ultimo_coche = new Coche()
let penultimo_coche = new Coche()
let antepenultimo_coche = new Coche()

const usuario = {
  nombre: null,
  coches: [ultimo_coche, penultimo_coche, antepenultimo_coche],
}

let indice_coche_seleccionado = 0

function validar_coche(entrada) {
  //El usuario debe proporcionar todas las propiedades requeridas de un coche
  return entrada.length === Object.keys(ultimo_coche).length
}

function entrada_datos_coche(mensaje) {
  //usuario pulsó cancelar => entrada = null/CANCELAR
  //usuario ingresó datos inválidos => entrada = false (devuelto por validar_coche)
  //usuario ingresó datos validos => entrada = true (devuelto por validar_coche)
  let entrada = false
  do {
    entrada = prompt(mensaje)
    if (entrada === CANCELAR) return CANCELAR
    entrada = entrada.split(",").map((dato) => dato.trim())
    if (validar_coche(entrada)) return entrada
  } while (true)
}

function obtener_datos_coche(coche, ordinal) {
  const mensaje = `${usuario.nombre} ingresa separando por comas:
    
  * MARCA, MODELO, ANTIGÜEDAD, COLOR y CANTIDAD DE PUERTAS
      
  de tu ${ordinal} coche.
    
  `
  const datos_coche = entrada_datos_coche(mensaje)

  if (!datos_coche) return CANCELAR

  //refactorizar para usar desestructuración
  coche.marca = datos_coche[0]
  coche.modelo = datos_coche[1]
  coche.antiguedad = datos_coche[2]
  coche.color = datos_coche[3]
  coche.puertas = datos_coche[4]

  return true
}

function validar_nombre(entrada) {
  //caracteres válidos letras de la 'a' a la 'z' ya sean
  //mayúsculas o minúsculas más letras acentuadas.
  return /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/.test(entrada)
}

function entrada_nombre(mensaje) {
  let entrada = false
  do {
    entrada = prompt(mensaje)
    if (entrada === CANCELAR) return CANCELAR
    if (validar_nombre(entrada)) return entrada
  } while (true)
}

function obtener_nombre() {
  const entrada = entrada_nombre("Ingresa tu nombre")
  if (!entrada) return CANCELAR
  usuario.nombre = entrada
  return true
}

function obtener_datos() {
  // Se asume que todos los datos son obligatorios, si el usuario
  // no los proporciona el programa termina
  if (!obtener_nombre()) return CANCELAR

  if (!obtener_datos_coche(ultimo_coche, "último")) return CANCELAR
  if (!obtener_datos_coche(penultimo_coche, "penúltimo")) return CANCELAR
  if (!obtener_datos_coche(antepenultimo_coche, "antepenúltimo")) return CANCELAR

  return true
}

function init() {
  nombre_usuario = document.getElementById("nombre_usuario")
  marca = document.getElementById("marca")
  modelo = document.getElementById("modelo")
  antiguedad = document.getElementById("antiguedad")
  color = document.getElementById("color")
  puertas = document.getElementById("puertas")
  img_coche_seleccionado = document.getElementById("img_coche_seleccionado")

  document.getElementById("coche01").addEventListener("click", click)
  document.getElementById("coche02").addEventListener("click", click)
  document.getElementById("coche03").addEventListener("click", click)

  test()
}

function click(event) {
  indice_coche_seleccionado = this.id[6] - 1
  console.log("src original: ", img_coche_seleccionado.src)
  img_coche_seleccionado.src = `img/coche0${indice_coche_seleccionado + 1}.jpg`
  console.log("src cambiada a: ", img_coche_seleccionado.src)
  escribir_datos_DOM()
}

function escribir_datos_DOM() {
  //refactorizar para usar desestructuración:
  nombre_usuario.textContent = usuario.nombre
  marca.textContent = usuario.coches[indice_coche_seleccionado].marca
  modelo.textContent = usuario.coches[indice_coche_seleccionado].modelo
  antiguedad.textContent = usuario.coches[indice_coche_seleccionado].antiguedad
  color.textContent = usuario.coches[indice_coche_seleccionado].color
  puertas.textContent = usuario.coches[indice_coche_seleccionado].puertas
}

function test() {
  if (!obtener_datos()) {
    console.log("El usuario pulsó el botón Cancelar o no proporcionó los datos solicitados.")
  } else {

    console.log("Nombre: ", usuario.nombre)
    console.log("Datos último coche\n", usuario.coches[0].toString())
    console.log("Datos penúltimo coche\n", usuario.coches[1].toString())
    console.log("Datos antepenúltimo coche\n", usuario.coches[2].toString())

    escribir_datos_DOM()

    console.log("Coche seleccionado")
    console.log("Marca: ", usuario.coches[indice_coche_seleccionado].marca)
    console.log("Modelo: ", usuario.coches[indice_coche_seleccionado].modelo)
    console.log("Antiguedad:", usuario.coches[indice_coche_seleccionado].antiguedad)
    console.log("Color: ", usuario.coches[indice_coche_seleccionado].color)
    console.log("Puertas: ", usuario.coches[indice_coche_seleccionado].puertas)
  }
}

/*

Fiat   ,  Duna   , 15  ,   azul  , 4  
Ford  ,   Falcon    , 20   , blanco    , 4
Renault   , Laguna  , 25  ,  rojo  , 4     

*/

/*

TODO

Hecho - Reescribir estilos.css para usar código CSS adecuado

Hecho - Añadir la funcionalidad necesaria para que el usuario pueda
  seleccionar una miniatura y se muestren los datos correspondientes.

- Refactorizar para usar desestructuración de arreglos y objetos, cuando sea posible.

*/