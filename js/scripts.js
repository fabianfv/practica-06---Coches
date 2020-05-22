const CANCELAR = null

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
  coches: [ultimo_coche, penultimo_coche, antepenultimo_coche]
}

let coche_seleccionado = 0

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

function escribir_datos_DOM() {
  let nombre_usuario = document.getElementById("nombre_usuario")
  let marca = document.getElementById("marca")
  let modelo = document.getElementById("modelo")
  let antiguedad = document.getElementById("antiguedad")
  let color = document.getElementById("color")
  let puertas = document.getElementById("puertas")

  nombre_usuario.textContent = usuario.nombre
  marca.textContent = usuario.coches[coche_seleccionado].marca
  modelo.textContent = usuario.coches[coche_seleccionado].modelo
  antiguedad.textContent = usuario.coches[coche_seleccionado].antiguedad
  color.textContent = usuario.coches[coche_seleccionado].color
  puertas.textContent = usuario.coches[coche_seleccionado].puertas
}

function test() {
  if (!obtener_datos()) {
    console.log("El usuario pulsó el botón Cancelar o no proporcionó los datos solicitados.")
  } else {
    console.log("Nombre: ", usuario.nombre)
    console.log("Datos último coche:\n", usuario.coches[0].toString())
    console.log("Datos penúltimo coche:\n", usuario.coches[1].toString())
    console.log("Datos antepenúltimo coche:\n", usuario.coches[2].toString())

    escribir_datos_DOM()

    console.log("Coche seleccionado")
    console.log("Marca: ", usuario.coches[coche_seleccionado].marca)
    console.log("Modelo: ", usuario.coches[coche_seleccionado].modelo)
    console.log("Antiguedad:", usuario.coches[coche_seleccionado].antiguedad)
    console.log("Color: ", usuario.coches[coche_seleccionado].color)
    console.log("Puertas: ", usuario.coches[coche_seleccionado].puertas)
  }
}

test()

/*

Fiat   ,  Duna   , 15  ,   azul  , 4  
Ford  ,   Falcon    , 20   , blanco    , 4
Renault   , Laguna  , 25  ,  rojo  , 4     

*/
