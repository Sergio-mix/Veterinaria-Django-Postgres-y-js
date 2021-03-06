sessionStorage.clear();

async function register() {
    let email = document.getElementById('txtEmail').value;
    let password = document.getElementById('txtPassword').value;


    if (email !== "" && password !== "" && emailRegex.test(email) && password.length >= 8) {
        document.getElementById('load_modal').classList.add('show');
        let valEmail = await queryPT('POST', validate_Email, {"email": email}, false);
        if (!valEmail.status) {
            sessionStorage.setItem('email', email)
            sessionStorage.setItem('password', password);
            doOpen('wizard-build-profile.html');
        } else {
            document.getElementById('load_modal').classList.remove('show');
            alert(valEmail.message);
        }
    } else {
        alert('The values entered are not valid');
    }
}
