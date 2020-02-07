window.onload = function () {

    //get json object with form data

    var formData = localStorage.getItem('completeForm');

    var formData = JSON.parse(formData);

    /*json keys
         "email"
         "phone"
         "firstName"
         "lastName"
         "country"
         "city"
         "zip"
         "deliveryAddress"
         "deliveryDate"
         "cardName"
         "cardNumber"
         "expDate"
    */

    var confirmEmail = document.getElementById("confirmEmail")
    var confirmPhone = document.getElementById("confirmPhone")
    var confirmName = document.getElementById("confirmName")
    var confirmDeliveryAddress = document.getElementById("confirmDeliveryAddress")
    var confirmDeliveryDate = document.getElementById("confirmDeliveryDate")
    var confirmPaymentMethod = document.getElementById("confirmPaymentMethod")


    function fillUpConfirmForm() {
        confirmEmail.innerHTML = formData.email;
        confirmPhone.innerHTML = formData.phone;
        confirmName.innerHTML = formData.firstName + " " + formData.lastName;
        confirmDeliveryAddress.innerHTML = formData.deliveryAddress;
        confirmDeliveryDate.innerHTML = formData.deliveryDate;
        confirmPaymentMethod.innerHTML = "**** **** **** " + formData.cardNumber.substr(formData.cardNumber.length - 4);
      
    }

    fillUpConfirmForm();


    //When click on return to make changes clear localStorage

    document.getElementById("returnLink").addEventListener("click", function() {
        localStorage.clear();
    })

    //When click Complete Order - clear localStorage

    document.getElementById("completeOrder").addEventListener("click", function () {
    localStorage.clear();
    });

}