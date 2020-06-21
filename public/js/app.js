console.log('Hello');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const locationDisplay = document.querySelector('#location');
const forecastDisplay = document.querySelector('#forecast');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const address =  search.value;

    locationDisplay.innerHTML = 'Loading...';
    forecastDisplay.innerHTML = '';
    
    fetch(`/weather?address=${address}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                locationDisplay.innerHTML = data.error;
            } else {
                locationDisplay.innerHTML = `<h2>${data.location}</h2>`;
                forecastDisplay.innerHTML = data.forecast;
            }
        });
    });
});