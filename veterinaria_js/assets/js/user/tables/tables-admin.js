//-----------------------------------------------------------------------------------------
llenarTablaColores();
llenarTablaRazas();
llenarTablaSpecies();
llenarPets();
llenarTablaDocumentType();
llenarUsers();
llenarQuery();
//-----------------------------------------------------------------------------------------
function closeModal() {
    document.getElementById('modal_container').classList.remove('show');
}

//----------------------------------- Color -----------------------------------------------
async function llenarTablaColores() {
    const request = await fetch(all_colors_pet + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        alert('Process error');
        location.reload();
    })

    const colors = await request.json();

    let listHtml = '';
    for (let color of colors) {
        let fila =
            "<tr><td> " + color.nombre + "</td>" +
            "<td>" +
            "<button style=\"color: #ffd025\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='updateColor(" + color.id + ")'>Update</button>" +
            "<button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openRemoveColor(" + color.id + ",this" + ")'>" +
            "Remove</button>" +
            "</td></tr>";

        listHtml += fila;
    }

    document.querySelector('#tableColores tbody').outerHTML = listHtml;
}

function openAddColor() {
    document.getElementById('titleModal').innerText = 'Add Color'
    document.getElementById('modal_container').classList.add('show');

    document.getElementById('containerModal').innerHTML =
        '<div class="row g-3 modal-dialog-scrollable navbar-nav-scroll">\n' +
        '                    <div class="col-md-12">\n' +
        '                        <label for="txtName" class="form-label">Name</label>\n' +
        '                        <input id="txtName" type="text" class="form-control">\n' +
        '                    </div>\n' +
        '                    <div class="col-12">\n' +
        '                        <div class="form-group label-floating">\n' +
        '                            <label for="txtPasswordModal" class="form-label">Current password</label>\n' +
        '                            <input class="form-control" type="password" id="txtPasswordModal">\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="col-12">\n' +
        '                    <button id="onClickColor" type="button" class="btn btn-primary">Register</button>\n' +
        '                    <button class="btn btn-outline-primary btn-sm " onclick="closeModal()">Close</button>\n' +
        '                </div>';


    document.getElementById('onClickColor').onclick = async function () {
        let name = document.getElementById('txtName').value;
        let password = document.getElementById('txtPasswordModal').value;

        if (name !== "" && password !== "") {
            let userLogin = await user_login({
                "correo": email,
                "clave": password
            }, false);
            if (userLogin.status) {
                let res = await queryPT('POST', register_color + id, {'nombre': capitalizar(name)}, false);
                if (res.status) {
                    await llenarTablaColores();
                    closeModal();
                } else {
                    alert(res.message);
                }
            } else {
                alert(userLogin.message);
            }
        } else {
            alert('The values entered are not valid');
        }
    }
}

function openRemoveColor(codigo, btn) {
    document.getElementById('titleTable').innerText = 'Remove Color'
    document.getElementById('modal_container_remove').classList.add('show');

    document.getElementById('removeModal').onclick = async function () {
        let password = document.getElementById('txtPasswordRemove').value;

        if (password !== "") {
            let userLogin = await user_login({
                "correo": email,
                "clave": password
            }, false);
            if (userLogin.status) {
                let res = await queryGD('DELETE', remove_color + codigo + '/' + id, false);
                if (res.status) {
                    closeRemove();
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
    }
}

async function updateColor(codigo) {
    document.getElementById('titleModal').innerText = 'Update Color'
    document.getElementById('modal_container').classList.add('show');

    document.getElementById('containerModal').innerHTML =
        '<div class="row g-3 modal-dialog-scrollable navbar-nav-scroll">\n' +
        '                    <div class="col-md-12">\n' +
        '                        <label for="txtName" class="form-label">Name</label>\n' +
        '                        <input id="txtName" type="text" class="form-control">\n' +
        '                    </div>\n' +
        '                    <div class="col-12">\n' +
        '                        <div class="form-group label-floating">\n' +
        '                            <label for="txtPasswordModal" class="form-label">Current password</label>\n' +
        '                            <input class="form-control" type="password" id="txtPasswordModal">\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="col-12">\n' +
        '                    <button id="onClickColor" type="button" class="btn btn-primary">Update</button>\n' +
        '                    <button class="btn btn-outline-primary btn-sm " onclick="closeModal()">Close</button>\n' +
        '                </div>';

    let res = await queryPT('POST', getByid + id, {"id": codigo}, false);
    document.getElementById('txtName').value = res.nombre;

    document.getElementById('onClickColor').onclick = async function () {
        let name = document.getElementById('txtName').value;
        let password = document.getElementById('txtPasswordModal').value;

        if (name !== "" && password !== "") {
            let userLogin = await user_login({
                "correo": email,
                "clave": password
            }, false);
            if (userLogin.status) {
                let res = await queryPT('PUT', updatePet + id, {
                    "id": codigo,
                    'nombre': capitalizar(name),
                    "estado": 'C'
                }, false);
                if (res.status) {
                    await llenarTablaColores();
                    closeModal();
                } else {
                    alert(res.message);
                }
            } else {
                alert(userLogin.message);
            }
        } else {
            alert('The values entered are not valid');
        }
    }
}

//---------------------------------- Race -------------------------------------------------
async function llenarTablaRazas() {
    const request = await fetch(all_race_pet + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        location.reload();
    })

    const races = await request.json();

    let listHtml = '';
    for (let race of races) {
        let fila =
            "<tr><td> " + race.nombre + "</td>" +
            "<td> " + race.tamanio + "</td>" +
            "<td>" +
            "<button style=\"color: #ffd025\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openPetUpdate(" + race.id + ")'>Update</button>" +
            "<button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openRemoveRace(" + race.id + ",this" + ")'>" +
            "Remove</button>" +
            "</td></tr>";

        listHtml += fila;
    }

    document.querySelector('#tableRace tbody').outerHTML = listHtml;
}

function openRemoveRace(codigo, btn) {
    document.getElementById('titleTable').innerText = 'Remove Race'
    document.getElementById('modal_container_remove').classList.add('show');
}

//----------------------------------------------------------------------------------------
async function llenarTablaSpecies() {
    const request = await fetch(all_species_pet + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        location.reload();
    })

    const races = await request.json();

    let listHtml = '';
    for (let race of races) {
        let fila =
            "<tr><td> " + race.nombre + "</td>" +
            "<td>" +
            "<button style=\"color: #ffd025\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openPetUpdate(" + race.id + ")'>Update</button>" +
            "<button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openRemoveSpecies(" + race.id + ",this" + ")'>" +
            "Remove</button>" +
            "</td></tr>";

        listHtml += fila;
    }

    document.querySelector('#tableSpecies tbody').outerHTML = listHtml;
}

function openRemoveSpecies(codigo, btn) {
    document.getElementById('titleTable').innerText = 'Remove Species'
    document.getElementById('modal_container_remove').classList.add('show');
}

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
            "onclick='openRemovePets(" + pet.id + ",this" + ")'>" +
            "Remove</button>" +
            "<button style=\"color: rgba(0,255,82,0.61)\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openPetUpdate(" + pet.id + ")'>Queries</button>" +
            "</td></tr>";

        listHtml += fila;
    }

    document.querySelector('#tablePets tbody').outerHTML = listHtml;
}

