
const formActionBrands = document.getElementById("js-data-brands");
const formBtnBrands = document.getElementById("js-brand-btn");

formActionBrands.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameInput = document.getElementById('brand-name-input').value;
    const descriptInput = document.getElementById('brand-description-input').value;

    if (nameInput && descriptInput) {
        const formData = new FormData(formActionBrands);
        const searchParams = new URLSearchParams();
    
        for (const pair of formData) {
            console.log(pair);
            searchParams.append(pair[0], pair[1]);
        }
    
        fetch(`http://localhost:8000/api/v1/brands?name=${nameInput}&description=${descriptInput}`, {
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