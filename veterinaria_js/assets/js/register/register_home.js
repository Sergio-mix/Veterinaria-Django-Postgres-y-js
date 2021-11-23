sessionStorage.clear();

async function register() {
    let email = document.getElementById('txtEmail').value;
    let password = document.getElementById('txtPassword').value;
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (email !== "" && password !== "" && emailRegex.test(email)) {
        let valEmail = await validateEmail(email);
        if (!valEmail.status) {
            sessionStorage.setItem('email', email)
            sessionStorage.setItem('password', password);
            doOpen('wizard-build-profileUserBasic.html');
        } else {
            alert('The email is already in use, try another');
        }
    } else {
        alert('The values entered are not valid');
    }
}

function validateEmail(email) {
    return new Promise(resolve => {
        return resolve(
            fetch(validate_Email, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    email: email
                })
            }).then(res => res.json()).then(res => {
                return res;
            }).catch(err => {
                alert('Process error');
                location.reload();
            })
        );
    });
}
