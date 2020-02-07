window.onload = function () {

    //Declare variables for checking whether we have a false status on a certain field

    var error_email = false;
    var error_firstName = false;
    var error_lastName = false;
    var error_country = false;
    var error_city = true;
    var error_cardName = false;
    var error_cardNumber = false;
    var error_expDate = false;
    var error_securityCode = false;
    var error_phone = false
    var error_year = true
    var error_month = true
    var error_date = true

    var firstName = document.getElementById("firstName");
    var firstNameError = document.getElementById("error-first-name");

    var lastName = document.getElementById("lastName");
    var lastNameError = document.getElementById("error-last-name");

    var email = document.getElementById("email");
    var emailError = document.getElementById("error-email");

    var phone = document.getElementById("phone");
    var phoneError = document.getElementById("error-phone");

    var countryError = document.getElementById("countryError");

    var cityError = document.getElementById("cityError");

    var countrySelected;

    var citySelected;

    var zip = document.getElementById("zip");

    var deliveryAddress = document.getElementById("deliveryAddress");

    var selectedMonth
    var selectedYear
    var selectedDate

    var cardName = document.getElementById("cardName");
    var cardNameError = document.getElementById("error-card-name");

    var cardNumber = document.getElementById('cardNumber');
    var cardNumberError = document.getElementById("error-card-number");

    var expDate = document.getElementById('expDate');
    var expDateError = document.getElementById('error-expDate');

    var securityCode = document.getElementById('securityCode');
    var securityCodeError = document.getElementById('error-securityCode');

    //Run checking funcitions

    firstName.addEventListener("focusout", checkFirstName); // checks firstName on special characters
    lastName.addEventListener("focusout", checkLastName); // checks lastName on special characters
    email.addEventListener("focusout", validateEmail); // checks email is email
    phone.addEventListener("focusout", checkPhoneLength); // checks phone length

    cardNumber.addEventListener('input', function (e) { // checks card number digits only and auto spaces

        e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    });

    cardNumber.addEventListener('focusout', checkCardNumberMinLength); //checks minLength of card number

    cardNumber.addEventListener('keypress', checkLength); // checks card number no more then 16 digits

    cardName.addEventListener("focusout", checkCardName); // checks name on card on special characters

    expDate.addEventListener('keypress', formatString); // checks expiration date format

    expDate.addEventListener('focusout', checkExpDateLength); // checks minLength of exp Date

    securityCode.addEventListener('focusout', checkSecCodeLength); // checks for security code length


    // Display Error Message function

    function displayError(error, message) {
        if (error) {
            message.style.display = "inline"

        } else {
            message.style.display = "none"
        }
    }

    //Check First Name wheather it has special characters

    function checkFirstName() {

        let name = firstName.value
        let regexpEng = RegExp(/^[a-zA-Z0-9 ]*$/);
        let regexpRus = RegExp(/^[а-яА-Я0-9 ]*$/);

        if (!regexpEng.test(name) && !regexpRus.test(name)) {
            error_firstName = true;
        } else {
            error_firstName = false;
        }
        displayError(error_firstName, firstNameError)
    };

    //Check Last Name whether it has special characters

    function checkLastName() {

        let name = lastName.value
        let regexpEng = RegExp(/^[a-zA-Z0-9 ]*$/);
        let regexpRus = RegExp(/^[а-яА-Я0-9 ]*$/);

        if (!regexpEng.test(name) && !regexpRus.test(name)) {
            error_lastName = true;
        } else {
            error_lastName = false;
        }
        displayError(error_lastName, lastNameError)
    };

    //Check E-mail is an E-mail

    function validateEmail() {
        let string = email.value
        let regexp = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (!regexp.test(string)) {
            error_email = true;
        } else {
            error_email = false;
        }
        displayError(error_email, emailError)
    }

    //Phone mask

    function setCursorPosition(pos, elem) {
        elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
        else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select()
        }
    }

    function mask(event) {
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");
        if (def.length >= val.length) val = def;
        this.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
        if (event.type == "blur") {
            if (this.value.length == 2) this.value = ""
        } else setCursorPosition(this.value.length, this)
    };

    phone.addEventListener("input", mask, false);
    phone.addEventListener("focus", mask, false);
    phone.addEventListener("blur", mask, false);


    //Check phone number minLength

    function checkPhoneLength() {
        let phoneLength = phone.value.length;
        if (phoneLength < 17) {
            error_phone = true;
        } else {
            error_phone = false;
        }
        displayError(error_phone, phoneError)
    }

    //check no more then 16 characters

    function checkLength() {
        var fieldLength = cardNumber.value.length;
        //Suppose u want 16 number of character
        if (fieldLength <= 18) { // characters start from 0 and have 4 spaces 0+4+15 = 18 characters
            return true;
        } else { // if more then 18
            var str = cardNumber.value;
            str = str.substring(0, str.length - 1); // take string value from 0 to 19 minus 1 so than 18 and put it as value
            cardNumber.value = str;
        }
    }

    function checkCardNumberMinLength() {
        var fieldLength = cardNumber.value.length;
        if (fieldLength < 19) {
            error_cardNumber = true
        } else {
            error_cardNumber = false
        }
        displayError(error_cardNumber, cardNumberError)
    }


    //check name on card no special characters

    function checkCardName() {

        let name = cardName.value
        let regexpEng = RegExp(/^[a-zA-Z0-9 ]*$/);
        let regexpRus = RegExp(/^[а-яА-Я0-9 ]*$/);

        if (!regexpEng.test(name) && !regexpRus.test(name)) {
            error_cardName = true;
        } else {
            error_cardName = false;
        }
        displayError(error_cardName, cardNameError)
    };

    //Mask expiration date on credit card

    function formatString(e) {
        var inputChar = String.fromCharCode(event.keyCode);
        var code = event.keyCode;
        var allowedKeys = [8];
        if (allowedKeys.indexOf(code) !== -1) {
            return;
        }

        event.target.value = event.target.value.replace(
            /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
        ).replace(
            /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
        ).replace(
            /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
        ).replace(
            /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
        ).replace(
            /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
        ).replace(
            /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
        ).replace(
            /\/\//g, '/' // Prevent entering more than 1 `/`
        );
    }

    // Check minLength of ex date

    function checkExpDateLength() {
        let expDateLength = expDate.value.length;
        if (expDateLength < 5) {
            error_expDate = true;
        } else {
            error_expDate = false;
        }
        displayError(error_expDate, expDateError)
    }


    // Check minLength of security Code

    function checkSecCodeLength() {
        let secCodeLenth = securityCode.value.length;
        if (secCodeLenth < 3) {
            error_securityCode = true;
        } else {
            error_securityCode = false;
        }
        displayError(error_securityCode, securityCodeError)
    }

    //Cascading dropdown

    //Create object with country names and cities

    var countryObj = {
        "United States": ["New-York", "Los Angeles", "Boston"],
        "United Kingdom": ["London", "Bradford", "Bristol"],
    };

    //Grab select tags

    var countrySel = this.document.getElementById("countrySel");
    var citySel = this.document.getElementById("citySel");

    //Loop through country object and assign options for country select

    for (var country in countryObj) { // by default there is only 1 option in country select, when we select country.options[1] we select the second optipon which  doesn't exist right now, because there is only one country.options[0] which is the default option. Hope this makes sense ;)
        countrySel.options[countrySel.options.length] = new Option(country, country);
    }

    countrySel.onchange = function () {
        citySel.length = 1 // remove all options first


        if (this.selectedIndex < 1) {
            error_country = true;
            displayError(error_country, countryError)
            return; // if the first option is chose - do nothing
        } else {
            error_country = false;
            displayError(error_country, countryError)

            //otherwise do this

            var cities = countryObj[countrySel.value];

            //loopthough array and add array values as dropdown list

            for (var i = 0; i < cities.length; i++) {
                citySel.options[citySel.options.length] = new Option(cities[i], cities[i]);
            }

        }
        countrySelected = this.options[this.selectedIndex].text
    }

    citySel.onchange = function () {

        if (this.selectedIndex < 1) {
            error_city = true;
            displayError(error_city, cityError)
            return; // if the first option is chose - do nothing
        } else {
            error_city = false;
            displayError(error_city, cityError)
            citySelected = this.options[this.selectedIndex].text
        }
    }

    // Delivery Dates Setup

    var thisYear = new Date().getFullYear()
    var nextYear = thisYear + 1;
    var years = [thisYear, nextYear];
    var yearSel = document.getElementById("yearSel")
    var months = [...Array(12)].map((n, i) => new Date(2000, i).toLocaleString('en-US', {
        month: 'long'
    }))

    //Add options to Year select

    for (prop in years) {
        var value = years[prop];
        yearSel.options[yearSel.options.length] = new Option(value, value);
    }

    //Add months options on Year select

    var monthSel = document.getElementById("monthSel")

    yearSel.onchange = function () {
        monthSel.length = 1
        if (this.selectedIndex < 1) {
            error_year = true;
            return;
        } else {
            selectedYear = yearSel[yearSel.selectedIndex].text
            error_year = false;
            for (prop in months) {
                var value = months[prop];
                monthSel.options[monthSel.options.length] = new Option(value, prop);
            }
        }
    }

    // Get number of days in a month

    const getDaysInMonth = date =>
        new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    var dateSel = document.getElementById("dateSel")

    monthSel.onchange = function () {
        dateSel.length = 1;
        let monthSelected = monthSel[monthSel.selectedIndex].value
        let yearSelected = yearSel[yearSel.selectedIndex].value
        var N = getDaysInMonth(new Date(yearSelected, monthSelected));
        var numberOfDays = Array.apply(null, {
            length: N
        }).map(Number.call, Number)
        if (this.selectedIndex < 1) {
            error_month = true;
            return;
        } else {
            selectedMonth = monthSel[monthSel.selectedIndex].text
            for (prop in numberOfDays) {
                error_month = false;
                var value = numberOfDays[prop] + 1;
                dateSel.options[dateSel.options.length] = new Option(value, value)
            }
        }
    }

    //Add options to days select

    dateSel.onchange = function () {
        if (this.selectedIndex < 1) {
            error_date = true;
        } else {
            selectedDate = dateSel[dateSel.selectedIndex].text
            error_date = false;
        }
    }

    //Check for error status

    function checkforErrors() {
        console.log(`
        email-error: ${error_email}
        phone-error: ${error_phone}
        firstName-error: ${error_firstName}
        lastName-error: ${error_lastName}
        country-error: ${error_country}
        city-error: ${error_city}
        year-error: ${error_year}
        month-error: ${error_month}
        date-error: ${error_date}
        cardNumber-error: ${error_cardNumber}
        expDate-error: ${error_expDate}
        secCode-errro: ${error_securityCode}
        `);
        window.setTimeout(checkforErrors, 10000);
    }

    checkforErrors();

    var orderForm = document.getElementById("orderForm")

    // Create Json object when form submitted

    orderForm.addEventListener('submit', function (evt) {
        evt.preventDefault(); // prevents default action of submit button
        if (error_email == true ||
            error_phone == true ||
            error_firstName == true ||
            error_lastName == true ||
            error_country == true ||
            error_city == true ||
            error_year == true ||
            error_month == true ||
            error_date == true ||
            error_cardNumber == true ||
            error_cardName == true ||
            error_securityCode == true
        ) {
            return false
        } else {
            var completeForm = {
                "email": email.value,
                "phone": phone.value,
                "firstName": firstName.value,
                "lastName": lastName.value,
                "country": countrySelected,
                "city": citySelected,
                "zip": zip.value,
                "deliveryAddress": deliveryAddress.value,
                "deliveryDate": selectedDate + " " + selectedMonth + " " + selectedYear,
                "cardName": cardName.value,
                "cardNumber": cardNumber.value,
                "expDate": expDate.value
            }
            localStorage.setItem('completeForm', JSON.stringify(completeForm));
            window.location.replace("confirm.html");
            return true;
        }
    })

} // end window onload