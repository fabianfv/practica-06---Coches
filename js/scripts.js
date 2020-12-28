const CANCEL = null
let dataWasEntered = false

window.onload = init

function Car(make, model, age, color, doors) {
  this.make = make
  this.model = model
  this.age = age
  this.color = color
  this.doors = doors
}

Car.prototype.toString = function toString() {
  let str = `Make: ${this.make}\nModel: ${this.model}\nAge: ${this.age}\nColor: ${this.color}\nDoors: ${this.doors}`
  return str
}

let last_car = new Car()
let penultimate_car = new Car()
let antepenultimate_car = new Car()

const user = {
  name: null,
  cars: [last_car, penultimate_car, antepenultimate_car],
}

let selectedCarIndex = 0

function validateCarData(input) {
  //User must provide all required properties of a car
  return input.length === Object.keys(last_car).length
}

function sanitizeData(input) {
  return input.split(",").map((data) => data.trim())
}

function getCarInputData(message) {
  //if user clicked cancel => input = CANCELAR (null)
  //if user entered invalid data => input = false (returned by validateCarData)
  //if user entered valid data => input = true (returned by validateCarData)
  let input = false
  do {
    input = prompt(message)
    if (input === CANCEL) return CANCEL
    input = sanitizeData(input)
    if (validateCarData(input)) return input
  } while (true)
}

function getCarData(car, ordinal) {
  const message = `${user.name} enter (separated by commas):
    
  * MAKE, MODEL, AGE, COLOR and DOORS
      
  of your ${ordinal} car.
    
  `
  const car_data = getCarInputData(message)

  if (!car_data) return CANCEL

  //refactor to use destructuring if possible
  car.make = car_data[0]
  car.model = car_data[1]
  car.age = car_data[2]
  car.color = car_data[3]
  car.doors = car_data[4]

  return true
}

function validateUserName(input) {
  /*
  Valid characters are:
    - letters from 'a' to 'z'
    - either uppercase or lowercase and
    - accented letters
  */
  return /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/.test(input)
}

function getUserInputData(message) {
  let input = false
  do {
    input = prompt(message)
    if (input === CANCEL) return CANCEL
    if (validateUserName(input)) return input
  } while (true)
}

function getUserName() {
  const input = getUserInputData("Enter your name")
  if (!input) return CANCEL
  user.name = input
  return true
}

function getDataFromUser() {
  /*
    All data is assumed to be mandatory.
    If the user doesn't provide the data the program ends.
  */
  if (!getUserName()) return CANCEL

  if (!getCarData(last_car, "last")) return CANCEL
  if (!getCarData(penultimate_car, "penultimate")) return CANCEL
  if (!getCarData(antepenultimate_car, "antepenultimate")) return CANCEL

  return true
}

function init() {
  username = document.getElementById("username")
  make = document.getElementById("make")
  model = document.getElementById("model")
  age = document.getElementById("age")
  color = document.getElementById("color")
  doors = document.getElementById("doors")
  selectedCarImage = document.getElementById("selectedCarImage")

  document.getElementById("car01").addEventListener("click", click)
  document.getElementById("car02").addEventListener("click", click)
  document.getElementById("car03").addEventListener("click", click)

  test()
}

function click() {
  //I get the last character from img.car0X
  //this === event.currentTarget
  const lastChar = this.id[this.id.length - 1]
  selectedCarImage.src = `img/car0${lastChar}.jpg`

  selectedCarIndex = Number(lastChar) - 1

  if(dataWasEntered) writeDataToDOM()
}

function writeDataToDOM() {
  //refactor to use destructuring if possible:
  username.textContent = user.name
  make.textContent = user.cars[selectedCarIndex].make
  model.textContent = user.cars[selectedCarIndex].model
  age.textContent = user.cars[selectedCarIndex].age
  color.textContent = user.cars[selectedCarIndex].color
  doors.textContent = user.cars[selectedCarIndex].doors
}

function test() {
  dataWasEntered = getDataFromUser()
  if (!dataWasEntered) {
    console.log("The user clicked the Cancel button or she didn't provide the requested data.")
  } else {
    console.log("User name: ", user.name)
    console.log("Last car data\n", user.cars[0].toString())
    console.log("Penultimate car data\n", user.cars[1].toString())
    console.log("Antepenultimate car data\n", user.cars[2].toString())

    writeDataToDOM()

    console.log("Selected Car")
    console.log("Make: ", user.cars[selectedCarIndex].make)
    console.log("Model: ", user.cars[selectedCarIndex].model)
    console.log("Age:", user.cars[selectedCarIndex].age)
    console.log("Color: ", user.cars[selectedCarIndex].color)
    console.log("Doors: ", user.cars[selectedCarIndex].doors)
  }
}

/*
Test input data:

Lamborghini   ,  Aventador   , 15  ,   blue  , 4  

Porsche  ,   Cayman GT4    , 20   , white    , 4

Maseratti   , MC20  , 25  ,  red  , 4     
*/