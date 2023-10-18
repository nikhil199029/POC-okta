(async () => {
   
    let user = await sdk.refresh();
    console.log("user is ", user);

    const sessionToken = sdk.getSessionToken();

    console.log("sessionToken is ", sessionToken);
    const byId = (id) => document.getElementById(id);


    if (!user.ok) {
        byId("btnLogin").addEventListener("click", doLogin);
    }else{
        alert("User is logged in");
    }



    function doLogin() {
        // alert("not logged in");
        var container = document.getElementById('container');
        debugger;
        container.innerHTML = '';

        const wcElement = document.getElementsByTagName('')[0];
        const onSuccess = (e) => {
            displayUserDetails(e.detail.user);
            sdk.refresh();

            // window.location.replace("./loggedIn?userId=" + encodeURIComponent(e.detail.user.loginIds))
        };
        const onError = (err) => console.error('error is ', err);

        wcElement.addEventListener('success', onSuccess);
        wcElement.addEventListener('error', onError);
    }

    function displayUserDetails(user) {

        if (user) {
            byId("notLoggedIn").style.display = "none";
            byId("loggedIn").style.display = "block";
            console.log(JSON.stringify(user));
            byId("txtUserEmailAddress").innerText = user.email;

        } else {

            byId("notLoggedIn").style.display = "block";
            byId("loggedIn").style.display = "none";
            byId("txtUserEmailAddress").innerText = "not-logged-in  ";
        }
    }

})()