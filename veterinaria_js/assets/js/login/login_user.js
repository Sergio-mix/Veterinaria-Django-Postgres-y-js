sessionStorage.clear();

async function loginUser() {
    let email = document.getElementById('txtEmail').value;
    let password = document.getElementById('txtPassword').value;
    if (email !== "" && password !== "") {
        const user = {
            "correo": email,
            "clave": password
        }
        let res = await user_login(user,false);

        if (res.status) {
            sessionStorage.setItem("id", res.id);
            switch (res.rol) {
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    doOpen('profileUserBasic.html');
                    break;
            }
        } else {
            alert(res.message);
        }
    } else {
        alert('The values entered are not valid');
    }
}

