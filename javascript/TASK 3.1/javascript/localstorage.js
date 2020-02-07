window.onload = function () {

    const userName = document.getElementById("nameField");
    const userEmail = document.getElementById("emailField");
    const userDateOfBirth = document.getElementById("dateField");

    //Wnen out of focus - set localStorage

    userName.addEventListener("focusout", (event) => {
        localStorage.setItem(event.target.id, userName.value);
    });

    userEmail.addEventListener("focusout", (event) => {
        localStorage.setItem(event.target.id, userEmail.value);
    });

    userDateOfBirth.addEventListener("focusout", (event) => {
        localStorage.setItem(event.target.id, userDateOfBirth.value);
    });

    //Get localStorage

    function getLocalStorage() { //Make an array from all input firlds
        const inputs = Array.from(document.querySelectorAll('input'));
     
        inputs.map(input => { // run a function for each input field
            const val = localStorage.getItem(input.id); // get the value from local storage for this key
            return val ? input.value = val : console.log("waiting for inputs"); // if there is value in a key - put into input fild. If not - do nothing
        })
    }

    getLocalStorage();

    console.log(this.localStorage);

       
};