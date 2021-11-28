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
    document.getElementById('txtNumRace').innerText = races.length;

    let listHtml = '';
    for (let race of races) {
        let fila =
            "<tr><td> " + race.nombre + "</td>" +
            "<td> " + race.tamanio + "</td>" +
            "<td>" +
            "<button style=\"color: #ffd025\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='updateRace(" + race.id + ")'>Update</button>" +
            "<button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openRemoveRace(" + race.id + ",this" + ")'>" +
            "Remove</button>" +
            "</td></tr>";

        listHtml += fila;
    }

    document.querySelector('#tableRace tbody').outerHTML = listHtml;
}

function openAddRace() {
    document.getElementById('titleModal').innerText = 'Add Race'
    document.getElementById('modal_container').classList.add('show');

    document.getElementById('containerModal').innerHTML =
        '<div class="row g-3 modal-dialog-scrollable navbar-nav-scroll">\n' +
        '                    <div class="col-md-12">\n' +
        '                        <label for="txtName" class="form-label">Name</label>\n' +
        '                        <input id="txtName" type="text" class="form-control">\n' +
        '                    </div>\n' +
        '                    <div class="col-md-12">\n' +
        '                        <label for="txtSize" class="form-label">Size</label>\n' +
        '                        <select id="txtSize" type="text" class="form-control">' +
        '                            <option value="Grande">Big</option>' +
        '                            <option value="Mediano">Medium</option>' +
        '                            <option value="Pequeño">Little</option>' +
        '                        </select>\n' +
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
        let size = document.getElementById('txtSize').value;
        let password = document.getElementById('txtPasswordModal').value;

        if (name !== "" && password !== "") {
            let userLogin = await user_login({
                "correo": email,
                "clave": password
            }, false);
            if (userLogin.status) {
                let res = await queryPT('POST', register_Race + id, {
                    'nombre': capitalizar(name),
                    "tamanio": size
                }, false);
                if (res.status) {
                    await llenarTablaRazas();
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

function openRemoveRace(codigo, btn) {
    document.getElementById('titleTable').innerText = 'Remove Race'
    document.getElementById('modal_container_remove').classList.add('show');

    document.getElementById('removeModal').onclick = async function () {
        let password = document.getElementById('txtPasswordRemove').value;

        if (password !== "") {
            let userLogin = await user_login({
                "correo": email,
                "clave": password
            }, false);
            if (userLogin.status) {
                let res = await queryGD('DELETE', remove_Race + codigo + '/' + id, false);
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

async function updateRace(codigo) {
    document.getElementById('titleModal').innerText = 'Update Race'
    document.getElementById('modal_container').classList.add('show');

    document.getElementById('containerModal').innerHTML =
        '<div class="row g-3 modal-dialog-scrollable navbar-nav-scroll">\n' +
        '                    <div class="col-md-12">\n' +
        '                        <label for="txtName" class="form-label">Name</label>\n' +
        '                        <input id="txtName" type="text" class="form-control">\n' +
        '                    </div>\n' +
        '                    <div class="col-md-12">\n' +
        '                        <label for="txtSize" class="form-label">Size</label>\n' +
        '                        <select id="txtSize" type="text" class="form-control">' +
        '                            <option value="Grande">Big</option>' +
        '                            <option value="Mediano">Medium</option>' +
        '                            <option value="Pequeño">Little</option>' +
        '                        </select>\n' +
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

    let res = await queryPT('POST', getByid_race + id, {"id": codigo}, false);

    if (res.status) {
        document.getElementById('txtName').value = res.nombre;
        document.getElementById('txtSize').value = res.tamanio;
    } else {
        alert(res.message);
        location.reload();
    }

    document.getElementById('onClickRace').onclick = async function () {
        let name = document.getElementById('txtName').value;
        let size = document.getElementById('txtSize').value;
        let password = document.getElementById('txtPasswordModal').value;

        if (name !== "" && password !== "") {
            let userLogin = await user_login({
                "correo": email,
                "clave": password
            }, false);
            if (userLogin.status) {
                let res = await queryPT('PUT', update_Race + id, {
                    'id': codigo,
                    'nombre': capitalizar(name),
                    "tamanio": size,
                    "estado": 'C'
                }, false);
                if (res.status) {
                    await llenarTablaRazas();
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