function openRemovePets(codigo, btn) {
    document.getElementById('titleTable').innerText = 'Remove Pet'
    document.getElementById('modal_container_remove').classList.add('show');
}

async function llenarTablaDocumentType() {
    const request = await fetch(typeDocument_all, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        location.reload();
    })

    const types = await request.json();

    let listHtml = '';
    for (let type of types) {
        let fila =
            "<tr><td> " + type.nombre + "</td>" +
            "<td>" +
            "<button style=\"color: #ffd025\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openPetUpdate(" + type.id + ")'>Update</button>" +
            "<button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openRemoveDocumentType(" + type.id + ",this" + ")'>" +
            "Remove</button>" +
            "</td></tr>";

        listHtml += fila;
    }

    document.querySelector('#tableDocumentType tbody').outerHTML = listHtml;
}

function openRemoveDocumentType(codigo, btn) {
    document.getElementById('titleTable').innerText = 'Remove Document Type'
    document.getElementById('modal_container_remove').classList.add('show');
}

async function llenarUsers() {
    const request = await fetch(user_all + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        alert('Process error');
        location.reload();
    })

    const users = await request.json();

    let listHtml = '';
    for (let user of users) {

        let fijo = '';
        if (user.telefono_fijo == null) {
            fijo = 'Undefined'
        } else {
            fijo = user.telefono_fijo
        }

        let fila =
            "<tr><td> " + user.correo + "</td>" +
            "<td> " + user.identificacion + "</td>" +
            "<td> " + user.nombres + "</td>" +
            "<td> " + user.apellidos + "</td>" +
            "<td> " + user.telefono + "</td>" +
            "<td> " + fijo + "</td>" +
            "<td> " + user.direccion + "</td>" +
            "<td>" +
            "<button style=\"color: #ffd025\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openPetUpdate(" + user.id + ")'>Update</button>" +
            "<button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openRemoveUser(" + user.id + ",this" + ")'>" +
            "Remove</button>" +
            "<button style=\"color: rgb(0,167,255)\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openPetUpdate(" + user.id + ")'>Record</button>" +
            "</td></tr>";

        listHtml += fila;
    }

    document.querySelector('#tableUser tbody').outerHTML = listHtml;
}

function openRemoveUser(codigo, btn) {
    document.getElementById('titleTable').innerText = 'Remove User'
    document.getElementById('modal_container_remove').classList.add('show');
}

async function llenarQuery() {
    const request = await fetch(all_query + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        location.reload();
    })

    const users = await request.json();

    let listHtml = '';
    for (let user of users) {

        let fijo = '';
        if (user.telefono_fijo == null) {
            fijo = 'Undefined'
        } else {
            fijo = user.telefono_fijo
        }

        let fila =
            "<tr><td> " + user.correo + "</td>" +
            "<td> " + user.identificacion + "</td>" +
            "<td> " + user.nombres + "</td>" +
            "<td> " + user.apellidos + "</td>" +
            "<td>" +
            "<button style=\"color: #ffd025\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openPetUpdate(" + user.id + ")'>Update</button>" +
            "<button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openRemoveQuery(" + user.id + ",this" + ")'>" +
            "Remove</button>" +
            "</td></tr>";

        listHtml += fila;
    }

    document.querySelector('#tableQueries tbody').outerHTML = listHtml;
}

function openRemoveQuery(codigo, btn) {
    document.getElementById('titleTable').innerText = 'Remove Query';
    document.getElementById('modal_container_remove').classList.add('show');
}

function closeRemove() {
    document.getElementById('modal_container_remove').classList.remove('show');
    document.getElementById('txtPasswordRemove').value = '';
}

function capitalizar(str) {
    let s = str.toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
}