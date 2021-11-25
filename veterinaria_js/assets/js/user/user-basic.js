id = sessionStorage.getItem('id')
email = sessionStorage.getItem('email')
data();
llenarTabla();

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

    document.getElementById('removeModal').onclick = function () {

    }
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
                    closeUse();
                    await data();
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

function openPetRegister() {
    document.getElementById('titlePetModal').innerText = 'Add pet';
    document.getElementById('onClickPet').innerText = 'Register';
    document.getElementById('modal_container_pet').classList.add('show');
    race();
    colors();
    species();


    document.getElementById('onClickPet').onclick = async function () {
        let pet = petForm();

        if (pet !== null) {
            let userLogin = await user_login({
                "correo": email,
                "clave": document.getElementById('txtPasswordPet').value
            }, false);
            if (userLogin.status) {
                let res = await queryPT('POST', save_pet + id, pet, false);

                if (res.status) {
                    await llenarTabla();
                    closePet();
                } else {
                    alert(res.message);
                }
            } else {
                alert(userLogin.message);
            }
        }
    }
}

function closePet() {
    document.getElementById('modal_container_pet').classList.remove('show');
    cleatTxtPet();
}

function cleatTxtPet() {
    document.getElementById('txtMicrochip').value = "";
    document.getElementById('txtColour').innerText = "";
    document.getElementById('txtSpecies').innerText = "";
    document.getElementById('txtRace').innerText = "";
    document.getElementById('txtNamePet').value = "";
    document.getElementById('txtBirth_date').value = "";
    document.getElementById('txtPasswordPet').value = "";
    document.getElementById('txtSex').value = "M";
}

function petForm() {
    let microchip = document.getElementById('txtMicrochip').value;
    let color = document.getElementById('txtColour').value;
    let species = document.getElementById('txtSpecies').value;
    let race = document.getElementById('txtRace').value;
    let name = document.getElementById('txtNamePet').value;
    let sex = document.getElementById('txtSex').value;
    let birth_date = document.getElementById('txtBirth_date').value;
    let passwordPet = document.getElementById('txtPasswordPet').value;

    if (name !== "" && birth_date !== "" && passwordPet !== "") {
        let pet = {
            "microchip": microchip,
            "color": color,
            "especie": species,
            "nombre": name,
            "fecha_nacimiento": birth_date,
            "raza": race,
            "sexo": sex,
            "usuario": id
        }

        if (microchip === "") {
            pet.microchip = null;
        }

        return pet;
    } else {
        alert('The values entered are not valid');
    }

    return null;
}

async function openPetUpdate(codigo) {
    document.getElementById('titlePetModal').innerText = 'Update pet';
    document.getElementById('onClickPet').innerText = 'Update';
    document.getElementById('modal_container_pet').classList.add('show');
    await race();
    await colors();
    await species();

    let res = await queryPT('POST', get_pet + id, {"id": codigo}, false);

    document.getElementById('txtMicrochip').value = res.microchip;
    document.getElementById('txtColour').value = res.color;
    document.getElementById('txtSpecies').value = res.especie;
    document.getElementById('txtRace').value = res.raza;
    document.getElementById('txtNamePet').value = res.nombre;
    document.getElementById('txtBirth_date').value = res.fecha_nacimiento;
    document.getElementById('txtSex').value = res.sexo;

    document.getElementById('onClickPet').onclick = async function () {
        let pet = petForm();

        if (pet !== null) {

            const petObj = {
                "id": codigo,
                "estado": 'C',
                "microchip": pet.microchip,
                "color": pet.color,
                "especie": pet.especie,
                "nombre": pet.nombre,
                "fecha_nacimiento": pet.fecha_nacimiento,
                "raza": pet.raza,
                "sexo": pet.sexo,
                "usuario": id
            }

            let userLogin = await user_login({
                "correo": email,
                "clave": document.getElementById('txtPasswordPet').value
            }, false);
            if (userLogin.status) {
                let res = await queryPT('PUT', update__pet + id, petObj, false);
                if (res.status) {
                    closePet();
                    await llenarTabla();
                } else {
                    alert(res.message);
                }
            } else {
                alert(userLogin.message);
            }
        }
    }
}

function openPetRemove(codigo, btn) {
    document.getElementById('modal_container_pet_remove').classList.add('show');

    document.getElementById('removePet').addEventListener('click', async function () {
        let password = document.getElementById('txtPasswordPetRemove').value;

        if (password !== "") {
            let userLogin = await user_login({
                "correo": email,
                "clave": password
            }, false);
            if (userLogin.status) {
                let res = await queryGD('DELETE', remove__pet + codigo + '/' + id, false);

                if (res.status) {
                    closePetRemove();
                    let row = btn.parentNode.parentNode;
                    row.parentNode.removeChild(row);
                } else {
                    alert(res.message);
                }
            } else {
                alert(userLogin.message);
            }
        } else {
            alert('The values entered are not valid');
        }
    })
}

function closePetRemove() {
    document.getElementById('modal_container_pet_remove').classList.remove('show');
    document.getElementById('txtPasswordPetRemove').value = "";
}

async function llenarTabla() {
    const request = await fetch(all_pet + id + '/' + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        location.reload();
    })

    const pets = await request.json();

    let listHtml = '';
    for (let pet of pets) {
        let sexo = '';

        if (pet.sexo === 'M') {
            sexo = 'Male'
        } else {
            sexo = 'Famale'
        }

        let microchip = '';

        if (pet.microchip === null) {
            microchip = 'undefined'
        } else {
            microchip = pet.microchip;
        }

        let fila =
            "<tr><td> " + microchip + "</td>" +
            "<td> " + pet.nombre + "</td>" +
            "<td> " + pet.color + "</td>" +
            "<td> " + pet.especie + "</td>" +
            "<td> " + pet.raza + "</td>" +
            "<td> " + pet.tamanio + "</td>" +
            "<td> " + pet.fecha_nacimiento + "</td>" +
            "<td> " + sexo + "</td>" +
            "<td>" +
            "<button style=\"color: #ffd025\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openPetUpdate(" + pet.id + ")'>Update</button>" +
            "<button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openPetRemove(" + pet.id + ",this" + ")'>" +
            "Remove</button>" +
            "</td></tr>";

        listHtml += fila;
    }

    document.querySelector('#table_pet tbody').outerHTML = listHtml;
}

async function colors() {
    const request = await fetch(all_colors_pet + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        location.reload();
    });

    const colors = await request.json();

    for (let color of colors) {
        document.getElementById('txtColour').innerHTML +=
            "<option value='" + color.id + "'>" + color.nombre + "</option>";
    }
}

async function race() {
    const request = await fetch(all_race_pet + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        location.reload();
    });

    const races = await request.json();

    for (let race of races) {
        document.getElementById('txtRace').innerHTML +=
            "<option value='" + race.id + "'>" + race.nombre + "</option>";
    }
}

async function species() {
    const request = await fetch(all_species_pet + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        location.reload();
    });

    const species = await request.json();

    for (let specie of species) {
        document.getElementById('txtSpecies').innerHTML +=
            "<option value='" + specie.id + "'>" + specie.nombre + "</option>";

    }
}