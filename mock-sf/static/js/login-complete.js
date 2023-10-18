(function () {
    const OidcSettings = {
        authority: "https://keycloak-sb-external.quickolabs.com/realms/mock-testing/protocol/openid-connect/auth",
        client_id: "mock-sf-client",
        redirect_uri: "http://localhost:18000/login-complete.html",
        post_logout_redirect_uri: "http://localhost:18000/",
        response_type: "code",
        scope: "openid email roles",
        response_mode: "fragment",
        metadataUrl: "https://keycloak-sb-external.quickolabs.com/realms/mock-testing/.well-known/openid-configuration",
        filterProtocolClaims: true
    };

    var oidcClient = null;

    async function init() {
        oidcClient = new oidc.UserManager(OidcSettings);
        document.getElementById("btnSignOut").addEventListener('click', signOut);
        
        oidcClient.signinRedirectCallback(window.location.href).then((user) => {
            console.log("signinRedirectCallback called")
            if (user != null && user.profile != null) {
                document.getElementById("txtUserName").innerText = `${user.profile.family_name}, ${user.profile.given_name}`
                document.getElementById("txtEmailId").innerText = user.profile.email;
            }
        });
        // window.addEventListener('popstate', loadPoppedState);
        // let user = await oidcClient.signinCallback();
        // console.log("Got User as", user);
    }
    init();

    function signOut() {
        oidcClient.signoutRedirect({}).then(function (req) {
            console.log("signout request", req, "<a href='" + req.url + "'>go signout</a>");
            window.location = req.url;
        });
    }
})();