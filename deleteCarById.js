const formIdDeleteCars = document.getElementById("js-idDeleter-cars");
const formBtnIdDeleteCars = document.getElementById("js-deleteCar-btn");

const tableIdDeleteBody = document.getElementById('js-deleteTable-cars');

formIdDeleteCars.addEventListener('submit', function (event) {
    event.preventDefault();

    const idNumberInput = document.getElementById('car-id-delete').value;
    const letterToNumber = parseFloat(idNumberInput);

    console.log("Got number?: ",letterToNumber);

    if (idNumberInput) {
        fetch(`http://localhost:8000/api/v1/cars`).then(function (response) {
            if (response.status !== 200) {
                console.log("Error something went wrong: ", response.status);
            }
            response.json().then(function (responseData) {
                console.log("Data parsed to JSON: ",responseData);
                if (letterToNumber <= 0) {
                    alert(`Error, submited number is incorrect. You submited: ${idNumberInput}, should not be less than 0 or should not be has decimals.`);
                    throw new error(`Error, submited number is incorrect. You submited: ${idNumberInput}, should not be less than 0 or should not has decimals.`);
                } else if (responseData.carId >= idNumberInput) {
                    const formData = new FormData(formIdDeleteCars);
                    const searchParams = new URLSearchParams();
                
                    const options = {
                        method: 'DELETE'
                    }
                    for (const pair of formData) {
                        console.log(pair);
                        searchParams.append(pair[0], pair[1]);
                    }
                
                    fetch(`http://localhost:8000/api/v1/cars/${idNumberInput}`, options).then( response => {
                        console.log(response.json);
                        return response.json();
                    }).then( json => {
                        return json;
                    }).catch( err => {
                        console.log(err);
                    });
                } else if (responseData.carId < idNumberInput) {
                    alert(`Error, submited number is incorrect. You submited: ${idNumberInput}, should be less or in the range of 0 to ${responseData.carId}.`);
                    throw new error(`Error, submited number is incorrect. You submited: ${idNumberInput}, should be less or in the range of 0 to ${responseData.carId}.`);
                };
            });
        });
    } else {
        alert('Error, please make sure all the requested fields are filled with information.');
        throw new error('Please make sure all the requested field are filled with information.');
    };
});