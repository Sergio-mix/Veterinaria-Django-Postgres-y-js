//------------------------------------ Species ---------------------------------------------
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
    document.getElementById('txtNumSpecie').innerText = races.length;

    let listHtml = '';
    for (let race of races) {
        let fila =
            "<tr><td> " + race.nombre + "</td>" +
            "<td>" +
            "<button style=\"color: #ffd025\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='updateSpecie(" + race.id + ")'>Update</button>" +
            "<button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openRemoveSpecies(" + race.id + ",this" + ")'>" +
            "Remove</button>" +
            "</td></tr>";

        listHtml += fila;
    }

    document.querySelector('#tableSpecies tbody').outerHTML = listHtml;
}

function openAddSpecies() {
    document.getElementById('titleModal').innerText = 'Add Specie'
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
        '                    <button id="onClickRace" type="button" class="btn btn-primary">Register</button>\n' +
        '                    <button class="btn btn-outline-primary btn-sm " onclick="closeModal()">Close</button>\n' +
        '                </div>';

    document.getElementById('onClickRace').onclick = async function () {
        let name = document.getElementById('txtName').value;
        let password = document.getElementById('txtPasswordModal').value;

        if (name !== "" && password !== "") {
            let userLogin = await user_login({
                "correo": email,
                "clave": password
            }, false);
            if (userLogin.status) {
                let res = await queryPT('POST', register_species + id, {
                    'nombre': capitalizar(name)
                }, false);
                if (res.status) {
                    await llenarTablaSpecies();
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

function openRemoveSpecies(codigo, btn) {
    document.getElementById('titleTable').innerText = 'Remove Species'
    document.getElementById('modal_container_remove').classList.add('show');

    document.getElementById('removeModal').onclick = async function () {
        let password = document.getElementById('txtPasswordRemove').value;

        if (password !== "") {
            let userLogin = await user_login({
                "correo": email,
                "clave": password
            }, false);
            if (userLogin.status) {
                let res = await queryGD('DELETE', remove_species + codigo + '/' + id, false);
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

async function updateSpecie(codigo) {
    document.getElementById('titleModal').innerText = 'Update Race'
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
        '                    <button id="onClickRace" type="button" class="btn btn-primary">Update</button>\n' +
        '                    <button class="btn btn-outline-primary btn-sm " onclick="closeModal()">Close</button>\n' +
        '                </div>';

    let res = await queryPT('POST', getByid_species + id, {"id": codigo}, false);

    if (res.status) {
        document.getElementById('txtName').value = res.nombre;
    } else {
        alert(res.message);
        location.reload();
    }

    document.getElementById('onClickRace').onclick = async function () {
        let name = document.getElementById('txtName').value;
        let password = document.getElementById('txtPasswordModal').value;

        if (name !== "" && password !== "") {
            let userLogin = await user_login({
                "correo": email,
                "clave": password
            }, false);
            if (userLogin.status) {
                let res = await queryPT('PUT', update_species + id, {
                    'id': codigo,
                    'nombre': capitalizar(name),
                    "estado": 'C'
                }, false);
                if (res.status) {
                    await llenarTablaSpecies();
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