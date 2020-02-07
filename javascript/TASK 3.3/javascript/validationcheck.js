$("document").ready(function () {

    //Declare variables for checking whether we have a false status on a certain field

    var error_username = false;
    var error_email = false;
    var error_dateofbirth = false;
    var error_password = false;
    var error_repassword = false;

    //Run checking funcitions when focusout

    $("#nameField").focusout(function () {

        check_username();

    })

    $("#emailField").focusout(function () {

        check_email();

    })

    //Datefield is checkd by "required" html tag

    //This is checking password field

    $("#passwordField").focusout(function () {

        check_password();

    })

    $("#re-passwordField").focusout(function () {

        check_repassword();

    })

    //Check whether the field containts special characters

    function check_username() {
        var str = $('#nameField').val();
        if (/^[a-zA-Z0-9- ]*$/.test(str) == false && /^[а-яА-Я0-9- ]*$/.test(str) == false) {
            error_username = true;
            
        } else error_username = false;

        if (error_username == true) {
            $("#nameField-error").css('display', 'block');
        } else {
            $("#nameField-error").hide();
        }
        console.log(error_username);
    }

    //Check whether the field contins less then 6 characters

    function check_password() {
        var password_length = $("#passwordField").val().length
        if (password_length < 6) {
            error_password = true;
        } else error_password = false;

        if (error_password == true) {
            $("#passwordField-error").css('display', 'block');
        } else {
            $("#passwordField-error").hide();
        }
    }

    //Check whether the re-enter password field is the same as the password field

    function check_repassword() {
        var password_value = $("#passwordField").val()
        var repassword_value = $("#re-passwordField").val()

        if (password_value != repassword_value) {
            error_repassword = true;
        } else {
            error_repassword = false
        };
        if (error_repassword == true) {
            $("#re-passwordField-error").css('display', 'block');
        } else {
            $("#re-passwordField-error").hide();
        }
    }

    //Check whether the field is an e-mail

    function check_email() {
        var str = $("#emailField").val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (regex.test(str) == false) {
            error_email = true;
        } else {
            error_email = false;
        }
        if (error_email == true) {
            $("#emailField-error").css('display', 'block');
        } else {
            $("#emailField-error").hide();
        }
    }

    //Check for empty fields when submit the form

    $(".submitButton").hover(function() {
        console.log("Name-error is " + error_username);
    })


    $("#registration-form").submit(function() {
        if (error_username == true) {
            return false;
            }
       
        });

}) // end document.ready