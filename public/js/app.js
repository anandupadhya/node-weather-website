const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const locationDisplay = document.querySelector('#location');
const forecastDisplay = document.querySelector('#forecast');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const address =  search.value;

    locationDisplay.textContent = 'Loading...';
    forecastDisplay.textContent = '';
    
    fetch(`http://localhost:3000/weather?address=${address}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                locationDisplay.textContent = data.error;
            } else {
                locationDisplay.textContent = data.location;
                forecastDisplay.textContent = data.forecast;
            }
        });
    });
});