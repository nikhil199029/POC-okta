(async () => {

    

    try {
        // calling refresh, so in case user is authenticated, it will also genarate a new refresh.
        // we can also call sdk.me() but it won't refresh the sesion token
        const res = await sdk.refresh()
        if (res.ok) {
            // user is logged in - 
            const sessionToken = sdk.getSessionToken();
            alert(sessionToken);
        } else {
            // user is not logged it - we probably want to show <wc
            // alert("not logged in");
            var container = document.getElementById('container');
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
    } catch (e) {
    }
})();