async function llenarUsers() {
    const request = await fetch(user_all + id, {
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

        let removeUs = "<button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openRemoveUser(" + user.id + ",this" + ")'>" +
            "Remove</button>";

        if (user.id === +id) {
            removeUs = '';
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
            // "<button style=\"color: #ffd025\" class=\"btn btn-sm btn-neutral\" " +
            // "onclick='updateUser(" + user.id + ")'>Update</button>" +
            removeUs +
            "<button style=\"color: rgb(0,167,255)\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='record(" + user.id + ")'>Record</button>" +
            "</td></tr>";

        listHtml += fila;
    }

    document.querySelector('#tableUser tbody').outerHTML = listHtml;
    document.getElementById('txtNumUser').innerText = users.length
}

function addUser() {
    document.getElementById('titleModal').innerText = 'Add User'
    document.getElementById('modal_container').classList.add('show');

    document.getElementById('containerModal').innerHTML =
        '<div class="row g-3 modal-dialog-scrollable navbar-nav-scroll">\n' +
        '               <div class="col-md-6">\n' +
        '                    <label for="txtNames" class="form-label">Names</label>\n' +
        '                    <input id="txtNames" type="text" class="form-control">\n' +
        '                </div>\n' +
        '                <div class="col-md-6">\n' +
        '                    <label for="txtLastNames" class="form-label">Last Names</label>\n' +
        '                    <input class="form-control" type="text" id="txtLastNames">\n' +
        '                </div>\n' +
        '                <div class="col-6">\n' +
        '                    <label for="txtEmail" class="form-label">Email</label>\n' +
        '                    <input class="form-control" type="email" id="txtEmail">\n' +
        '                </div>\n' +
        '                <div class="col-6">\n' +
        '                    <label for="txtPassword" class="form-label">Password</label>\n' +
        '                    <input type="password" class="form-control" id="txtPassword">\n' +
        '                </div>\n' +
        '                <div class="col-md-6">\n' +
        '                    <div class="form-group label-floating">\n' +
        '                    <label for="txtIdentification" class="form-label">Identification</label>\n' +
        '                    <input type="number" class="form-control" id="txtIdentification">\n' +
        '                    </div>' +
        '                </div>' +
        '                <div class="col-6">\n' +
        '                    <div class="form-group label-floating">\n' +
        '                        <label for="txtType" class="form-label">Type</label>\n' +
        '                        <select class="form-control" id="txtType"></select>\n' +
        '                    </div>\n' +
        '                </div>' +
        '                <div class="col-12">\n' +
        '                    <div class="form-group label-floating">\n' +
        '                        <label for="txtTelephone" class="form-label">Telephone</label>\n' +
        '                        <input class="form-control" type="number" id="txtTelephone">\n' +
        '                    </div>\n' +
        '                </div>' +
        '                <div class="col-12">\n' +
        '                    <div class="form-group label-floating">\n' +
        '                        <label for="txtLandline" class="form-label">landline</label>\n' +
        '                        <input class="form-control" type="number" id="txtLandline">\n' +
        '                    </div>\n' +
        '                </div>' +
        '                <div class="col-12">\n' +
        '                    <div class="form-group label-floating">\n' +
        '                        <label for="txtLandlinetxtAddress" class="form-label">Address</label>\n' +
        '                        <input class="form-control" type="text" id="txtAddress">\n' +
        '                    </div>\n' +
        '                  </div>' +
        '                    <div class="col-12">\n' +
        '                        <div class="form-group label-floating">\n' +
        '                            <label for="txtPasswordModal" class="form-label">Current password</label>\n' +
        '                            <input class="form-control" type="password" id="txtPasswordModal">\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>' +
        '            <div class="col-12">\n' +
        '                    <button id="onClickPet" type="button" class="btn btn-primary">Register</button>\n' +
        '                    <button class="btn btn-outline-primary btn-sm " onclick="closeModal()">Close</button>\n' +
        '             </div>';

    tipoId();

    document.getElementById('onClickPet').onclick = async function () {
        let names = document.getElementById('txtNames').value;
        let LastNames = document.getElementById('txtLastNames').value;
        let emailUser = document.getElementById('txtEmail').value;
        let passwordUser = document.getElementById('txtPassword').value;
        let identification = document.getElementById('txtIdentification').value;
        let type = document.getElementById('txtType').value;
        let telephone = document.getElementById('txtTelephone').value;
        let landline = document.getElementById('txtLandline').value;
        let address = document.getElementById('txtAddress').value;
        let passwordModal = document.getElementById('txtPasswordModal').value;

        if (names !== "" && LastNames !== "" && emailUser !== "" && passwordUser !== ""
            && identification !== "" && telephone !== "" && address !== ""
            && passwordModal !== "" && emailRegex.test(emailUser)) {
            let userLogin = await user_login({
                "correo": email,
                "clave": passwordModal
            }, false);
            if (userLogin.status) {
                let valEmail = await queryPT('POST', validate_Email, {"email": emailUser}, false);
                if (!valEmail.status) {

                    if (landline === "") {
                        landline = null;
                    }

                    let res = await queryPT('POST', register_user, {
                        "correo": emailUser,
                        "clave": passwordUser,
                        "rol": null,
                        "identificacion": identification,
                        "tipo": type,
                        "nombres": names,
                        "apellidos": LastNames,
                        "telefono": telephone,
                        "telefono_fijo": landline,
                        "direccion": address
                    }, false);
                    if (res.status) {
                        await llenarUsers();
                        closeModal();
                    } else {
                        alert(res.message);
                    }
                } else {
                    alert(valEmail.message);
                }
            } else {
                alert(userLogin.message);
            }
        } else {
            alert('The values entered are not valid');
        }
    }
}

function openRemoveUser(codigo, btn) {
    document.getElementById('titleTable').innerText = 'Remove User'
    document.getElementById('modal_container_remove').classList.add('show');

    document.getElementById('removeModal').onclick = async function () {
        let password = document.getElementById('txtPasswordRemove').value;

        if (password !== "") {
            let userLogin = await user_login({
                "correo": email,
                "clave": password
            }, false);
            if (userLogin.status) {
                let res = await queryGD('DELETE', remove_user + codigo + '/' + id, false);
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

// function updateUser(codigo){
//     document.getElementById('titleModal').innerText = 'Update User'
//     document.getElementById('modal_container').classList.add('show');
//
//     document.getElementById('containerModal').innerHTML =
//         '<div class="row g-3 modal-dialog-scrollable navbar-nav-scroll">\n' +
//         '               <div class="col-md-6">\n' +
//         '                    <label for="txtNames" class="form-label">Names</label>\n' +
//         '                    <input id="txtNames" type="text" class="form-control">\n' +
//         '                </div>\n' +
//         '                <div class="col-md-6">\n' +
//         '                    <label for="txtLastNames" class="form-label">Last Names</label>\n' +
//         '                    <input class="form-control" type="text" id="txtLastNames">\n' +
//         '                </div>\n' +
//         '                <div class="col-6">\n' +
//         '                    <label for="txtEmail" class="form-label">Email</label>\n' +
//         '                    <input class="form-control" type="email" id="txtEmail">\n' +
//         '                </div>\n' +
//         '                <div class="col-6">\n' +
//         '                    <label for="txtPassword" class="form-label">Password</label>\n' +
//         '                    <input type="password" class="form-control" id="txtPassword">\n' +
//         '                </div>\n' +
//         '                <div class="col-md-6">\n' +
//         '                    <div class="form-group label-floating">\n' +
//         '                    <label for="txtIdentification" class="form-label">Identification</label>\n' +
//         '                    <input type="number" class="form-control" id="txtIdentification">\n' +
//         '                    </div>' +
//         '                </div>' +
//         '                <div class="col-6">\n' +
//         '                    <div class="form-group label-floating">\n' +
//         '                        <label for="txtType" class="form-label">Type</label>\n' +
//         '                        <select class="form-control" id="txtType"></select>\n' +
//         '                    </div>\n' +
//         '                </div>' +
//         '                <div class="col-12">\n' +
//         '                    <div class="form-group label-floating">\n' +
//         '                        <label for="txtTelephone" class="form-label">Telephone</label>\n' +
//         '                        <input class="form-control" type="number" id="txtTelephone">\n' +
//         '                    </div>\n' +
//         '                </div>' +
//         '                <div class="col-12">\n' +
//         '                    <div class="form-group label-floating">\n' +
//         '                        <label for="txtLandline" class="form-label">landline</label>\n' +
//         '                        <input class="form-control" type="number" id="txtLandline">\n' +
//         '                    </div>\n' +
//         '                </div>' +
//         '                <div class="col-12">\n' +
//         '                    <div class="form-group label-floating">\n' +
//         '                        <label for="txtLandlinetxtAddress" class="form-label">Address</label>\n' +
//         '                        <input class="form-control" type="text" id="txtAddress">\n' +
//         '                    </div>\n' +
//         '                  </div>' +
//         '                    <div class="col-12">\n' +
//         '                        <div class="form-group label-floating">\n' +
//         '                            <label for="txtPasswordModal" class="form-label">Current password</label>\n' +
//         '                            <input class="form-control" type="password" id="txtPasswordModal">\n' +
//         '                        </div>\n' +
//         '                    </div>\n' +
//         '                </div>' +
//         '            <div class="col-12">\n' +
//         '                    <button id="onClickPet" type="button" class="btn btn-primary">Update</button>\n' +
//         '                    <button class="btn btn-outline-primary btn-sm " onclick="closeModal()">Close</button>\n' +
//         '             </div>';
//
//     tipoId();
//
//     let names = document.getElementById('txtNames').value;
//     let LastNames = document.getElementById('txtLastNames').value;
//     let emailUser = document.getElementById('txtEmail').value;
//     let passwordUser = document.getElementById('txtPassword').value;
//     let identification = document.getElementById('txtIdentification').value;
//     let type = document.getElementById('txtType').value;
//     let telephone = document.getElementById('txtTelephone').value;
//     let landline = document.getElementById('txtLandline').value;
//     let address = document.getElementById('txtAddress').value;
//     let passwordModal = document.getElementById('txtPasswordModal').value;
//
//     document.getElementById('onClickPet').onclick = async function () {
//         let names = document.getElementById('txtNames').value;
//         let LastNames = document.getElementById('txtLastNames').value;
//         let emailUser = document.getElementById('txtEmail').value;
//         let passwordUser = document.getElementById('txtPassword').value;
//         let identification = document.getElementById('txtIdentification').value;
//         let type = document.getElementById('txtType').value;
//         let telephone = document.getElementById('txtTelephone').value;
//         let landline = document.getElementById('txtLandline').value;
//         let address = document.getElementById('txtAddress').value;
//         let passwordModal = document.getElementById('txtPasswordModal').value;
//
//         if (names !== "" && LastNames !== "" && emailUser !== "" && passwordUser !== ""
//             && identification !== "" && telephone !== "" && address !== ""
//             && passwordModal !== "" && emailRegex.test(emailUser)) {
//             let userLogin = await user_login({
//                 "correo": email,
//                 "clave": passwordModal
//             }, false);
//             if (userLogin.status) {
//                 let valEmail = await queryPT('POST', validate_Email, {"email": emailUser}, false);
//                 if (!valEmail.status) {
//
//                     if (landline === "") {
//                         landline = null;
//                     }
//
//                     let res = await queryPT('POST', register_user, {
//                         "correo": emailUser,
//                         "clave": passwordUser,
//                         "rol": null,
//                         "identificacion": identification,
//                         "tipo": type,
//                         "nombres": names,
//                         "apellidos": LastNames,
//                         "telefono": telephone,
//                         "telefono_fijo": landline,
//                         "direccion": address
//                     }, false);
//                     if (res.status) {
//                         await llenarUsers();
//                         closeModal();
//                     } else {
//                         alert(res.message);
//                     }
//                 } else {
//                     alert(valEmail.message);
//                 }
//             } else {
//                 alert(userLogin.message);
//             }
//         } else {
//             alert('The values entered are not valid');
//         }
//     }
//
// }

async function record(codigo) {
    document.getElementById('titleModal').innerText = 'Record User'
    document.getElementById('modal_container').classList.add('show');

    document.getElementById('containerModal').innerHTML =
        '  <div class="container-fluid py-4 modal-dialog-scrollable navbar-nav-scroll">\n' +
        '        <div class="row">\n' +
        '            <div class="col-12">\n' +
        '                <div class="card mb-4">\n' +
        '                    <div class="card-header pb-0">\n' +
        '                    </div>\n' +
        '                    <div class="card-body px-0 pt-0 pb-2">\n' +
        '                    <h6 id="txtRecord"></h6>\n' +
        '                        <div class="table-responsive p-0">\n' +
        '                            <table id="tableRecord" class="table align-items-center mb-0 ">\n' +
        '                                <thead>\n' +
        '                                <tr>\n' +
        '                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">\n' +
        '                                        Event\n' +
        '                                    </th>\n' +
        '                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">\n' +
        '                                        Date\n' +
        '                                    </th>\n' +
        '                                </tr>\n' +
        '                                </thead>\n' +
        '                                <tbody>\n' +
        '                                </tbody>\n' +
        '                            </table>\n' +
        '                        </div>\n' +
        '                    </h2>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>' +
        '</div>' +
        '            <div class="col-12">\n' +
        '                    <button class="btn btn-outline-primary btn-sm " onclick="closeModal()">Close</button>\n' +
        '             </div>';

    const request = await fetch(history_user + codigo + '/' + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        location.reload();
    })

    const records = await request.json();

    let listHtml = '';
    for (let record of records) {
        let fila =
            "<tr><td> " + record.evento + "</td>" +
            "<td> " + record.fecha + "</td>" +
            "</tr>";

        listHtml += fila;
    }

    document.querySelector('#tableRecord tbody').outerHTML = listHtml;
    document.getElementById('txtRecord').innerText = records.length;
}
