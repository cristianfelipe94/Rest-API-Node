
const formActionCars = document.getElementById("js-data-cars");
const formBtnCars = document.getElementById("js-cars-btn");

formActionCars.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameInput = document.getElementById('car-name-input').value;
    const descriptInput = document.getElementById('car-description-input').value;
    const colorInput = document.getElementById('car-color-input').value;
    const yearInput = document.getElementById('car-year-input').value;
    const submitedInput = document.getElementById('car-submited-input').value;

    if (nameInput && descriptInput && colorInput && yearInput && submitedInput) {
        const formData = new FormData(formActionCars);
        const searchParams = new URLSearchParams();
    
        for (const pair of formData) {
            console.log(pair);
            searchParams.append(pair[0], pair[1]);
        }
    
        fetch(`http://localhost:8000/api/v1/cars?name=${nameInput}&description=${descriptInput}&color=${colorInput}&year=${yearInput}&date=${submitedInput}`, {
            method: 'POST',
            body: searchParams
        }).then( response => {
            console.log(response.json);
            return response.json();
        }).then( json => {
            console.log(json);
        }).catch( err => {
            console.log(err);
        });
    } else {
        alert('Error, please make sure all the requested fields are filled with information.');
        throw new error('Please make sure all the requested field are filled with information.');
    };
});