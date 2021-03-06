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
   getPlanets()
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
      shuttleIsReady(event)
   }
}

function getPlanets() {
   fetch('https://handlers.education.launchcode.org/static/planets.json').then((response) => {
      response.json().then((json) => {
         const missionTargetDiv = document.getElementById('missionTarget')
         const planet = random(json)
         missionTargetDiv.innerHTML += `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${planet.name}</li>
               <li>Diameter: ${planet.diameter}</li>
               <li>Star: ${planet.star}</li>
               <li>Distance from Earth: ${planet.distance}</li>
               <li>Number of Moons: ${planet.moons}</li>
            </ol>
            <img src="${planet.image}">
         `
      })
   })
}

function random(arr) {
   return arr[Math.floor(Math.random() * arr.length)]
}

function shuttleIsReady(event) {
   cargoStatus.innerHTML = "Cargo mass low enough for launch"
   copilotStatus.innerHTML = `${copilotName.value} Ready`
   fuelStatus.innerHTML = "Fuel level high enough for launch"
   pilotStatus.innerHTML = `${pilotName.value} Ready`
   launchStatus.innerHTML = "Shuttle is ready for launch"
   launchStatus.style.color = 'green'
}

function shuttleNotReady(event, element, message) {
   if (copilotName !== "") {
      copilotStatus.innerHTML = `${copilotName.value} Ready`
   }

   if (pilotName !== "") {
      pilotStatus.innerHTML = `${pilotName.value} Ready`
   }

   faultyItems.style.visibility = 'visible'
   element.innerHTML = message
   launchStatus.innerHTML = "Shuttle not ready for launch"
   launchStatus.style.color = 'red'
}

function validate(event) {
   event.preventDefault()
   if (cargoMass.value === "" || copilotName.value === "" ||
      fuelLevel.value === "" || pilotName.value === "") {
      alert("All fields are required!")
   } else if (isNaN(cargoMass.value) || isNaN(fuelLevel.value)) {
      alert("Enter valid information for each field!")
   } else {
      checkFaultyItems(event, Number(cargoMass.value), Number(fuelLevel.value))
   }
}

window.onload = init