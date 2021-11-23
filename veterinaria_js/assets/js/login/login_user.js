sessionStorage.clear();

async function loginUser() {
    let email = document.getElementById('txtEmail').value;
    let password = document.getElementById('txtPassword').value;
    if (email !== "" && password !== "") {
        const user = {
            "correo": email,
            "clave": password
        }
        let res = await user_login(user);

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

function user_login(user) {
    return new Promise(resolve => {
        return resolve(
            fetch(login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(user)
            }).then(res => res.json()).then(res => {
                return res;
            }).catch(err => {
                alert('Process error');
                location.reload();
            })
        );
    });
}