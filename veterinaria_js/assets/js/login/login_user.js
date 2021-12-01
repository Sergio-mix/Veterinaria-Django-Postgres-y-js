sessionStorage.clear();

async function loginUser() {
    let email = document.getElementById('txtEmail').value;
    let password = document.getElementById('txtPassword').value;
    if (email !== "" && password !== "") {
        document.getElementById('load_modal').classList.add('show');
        const user = {
            "correo": email,
            "clave": password
        }
        let res = await user_login(user, false);

        if (res.status) {
            sessionStorage.setItem("id", res.id);
            sessionStorage.setItem("email", email);
            switch (res.rol) {
                case 1:
                    break;
                case 2:
                    doOpen('profileUserAdmin.html');
                    break;
                case 3:
                    doOpen('profileUserBasic.html');
                    break;
            }
        } else {
            document.getElementById('load_modal').classList.remove('show');
            alert(res.message);
        }
    } else {
        alert('The values entered are not valid');
    }
}

