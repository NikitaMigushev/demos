//Form Validation

/* Validation rules:
Username: min 3 characters
Password: min 6 characters
Confirm: should be the same as password
Email: should be email
*/

const userName = document.querySelector("#username");
const userNameError = document.querySelector("#usernameError");

const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");

const confirm = document.querySelector("#confirm");
const confirmError = document.querySelector("#confirmError");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const errorStatus = {
    userName: true,
    password: true,
    confirm: true,
    email: true
}

function displayError(error, message) {
    if (error) {
        message.style.display = "inline";
    } else {
        message.style.display = "none";
    }
}

userName.addEventListener("focusout", function () {
    if (userName.value.length < 3) {
        errorStatus.userName = true;
        displayError(errorStatus.userName, userNameError);
    } else {
        errorStatus.userName = false;
        displayError(errorStatus.userName, userNameError);
    }
})

password.addEventListener("focusout", function () {
    //Minimum six characters, at least one uppercase letter and one lowercase letter:
    let regExp = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,}$/;
    if (regExp.test(password.value)) {
        errorStatus.password = false;
        displayError(errorStatus.password, passwordError);
        
    } else {
        errorStatus.password = true;
        displayError(errorStatus.password, passwordError);
    }
})

confirm.addEventListener("focusout", function () {
    if (password.value === confirm.value) {
          errorStatus.confirm = false;
          displayError(errorStatus.confirm, confirmError);
    } else {
        errorStatus.confirm = true;
        displayError(errorStatus.confirm, confirmError);
    }
})

email.addEventListener("focusout", function () {

    // Check if it is an email
    let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (regExp.test(email.value)) {
        errorStatus.email = false;
        displayError(errorStatus.email, emailError);
    } else {
        errorStatus.email = true;
        displayError(errorStatus.email, emailError);
    }
})

// Login

const userObject = {
    username: "",
    password: "",
    email: "",
    "preferred lodgings": []
}

const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (errorStatus.userName == true ||
        errorStatus.password == true ||
        errorStatus.confirm == true ||
        errorStatus.email == true) {
            return
        } else {
            userObject.username = userName.value;
            userObject.password = password.value;
            userObject.email = email.value;

            // Look for checked checkboxes and push the checked options into userObject
            let checks = document.querySelectorAll(".checks");
            for (i = 0; i < 8; i++) {
                if (checks[i].checked === true) {
                    userObject['preferred lodgings'].push(checks[i].value);
                }
            }
        }

        console.log(userObject);
        loginForm.style.display = "none";

        function updateUI() {
        let htmlResult = `
        <div class="account-outer">
            <div class="account-inner">
                <h3>Username</h3>
                    <ul>
                        <li>
                            ${userObject.username}
                        </li>
                    </ul>
                <h3>Email adress</h3>
                    <ul>
                        <li>
                            ${userObject.email}
                        </li>
                    </ul>
                <h3>Preferred Lodgings</h3>
                    <ul>
        `
        for (i=0; i < userObject['preferred lodgings'].length; i++) {
            htmlResult += `<li>${userObject['preferred lodgings'][i]}</li>`
        }

        htmlResult += `
                    </ul>
            </div>
        </div>
        `
        return htmlResult
        }
        let account = document.querySelector("#accountTemplate")
        account.innerHTML = updateUI();
})

