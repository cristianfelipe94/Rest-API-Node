const formIdCars = document.getElementById("js-idGetter-cars");
const formBtnIdCars = document.getElementById("js-idCar-btn");

const tableIdBody = document.getElementById('js-idTable-cars');

function removeElement(removeElement) {
    return removeElement.parentNode.removeChild(removeElement);
}

formIdCars.addEventListener('submit', function (event) {
    event.preventDefault();

    const idNumberInput = document.getElementById('car-id-input').value;
    const letterToNumber = parseFloat(idNumberInput);

    if (idNumberInput) {
        fetch(`http://localhost:8000/api/v1/cars`).then(function (response) {
            if (response.status !== 200) {
                console.log("Error something went wrong: ", response.status);
            }
            response.json().then(function (responseData) {
                if (letterToNumber <= 0) {
                    alert(`Error, submited number is incorrect. You submited: ${idNumberInput}, should not be less than 0 or should not be has decimals.`);
                    throw new error(`Error, submited number is incorrect. You submited: ${idNumberInput}, should not be less than 0 or should not has decimals.`);
                } else if (responseData.carId >= idNumberInput) {
                    const formData = new FormData(formIdCars);
                    const searchParams = new URLSearchParams();
                
                    for (const pair of formData) {
                        console.log(pair);
                        searchParams.append(pair[0], pair[1]);
                    }
                
                    fetch(`http://localhost:8000/api/v1/cars/${idNumberInput}`).then( function (response) {
                        if (response.status !== 200) {
                            alert(`Error, please make sure all the requested fields are filled with information. Id number: ${idNumberInput} was not found.`);
                            console.log("Error something went wrong: ", response.status);
                        } response.json().then(function (responseData) {
                            const headsWrapper = document.createElement('div');
                            const listOfData = document.createElement('ul');

                            const listNameData = document.createElement('li');
                            const listColorData = document.createElement('li');
                            const listYearData = document.createElement('li');

                            const listDateData = document.createElement('li');
                            const listDescriptionData = document.createElement('li');
                            const listIdData = document.createElement('li');

                            const headsBody = document.createElement('h2');

                            const dataName = responseData.name;
                            const dataColor = responseData.color;
                            const dataYear = responseData.year;

                            const dataDescription = responseData.description;
                            const dataDate = responseData.date;
                            const dataId = responseData.id;
                            
                            headsBody.innerText = dataId;

                            listNameData.innerText = dataName;
                            listColorData.innerText = dataColor;
                            listYearData.innerText = dataYear;
                            listDescriptionData.innerText = dataDescription;
                            listDateData.innerText = dataDate;
                            listIdData.innerText = dataId;

                            headsWrapper.appendChild(headsBody);

                            listOfData.appendChild(listNameData);
                            listOfData.appendChild(listColorData);
                            listOfData.appendChild(listYearData);

                            listOfData.appendChild(listDescriptionData);
                            listOfData.appendChild(listIdData);
                            headsWrapper.appendChild(listOfData);

                            headsWrapper.setAttribute('id', 'js-idContainer-data');
                            const containerIdExists = document.getElementById('js-idContainer-data');
                            if (containerIdExists) {
                                removeElement(containerIdExists);
                                tableIdBody.appendChild(headsWrapper);
                            } else {
                                tableIdBody.appendChild(headsWrapper);
                            };
                        });
                    }).catch( err => {
                        alert(`Error, please make sure all the requested fields are filled with information. Id number: ${idNumberInput} was not found.`);
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