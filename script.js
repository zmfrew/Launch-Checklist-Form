// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
let cargoMass
let cargoStatus
let copilotName
let copilotStatus
let faultyItems
let form
let fuelLevel
let fuelStatus
let launchStatus
let pilotName
let pilotStatus

function init() {
   cargoMass = document.querySelector('input[name=cargoMass]')
   cargoStatus = document.getElementById('cargoStatus')
   copilotName = document.querySelector('input[name=copilotName]')
   copilotStatus = document.getElementById('copilotStatus')
   faultyItems = document.getElementById('faultyItems')
   form = document.getElementById('launchForm')
   fuelLevel = document.querySelector('input[name=fuelLevel]')
   fuelStatus = document.getElementById('fuelStatus')
   launchStatus = document.getElementById('launchStatus')
   pilotName = document.getElementById('pilotName')
   pilotStatus = document.getElementById('pilotStatus')

   form.addEventListener('submit', validate)
}

function checkFaultyItems(event, cargo, fuel) {
   if (fuel < 10000) {
      shuttleNotReady(event, fuelStatus, "Not enough fuel for the journey!")
   }

   if (cargo > 10000) {
      shuttleNotReady(event, cargoStatus, "There's too much mass for the shuttle to take off!")
   }

   if (cargo <= 10000 && fuel >= 10000) {
      console.log('we ready')
      shuttleIsReady(event)
   }
}

function shuttleIsReady(event) {
   event.preventDefault()
   cargoStatus.innerHTML = "Cargo mass low enough for launch"
   copilotStatus.innerHTML = "Co-pilot Ready"
   fuelStatus.innerHTML = "Fuel level high enough for launch"
   pilotStatus.innerHTML = "Pilot Ready"
   launchStatus.innerHTML = "Shuttle is ready for launch"
   launchStatus.style.color = 'green'
}

function shuttleNotReady(event, element, message) {
   event.preventDefault()
   faultyItems.style.visibility = 'visible'
   element.innerHTML = message
   launchStatus.innerHTML = "Shuttle not ready for launch"
   launchStatus.style.color = 'red'
}

function validate(event) {
   if (cargoMass.value === "" || isNaN(cargoMass.value) ||
      copilotName.value === "" || fuelLevel.value === "" ||
      isNaN(fuelLevel.value) || pilotName.value === "") {
      alert("All fields are required!")
      event.preventDefault()
   } else {
      console.log('here')
      checkFaultyItems(event, Number(cargoMass.value), Number(fuelLevel.value))
   }
}

window.onload = init