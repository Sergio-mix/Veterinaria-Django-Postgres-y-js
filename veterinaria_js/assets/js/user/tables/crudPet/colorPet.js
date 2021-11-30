//----------------------------------- Color -----------------------------------------------
async function llenarTablaColores() {
    const request = await fetch(all_colors_pet + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
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
    document.getElementById('txtNumColor').innerText = colors.length;
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
            document.getElementById('load_modal').classList.add('show');
            let userLogin = await user_login({
                "correo": email,
                "clave": password
            }, false);
            if (userLogin.status) {
                let res = await queryPT('POST', register_color + id, {'nombre': capitalizar(name)}, false);
                if (res.status) {
                    document.getElementById('load_modal').classList.remove('show');
                    closeModal();
                    await llenarTablaColores();
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

function openRemoveColor(codigo, btn) {
    document.getElementById('titleTable').innerText = 'Remove Color'
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
                let res = await queryGD('DELETE', remove_color + codigo + '/' + id, false);
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

    let res = await queryPT('POST', getByid_color + id, {"id": codigo}, false);

    if (res.status) {
        document.getElementById('txtName').value = res.nombre;
    } else {
        alert(res.message);
        location.reload();
    }

    document.getElementById('onClickColor').onclick = async function () {
        let name = document.getElementById('txtName').value;
        let password = document.getElementById('txtPasswordModal').value;

        if (name !== "" && password !== "") {
            document.getElementById('load_modal').classList.add('show');
            let userLogin = await user_login({
                "correo": email,
                "clave": password
            }, false);
            if (userLogin.status) {
                let res = await queryPT('PUT', update_Color + id, {
                    "id": codigo,
                    'nombre': capitalizar(name),
                    "estado": 'C'
                }, false);
                if (res.status) {
                    document.getElementById('load_modal').classList.remove('show');
                    closeModal();
                    await llenarTablaColores();
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