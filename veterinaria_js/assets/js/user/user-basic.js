id = sessionStorage.getItem('id')
data();

async function data() {
    let user = await queryPT('POST', user_get, {"id": id}, true);
    if (user.status) {
        document.getElementById('name').innerText = user.nombres;
        document.getElementById('email').innerText = user.correo;

        document.getElementById('nameP').innerText = user.nombres;
        document.getElementById('lastnameP').innerText = user.apellidos;
        document.getElementById('emailP').innerText = user.correo;
        document.getElementById('telephoneP').innerText = user.telefono;
        document.getElementById('landlineP').innerText = user.telefono_fijo;
        document.getElementById('idP').innerText = user.identificacion + ' ' + user.tipoNombre;
        document.getElementById('addressP').innerText = user.direccion;
    } else {
        alert(user.message);
        doOpen('sign-in.html');
    }
}

function openUser() {
    userData();
    document.getElementById('modal_container_user').classList.add('show');
}

function closeUse() {
    document.getElementById('modal_container_user').classList.remove('show');
    cleatTxtUser();
}

function cleatTxtUser() {
    document.getElementById('txtName').value = "";
    document.getElementById('txtLastName').value = "";
    document.getElementById('txtTelephone').value = "";
    document.getElementById('txtLandline').value = ""
    document.getElementById('txtAddress').value = "";
    document.getElementById('txtPasswordNew').value = "";
    document.getElementById('txtPassword').value = "";
}

async function userData() {
    let user = await queryPT('POST', user_get, {"id": id}, false);
    if (user.status) {
        document.getElementById('txtName').value = user.nombres;
        document.getElementById('txtLastName').value = user.apellidos;
        document.getElementById('txtTelephone').value = user.telefono;
        document.getElementById('txtLandline').value = user.telefono_fijo;
        document.getElementById('txtAddress').value = user.direccion;

    } else {
        alert(user.message);
        location.reload();
    }
}

async function updateUser() {

    let names = document.getElementById('txtName').value;
    let lasName = document.getElementById('txtLastName').value;
    let telephone = document.getElementById('txtTelephone').value;
    let landLine = document.getElementById('txtLandline').value;
    let address = document.getElementById('txtAddress').value;

    let passwordNew = document.getElementById('txtPasswordNew').value;
    let password = document.getElementById('txtPassword').value;

    if (names !== "" && lasName !== "" && telephone !== "" && address !== "" && password !== "") {
        let userData = await queryPT('POST', user_get, {"id": id}, false);
        if (userData.status) {
            let userLogin = await user_login({
                "correo": userData.correo,
                "clave": password
            }, false);
            if (userLogin.status) {

                let user = {
                    "id": id,
                    "correo": userData.correo,
                    "clave": password,
                    "rol": userLogin.rol,
                    "identificacion": userData.identificacion,
                    "tipo": userData.tipo,
                    "nombres": names,
                    "apellidos": lasName,
                    "telefono": telephone,
                    "telefono_fijo": landLine,
                    "direccion": address,
                    "estado": 'C'
                }

                if (passwordNew !== "") {
                    user.clave = passwordNew;
                }

                if (landLine === "") {
                    user.telefono_fijo = null;
                }


                let userUpdate = await queryPT('PUT', update_user + id, user, false);

                if (userUpdate.status) {
                    data();
                    alert(userUpdate.message);
                    closeUse();
                } else {
                    alert(userUpdate.message);
                }

            } else {
                alert(userLogin.message);
            }
        } else {
            alert(userData.message);
            location.reload();
        }
    } else {
        alert('The values entered are not valid');
    }
}