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
let copilotName
let form
let fuelLevel
let pilotName

function init() {
   cargoMass = document.querySelector('input[name=cargoMass]')
   copilotName = document.querySelector('input[name=copilotName]')
   form = document.getElementById('launchForm')
   fuelLevel = document.querySelector('input[name=fuelLevel]')
   pilotName = document.getElementById('pilotName')

   form.addEventListener('submit', validate)
}

function validate(event) {
   if (cargoMass.value === "" || isNaN(cargoMass.value) ||
      copilotName.value === "" || fuelLevel.value === "" ||
      isNaN(fuelLevel.value) || pilotName.value === "") {
      alert("All fields are required!")
      event.preventDefault()
   }
}

window.onload = init