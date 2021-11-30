//--------------------------------------- Pets ---------------------------------------------
async function llenarPets() {
    const request = await fetch(all_pet + id, {
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
            "<tr><td> " + pet.usuario + "</td>" +
            "<td> " + pet.microchip + "</td>" +
            "<td> " + pet.nombre + "</td>" +
            "<td> " + pet.color + "</td>" +
            "<td> " + pet.especie + "</td>" +
            "<td> " + pet.raza + "</td>" +
            "<td> " + pet.tamanio + "</td>" +
            "<td> " + pet.fecha_nacimiento + "</td>" +
            "<td> " + sexo + "</td>" +
            "<td>" +
            "<button style=\"color: #ffd025\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='updatePet(" + pet.id + ")'>Update</button>" +
            "<button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openRemovePets(" + pet.id + ",this" + ")'>" +
            "Remove</button>" +
            "</td></tr>";

        listHtml += fila;
    }

    document.querySelector('#tablePets tbody').outerHTML = listHtml;
    document.getElementById('txtNumPet').innerText = pets.length;
}

function openRemovePets(codigo, btn) {
    document.getElementById('titleTable').innerText = 'Remove Pet'
    document.getElementById('modal_container_remove').classList.add('show');

    document.getElementById('removeModal').onclick = async function () {
        let password = document.getElementById('txtPasswordRemove').value;

        if (password !== "") {
            document.getElementById('load_modal').classList.add('show');
            let userLogin = await user_login({
                "correo": email,
                "clave": password
            }, false);
            if (userLogin.status) {
                let res = await queryGD('DELETE', remove__pet + codigo + '/' + id, false);
                if (res.status) {
                    document.getElementById('load_modal').classList.remove('show');
                    closeRemove();
                    let row = btn.parentNode.parentNode;
                    row.parentNode.removeChild(row);
                } else {
                    document.getElementById('load_modal').classList.remove('show');
                    alert(res.message);
                }
            } else {
                document.getElementById('load_modal').classList.remove('show');
                alert(userLogin.message);
            }
        } else {
            alert('The values entered are not valid');
        }
    }
}

function openAddPet() {
    document.getElementById('titleModal').innerText = 'Add Pet'
    document.getElementById('modal_container').classList.add('show');

    document.getElementById('containerModal').innerHTML =
        '<div class="row g-3 modal-dialog-scrollable navbar-nav-scroll">\n' +
        '               <div class="col-md-6">\n' +
        '                    <label for="txtMicrochip" class="form-label">Microchip</label>\n' +
        '                    <input id="txtMicrochip" type="text" class="form-control">\n' +
        '                </div>\n' +
        '                <div class="col-md-6">\n' +
        '                    <label for="txtRace" class="form-label">Race</label>\n' +
        '                    <select class="form-control" type="text" id="txtRace"></select>\n' +
        '                </div>\n' +
        '                <div class="col-6">\n' +
        '                    <label for="txtColour" class="form-label">Colour</label>\n' +
        '                    <select class="form-control" type="text" id="txtColour"></select>\n' +
        '                </div>\n' +
        '                <div class="col-6">\n' +
        '                    <label for="txtSpecies" class="form-label">Species</label>\n' +
        '                    <select class="form-control" id="txtSpecies"></select>\n' +
        '                </div>\n' +
        '                <div class="col-md-6">\n' +
        '                    <label for="txtBirth_date" class="form-label">Sex</label>\n' +
        '                    <label for="txtSex"></label><select class="form-control" id="txtSex">\n' +
        '                        <option value="M">Male</option>\n' +
        '                        <option value="H">female</option>\n' +
        '                    </select>\n' +
        '                </div>\n' +
        '                <div class="col-md-6">\n' +
        '                    <label for="txtNamePet" class="form-label">Name</label>\n' +
        '                    <input type="text" class="form-control" id="txtNamePet">\n' +
        '                </div>\n' +
        '                <div class="col-md-6">\n' +
        '                    <label for="txtBirth_date" class="form-label">Birth date</label>\n' +
        '                    <input type="date" class="form-control" id="txtBirth_date">\n' +
        '                </div>' +
        '                <div class="col-md-4">\n' +
        '                    <label for="txtNumerId" class="form-label">number</label>\n' +
        '                    <input type="number" class="form-control" id="txtNumerId">\n' +
        '                </div>' +
        '                <div class="col-md-2">\n' +
        '                    <label for="txtType" class="form-label"> Type</label>\n' +
        '                    <select  class="form-control" id="txtType"></select>\n' +
        '                </div>' +
        '                <div class="col-12">\n' +
        '                    <div class="form-group label-floating">\n' +
        '                        <label for="txtPasswordPet" class="form-label">Current password</label>\n' +
        '                        <input class="form-control" type="password" id="txtPasswordPet">\n' +
        '                    </div>\n' +
        '                </div>' +
        '            <div class="col-12">\n' +
        '                    <button id="onClickPet" type="button" class="btn btn-primary">Register</button>\n' +
        '                    <button class="btn btn-outline-primary btn-sm " onclick="closeModal()">Close</button>\n' +
        '             </div>' +
        '</div>';

    colors();
    race();
    species();
    tipoId();

    document.getElementById('onClickPet').onclick = async function () {
        let microchip = document.getElementById('txtMicrochip').value;
        let color = document.getElementById('txtColour').value;
        let species = document.getElementById('txtSpecies').value;
        let race = document.getElementById('txtRace').value;
        let name = document.getElementById('txtNamePet').value;
        let sex = document.getElementById('txtSex').value;
        let birth_date = document.getElementById('txtBirth_date').value;
        let numberId = document.getElementById('txtNumerId').value;
        let type = document.getElementById('txtType').value;
        let passwordPet = document.getElementById('txtPasswordPet').value;

        if (name !== "" && birth_date !== "" && passwordPet !== "" && numberId !== "") {
            document.getElementById('load_modal').classList.add('show');
            let userLogin = await user_login({
                "correo": email,
                "clave": document.getElementById('txtPasswordPet').value
            }, false);
            if (userLogin.status) {
                let validate = await queryPT('POST', user_exists + id, {"id": numberId, "tipo": type}, false);
                if (validate.status) {
                    let pet = {
                        "microchip": microchip,
                        "color": color,
                        "especie": species,
                        "nombre": name,
                        "fecha_nacimiento": birth_date,
                        "raza": race,
                        "sexo": sex,
                        "usuario": validate.id
                    }

                    if (microchip === "") {
                        pet.microchip = null;
                    }

                    let res = await queryPT('POST', save_pet + id, pet, false);
                    if (res.status) {
                        document.getElementById('load_modal').classList.remove('show');
                        closeModal();
                        await llenarPets();
                    } else {
                        document.getElementById('load_modal').classList.remove('show');
                        alert(res.message);
                    }
                } else {
                    document.getElementById('load_modal').classList.remove('show');
                    alert(validate.message);
                }
            } else {
                document.getElementById('load_modal').classList.remove('show');
                alert(userLogin.message);
            }
        } else {
            alert('The values entered are not valid');
        }
    }
}

async function updatePet(codigo) {
    document.getElementById('titleModal').innerText = 'Update Color'
    document.getElementById('modal_container').classList.add('show');

    document.getElementById('containerModal').innerHTML =
        '<div class="row g-3 modal-dialog-scrollable navbar-nav-scroll">\n' +
        '               <div class="col-md-6">\n' +
        '                    <label for="txtMicrochip" class="form-label">Microchip</label>\n' +
        '                    <input id="txtMicrochip" type="text" class="form-control">\n' +
        '                </div>\n' +
        '                <div class="col-md-6">\n' +
        '                    <label for="txtRace" class="form-label">Race</label>\n' +
        '                    <select class="form-control" type="text" id="txtRace"></select>\n' +
        '                </div>\n' +
        '                <div class="col-6">\n' +
        '                    <label for="txtColour" class="form-label">Colour</label>\n' +
        '                    <select class="form-control" type="text" id="txtColour"></select>\n' +
        '                </div>\n' +
        '                <div class="col-6">\n' +
        '                    <label for="txtSpecies" class="form-label">Species</label>\n' +
        '                    <select class="form-control" id="txtSpecies"></select>\n' +
        '                </div>\n' +
        '                <div class="col-md-6">\n' +
        '                    <label for="txtBirth_date" class="form-label">Sex</label>\n' +
        '                    <label for="txtSex"></label><select class="form-control" id="txtSex">\n' +
        '                        <option value="M">Male</option>\n' +
        '                        <option value="H">female</option>\n' +
        '                    </select>\n' +
        '                </div>\n' +
        '                <div class="col-md-6">\n' +
        '                    <label for="txtNamePet" class="form-label">Name</label>\n' +
        '                    <input type="text" class="form-control" id="txtNamePet">\n' +
        '                </div>\n' +
        '                <div class="col-md-6">\n' +
        '                    <label for="txtBirth_date" class="form-label">Birth date</label>\n' +
        '                    <input type="date" class="form-control" id="txtBirth_date">\n' +
        '                </div>' +
        '                <div class="col-12">\n' +
        '                    <div class="form-group label-floating">\n' +
        '                        <label for="txtPasswordPet" class="form-label">Current password</label>\n' +
        '                        <input class="form-control" type="password" id="txtPasswordPet">\n' +
        '                    </div>\n' +
        '                </div>' +
        '            <div class="col-12">\n' +
        '                    <button id="onClickPet" type="button" class="btn btn-primary">Update</button>\n' +
        '                    <button class="btn btn-outline-primary btn-sm " onclick="closeModal()">Close</button>\n' +
        '             </div>' +
        '</div>';

    colors();
    race();
    species();

    let res = await queryPT('POST', get_pet + id, {"id": codigo}, false);

    document.getElementById('txtMicrochip').value = res.microchip;
    document.getElementById('txtColour').value = res.color;
    document.getElementById('txtSpecies').value = res.especie;
    document.getElementById('txtRace').value = res.raza;
    document.getElementById('txtNamePet').value = res.nombre;
    document.getElementById('txtBirth_date').value = res.fecha_nacimiento;
    document.getElementById('txtSex').value = res.sexo;


    document.getElementById('onClickPet').onclick = async function () {
        let microchip = document.getElementById('txtMicrochip').value;
        let color = document.getElementById('txtColour').value;
        let species = document.getElementById('txtSpecies').value;
        let race = document.getElementById('txtRace').value;
        let name = document.getElementById('txtNamePet').value;
        let sex = document.getElementById('txtSex').value;
        let birth_date = document.getElementById('txtBirth_date').value;
        let passwordPet = document.getElementById('txtPasswordPet').value;

        if (name !== "" && birth_date !== "" && passwordPet !== "") {
            document.getElementById('load_modal').classList.add('show');
            let userLogin = await user_login({
                "correo": email,
                "clave": document.getElementById('txtPasswordPet').value
            }, false);
            if (userLogin.status) {

                let pet = {
                    "id": codigo,
                    "microchip": microchip,
                    "color": color,
                    "especie": species,
                    "nombre": name,
                    "fecha_nacimiento": birth_date,
                    "raza": race,
                    "sexo": sex,
                    "usuario": res.usuario,
                    "estado": 'C'
                }

                if (microchip === "") {
                    pet.microchip = null;
                }

                let request = await queryPT('PUT', update__pet + id, pet, false);
                if (request.status) {
                    document.getElementById('load_modal').classList.remove('show');
                    closeModal();
                    await llenarPets();
                } else {
                    document.getElementById('load_modal').classList.remove('show');
                    alert(request.message);
                }
            } else {
                document.getElementById('load_modal').classList.remove('show');
                alert(userLogin.message);
            }
        } else {
            alert('The values entered are not valid');
        }
    }
}