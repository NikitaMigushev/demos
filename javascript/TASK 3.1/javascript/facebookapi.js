

window.fbAsyncInit = function () {
    FB.init({
        appId: '409767573245653',
        cookie: true,
        xfbml: true,
        version: 'v5.0'
    });

   FB.getLoginStatus(function (response) {
       statusChangeCallback(response);
   });

};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}
    (document, 'script', 'facebook-jssdk'));

    function statusChangeCallback(response) {
        if(response.status === "connected") {
            console.log("Connected");
            testAPI();
        } else {
            console.log("Not connected");
        }
    }

    function checkLoginState() {
        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });
    }

    function testAPI() { //Get data from FB account object
        FB.api('/me?fields=id,name,email', function(response) {
            if(response && !response.error) {
                console.log(response);
                console.log(response.name);
                let userName = document.getElementById("nameField");
                userName.value = response.name;
                let userEmail = document.getElementById("emailField");
                userEmail.value = response.email;
            }
        })
    
    }

window.onload = function () {

  

}


