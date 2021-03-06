//----------------------------------- Service -----------------------------------------------
async function llenarTablaService() {
    const request = await fetch(all_service + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        location.reload();
    })

    const services = await request.json();

    let listHtml = '';
    for (let service of services) {

        let descripcion = service.descripcion;

        if (descripcion === null) {
            descripcion = '';
        }

        let fila =
            "<tr><td> " + service.nombre + "</td>" +
            "<td> " + service.tarifa + "</td>" +
            "<td> " + service.iva + "</td>" +
            "<td> " + descripcion + "</td>" +
            "<td>" +
            "<button style=\"color: #ffd025\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='updateService(" + service.id + ")'>Update</button>" +
            "<button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openRemoveService(" + service.id + ",this" + ")'>" +
            "Remove</button>" +
            "</td></tr>";

        listHtml += fila;
    }

    document.querySelector('#tableService tbody').outerHTML = listHtml;
    document.getElementById('txtNumService').innerText = services.length;
}

function openAddService() {
    document.getElementById('titleModal').innerText = 'Add Service'
    document.getElementById('modal_container').classList.add('show');

    document.getElementById('containerModal').innerHTML =
        '<div class="row g-3 modal-dialog-scrollable navbar-nav-scroll">\n' +
        '                    <div class="col-md-12">\n' +
        '                        <label for="txtName" class="form-label">Name</label>\n' +
        '                        <input id="txtName" type="text" class="form-control">\n' +
        '                    </div>\n' +
        '                    <div class="col-md-6">\n' +
        '                        <label for="txtRate" class="form-label">Rate</label>\n' +
        '                        <input id="txtRate" type="number" class="form-control">\n' +
        '                    </div>\n' +
        '                    <div class="col-md-6">\n' +
        '                        <label for="txtIva" class="form-label">IVA</label>\n' +
        '                        <select id="txtIva" type="number" class="form-control">' +
        '                            <option value="S">True</option>' +
        '                            <option value="N">False</option>' +
        '                        </select>\n' +
        '                    </div>\n' +
        '                    <div class="col-md-12">\n' +
        '                        <label for="txtDescription" class="form-label">Description</label>\n' +
        '                        <textarea id="txtDescription" type="text" class="form-control"></textarea>\n' +
        '                    </div>\n' +
        '                    <div class="col-12">\n' +
        '                        <div class="form-group label-floating">\n' +
        '                            <label for="txtPasswordModal" class="form-label">Current password</label>\n' +
        '                            <input class="form-control" type="password" id="txtPasswordModal">\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="col-12">\n' +
        '                    <button id="onClickService" type="button" class="btn btn-primary">Register</button>\n' +
        '                    <button class="btn btn-outline-primary btn-sm " onclick="closeModal()">Close</button>\n' +
        '                </div>';


    document.getElementById('onClickService').onclick = async function () {
        let name = document.getElementById('txtName').value;
        let rate = document.getElementById('txtRate').value;
        let iva = document.getElementById('txtIva').value;
        let description = document.getElementById('txtDescription').value;
        let password = document.getElementById('txtPasswordModal').value;

        if (name !== "" && password !== "" && rate !== "") {
            document.getElementById('load_modal').classList.add('show');
            let userLogin = await user_login({
                "correo": email,
                "clave": password
            }, false);
            if (userLogin.status) {

                if (description === "") {
                    description = null;
                }

                iva = iva === 'S';

                let res = await queryPT('POST', save_service + id, {
                    'nombre': capitalizar(name),
                    "tarifa": rate,
                    "iva": iva,
                    "descripcion": description
                }, false);
                if (res.status) {
                    document.getElementById('load_modal').classList.remove('show');
                    closeModal();
                    await llenarTablaService();
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

function openRemoveService(codigo, btn) {
    document.getElementById('titleTable').innerText = 'Remove Service'
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
                let res = await queryGD('DELETE', remove_service + codigo + '/' + id, false);
                if (res.status) {
                    closeRemove();
                    let row = btn.parentNode.parentNode;
                    row.parentNode.removeChild(row);
                    document.getElementById('load_modal').classList.remove('show');
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

async function updateService(codigo) {
    document.getElementById('titleModal').innerText = 'Update Service'
    document.getElementById('modal_container').classList.add('show');

    document.getElementById('containerModal').innerHTML =
        '<div class="row g-3 modal-dialog-scrollable navbar-nav-scroll">\n' +
        '                    <div class="col-md-12">\n' +
        '                        <label for="txtName" class="form-label">Name</label>\n' +
        '                        <input id="txtName" type="text" class="form-control">\n' +
        '                    </div>\n' +
        '                    <div class="col-md-6">\n' +
        '                        <label for="txtRate" class="form-label">Rate</label>\n' +
        '                        <input id="txtRate" type="number" class="form-control">\n' +
        '                    </div>\n' +
        '                    <div class="col-md-6">\n' +
        '                        <label for="txtIva" class="form-label">IVA</label>\n' +
        '                        <select id="txtIva" type="number" class="form-control">' +
        '                            <option value="S">True</option>' +
        '                            <option value="N">False</option>' +
        '                        </select>\n' +
        '                    </div>\n' +
        '                    <div class="col-md-12">\n' +
        '                        <label for="txtDescription" class="form-label">Description</label>\n' +
        '                        <textarea id="txtDescription" type="text" class="form-control"></textarea>\n' +
        '                    </div>\n' +
        '                    <div class="col-12">\n' +
        '                        <div class="form-group label-floating">\n' +
        '                            <label for="txtPasswordModal" class="form-label">Current password</label>\n' +
        '                            <input class="form-control" type="password" id="txtPasswordModal">\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="col-12">\n' +
        '                    <button id="onClickService" type="button" class="btn btn-primary">Update</button>\n' +
        '                    <button class="btn btn-outline-primary btn-sm " onclick="closeModal()">Close</button>\n' +
        '                </div>';

    let res = await queryPT('POST', getByid_service + id, {"id": codigo}, false);

    if (res.status) {
        document.getElementById('txtName').value = res.nombre;
        document.getElementById('txtRate').value = res.tarifa;
        document.getElementById('txtDescription').value = res.descripcion;

        if (res.iva === true) {
            document.getElementById('txtIva').value = 'S';
        } else {
            document.getElementById('txtIva').value = 'N';
        }

    } else {
        alert(res.message);
        location.reload();
    }

    document.getElementById('onClickService').onclick = async function () {
        let name = document.getElementById('txtName').value;
        let rate = document.getElementById('txtRate').value;
        let iva = document.getElementById('txtIva').value;
        let description = document.getElementById('txtDescription').value;
        let password = document.getElementById('txtPasswordModal').value;

        if (name !== "" && password !== "") {
            document.getElementById('load_modal').classList.add('show');
            let userLogin = await user_login({
                "correo": email,
                "clave": password
            }, false);
            if (userLogin.status) {

                if (description === "") {
                    description = null;
                }
                let res = await queryPT('PUT', update_service + id, {
                    "id": codigo,
                    'nombre': capitalizar(name),
                    "tarifa": rate,
                    "iva": iva,
                    "descripcion": description,
                    "estado": 'C'
                }, false);
                if (res.status) {
                    document.getElementById('load_modal').classList.remove('show');
                    closeModal();
                    await llenarTablaService();
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

