(async () => {
  const oktaAuth = new OktaAuth({
    issuer: 'https://whatfix-demo.oktapreview.com/oauth2/default',
    clientId: '0oaapc1k6q97txAfA1d7',
    redirectUri: 'http://localhost:18080',
    pkce: false,
  });

  const byId = (id) => document.getElementById(id);
  const loginBtn = document.getElementById('btnLogin');

  loginBtn.addEventListener('click', async () => {
    let tokens = await oktaAuth.token.getWithRedirect({
      responseType: ['token', 'id_token'],
      idp: '0oaapbz2zcu5rMaiV1d7',
    });
  });

  let hash = window.location.hash;
  if (hash) {
    let obj = {};
    let rawTokenString = hash.substring(1);
    let split = rawTokenString.split('&');
    split = split.forEach((ele) => {
      let s = ele.split('=');
      obj[s[0]] = s[1];
    });
    let user = oktaAuth.token.decode(obj['id_token']).payload;

    displayUserDetails(user);
  }

  //   let user = await sdk.refresh();
  //   console.log('user is ', user);

  //   const sessionToken = sdk.getSessionToken();

  //   console.log('sessionToken is ', sessionToken);

  //   if (!user.ok) {
  //     byId('btnLogin').addEventListener('click', doLogin);
  //   } else {
  //     alert('User is logged in');
  //   }

  function doLogin() {
    // alert("not logged in");
    var container = document.getElementById('container');
    debugger;
    container.innerHTML = '';

    const wcElement = document.getElementsByTagName('')[0];
    const onSuccess = (e) => {
      displayUserDetails(e.detail.user);
      //   sdk.refresh();

      // window.location.replace("./loggedIn?userId=" + encodeURIComponent(e.detail.user.loginIds))
    };
    const onError = (err) => console.error('error is ', err);

    wcElement.addEventListener('success', onSuccess);
    wcElement.addEventListener('error', onError);
  }

  function displayUserDetails(user) {
    if (user) {
      byId('notLoggedIn').style.display = 'none';
      byId('loggedIn').style.display = 'block';
      //   console.log(JSON.stringify(user));
      byId('txtUserEmailAddress').innerText = user.email;
    } else {
      byId('notLoggedIn').style.display = 'block';
      byId('loggedIn').style.display = 'none';
      byId('txtUserEmailAddress').innerText = 'not-logged-in  ';
    }
  }
})();
