sessionStorage.clear();

async function register() {
    let email = document.getElementById('txtEmail').value;
    let password = document.getElementById('txtPassword').value;
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (email !== "" && password !== "" && emailRegex.test(email)) {
        let valEmail = await queryPT('POST', validate_Email, email, false);
        if (!valEmail.status) {
            sessionStorage.setItem('email', email)
            sessionStorage.setItem('password', password);
            doOpen('wizard-build-profile.html');
        } else {
            alert('The email is already in use, try another');
        }
    } else {
        alert('The values entered are not valid');
    }
}
