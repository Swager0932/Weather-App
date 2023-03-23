window.addEventListener('DOMContentLoaded', () => {

	const locationName = document.getElementById('locationName')
	const weatherIcon = document.getElementById('weatherIcon')
	const temperature = document.getElementById('temperature')
	const tempUnit = document.getElementById('tempUnit')
	const weatherDesc = document.getElementById('weatherDesc')
	const tempSection = document.querySelector('.temperature')

	let lat;
	let long;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			console.log('My General Position:', position);
			long = position.coords.longitude;
			lat = position.coords.latitude;
			getWeather()
		});
	} else {
		console.log("Geolocation is not supported on this browser");
	}
	
	let apiResponse;

	async function getWeather() {
		const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=ac61bc44bc9343aa928194002232303&q=${lat},${long}&aqi=no`);
		const data = await res.json();
		apiResponse = data
		console.log(apiResponse)
		locationName.innerText = `${apiResponse.location.name}, ${apiResponse.location.region}`
		weatherIcon.src = apiResponse.current.condition.icon
		temperature.innerText = `${apiResponse.current.temp_f}°`
		weatherDesc.innerText = apiResponse.current.condition.text
	  }

	  	tempSection.addEventListener('click', () => {
			if(temperature.innerText == `${apiResponse.current.temp_f}°`){
				temperature.innerText = `${apiResponse.current.temp_c}°`
				tempUnit.innerText = 'C'
			}
			else if(temperature.innerText == `${apiResponse.current.temp_c}°`){
				temperature.innerText = `${apiResponse.current.temp_f}°`
				tempUnit.innerText = 'F'
			}
		})
})
