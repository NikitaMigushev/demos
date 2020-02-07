//Parse URL and copy input values to hidden fields

let url = window.location.href;

[...new URLSearchParams(url.split('?')[1])].forEach(([k, v]) => {
    document.querySelector(`#${k}`).value = v;
});

//Login

const user = {
    username: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    allergies: '',
    frequency: '',
    package: ''
};

const regForm = document.querySelector('#registration');

regForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    let username = document.querySelector('#username');
    let email = document.querySelector('#email');
    let phone = document.querySelector('#phone');
    let address = document.querySelector('#address');
    let city = document.querySelector('#city');
    let state = document.querySelector('#state');
    let zip = document.querySelector('#zip');
    let allergies = document.getElementById('allergies');

    user.username = username.value;
    user.email = email.value;
    user.phone = phone.value;
    user.address = address.value;
    user.city = city.value;
    user.state = state.value;
    user.zip = zip.value;
    user.allergies = allergies.value;

    //Look through frequency radio buttons and push the checked one to the user object

    let frequency = document.getElementsByName('frequency');
    for (let i = 0; i < frequency.length; i++) {
        if (frequency[i].checked == true) {
            user.frequency = frequency[i].value;
        }
    }

    //Look through packages radio buttons and push the checked one to the user object

    let package = document.getElementsByName('package');
    for (let i = 0; i < package.length; i++) {
        if (package[i].checked == true) {
            user.package = package[i].value;
        }
    }

    console.log(user);

    regForm.style.display = 'none';

    function updateUI() {
        let htmlResult = `
            <h2>Your form has been submitted</h2>
            <div>
            <h3>You Entered the followowing data:</h3>
                <div>
                    name: ${user.username}</br>
                    email: ${user.email}</br>
                    phone: ${user.phone}</br>
                    address: ${user.address}</br>
                    city: ${user.city}</br>
                    state: ${user.state}</br>
                    zip: ${user.zip}</br>
                    allergies: ${user.allergies}</br>
                    frequency: ${user.frequency}</br>
                    package: ${user.package}</br>
                </div>
            </div>
        `;
        return htmlResult;
    }

    let account = document.querySelector('#accountTemplate');
    account.innerHTML = updateUI();

});