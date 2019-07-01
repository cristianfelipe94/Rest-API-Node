
const tableBody = document.getElementById('js-data-table');

function removeElement(removeElement) {
    return removeElement.parentNode.removeChild(removeElement);
}

function printData(dataSelected) {
    console.log("Data selected: ", dataSelected);
    const dataType = dataSelected;
    console.log("Data parsed: ", dataType);
    if (dataType === 'brands') {
        fetch(`http://localhost:8000/api/v1/${dataType}`).then(function (response) {
            if (response.status !== 200) {
                console.log("Error something went wrong: ", response.status);
            }
            response.json().then(function (responseData) {
                const headsWrapper = document.createElement('div');
                responseData.brandData.forEach(elementData => {
                    const listOfData = document.createElement('ul');
                    const listNameData = document.createElement('li');
                    const listIdData = document.createElement('li');
                    const listDescriptionData = document.createElement('li');

                    const headsBody = document.createElement('h2');

                    const dataName = elementData.name;
                    const dataId = elementData.id;
                    const dataDescription = elementData.description;

                    headsBody.innerText = dataId;

                    listNameData.innerText = dataName;
                    listIdData.innerText = dataId;
                    listDescriptionData.innerText = dataDescription;

                    headsWrapper.appendChild(headsBody);
                    listOfData.appendChild(listNameData);
                    listOfData.appendChild(listDescriptionData);
                    headsWrapper.appendChild(listOfData);
                    headsWrapper.setAttribute('id', 'js-container-data');
                });
                const containerExists = document.getElementById('js-container-data');
                if (containerExists) {
                    removeElement(containerExists);
                    tableBody.appendChild(headsWrapper);
                } else {
                    tableBody.appendChild(headsWrapper);
                }
            });
        }).catch(function (err) {
            console.log("Error from Catch: ", err);
        })
    } else if (dataType === 'cars') {
        fetch(`http://localhost:8000/api/v1/${dataType}`).then(function (response) {
            if (response.status !== 200) {
                console.log("Error something went wrong: ", response.status);
            }
            response.json().then(function (responseData) {
                const headsWrapper = document.createElement('div');
                responseData.carsData.forEach(elementData => {

                    const listOfData = document.createElement('ul');
                    const listNameData = document.createElement('li');
                    const listIdData = document.createElement('li');
                    const listDescriptionData = document.createElement('li');

                    const listNameColor = document.createElement('li');
                    const listDate = document.createElement('li');
                    const listYear = document.createElement('li');

                    const headsBody = document.createElement('h2');

                    const dataName = elementData.name;
                    const dataId = elementData.id;
                    const dataDescription = elementData.description;

                    const dataColor = elementData.color;
                    const dataDate = elementData.date;
                    const dataYear = elementData.year;

                    headsBody.innerText = dataId;

                    listNameData.innerText = dataName;
                    listIdData.innerText = dataId;
                    listDescriptionData.innerText = dataDescription;

                    listNameColor.innerText = dataColor;
                    listDate.innerText = dataDate;
                    listYear.innerText = dataYear;

                    headsWrapper.appendChild(headsBody);
                    listOfData.appendChild(listNameData);
                    listOfData.appendChild(listDescriptionData);

                    listOfData.appendChild(listNameColor);
                    listOfData.appendChild(listDate);
                    listOfData.appendChild(listYear);

                    headsWrapper.appendChild(listOfData);

                    headsWrapper.setAttribute('id', 'js-container-data');
                });
                const containerExists = document.getElementById('js-container-data');
                if (containerExists) {
                    removeElement(containerExists);
                    tableBody.appendChild(headsWrapper);
                } else {
                    tableBody.appendChild(headsWrapper);
                }
            });
        }).catch(function (err) {
            console.log("Error from Catch: ", err);
        })
    }
}