tipoId();
llenarQuery();

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

    const query = await request.json();
    document.getElementById('txtNumQuerie').innerText = query.length;

    let listHtml = '';
    for (let q of query) {
        let fila =
            "<tr><td> " + q.mascota + "</td>" +
            "<td> " + q.usuario + "</td>" +
            "<td> " + q.peso + ' Kg' + "</td>" +
            "<td> " + q.tipo + "</td>" +
            "<td> " + q.fecha + "</td>" +
            "</tr>";

        listHtml += fila;
    }

    document.querySelector('#tableQueries tbody').outerHTML = listHtml;
}

async function openAdd() {
    let numerId = document.getElementById('txtNumerId').value;
    let type = document.getElementById('txtType').value;

    if (numerId !== "") {
        document.getElementById('containerModal').innerHTML =
            '  <div class="container-fluid py-4 modal-dialog-scrollable navbar-nav-scroll">\n' +
            '        <div class="row">\n' +
            '            <div class="col-12">\n' +
            '                <div class="card mb-4">\n' +
            '                    <div class="card-header pb-0">\n' +
            '                    </div>\n' +
            '                    <div class="card-body px-0 pt-0 pb-2">\n' +
            '                        <div class="table-responsive p-0">\n' +
            '                            <table id="tablePet" class="table align-items-center mb-0 ">\n' +
            '                                <thead>\n' +
            '                                <tr>\n' +
            '                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">\n' +
            '                                        Name\n' +
            '                                    </th>\n' +
            '                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">\n' +
            '                                        Race\n' +
            '                                    </th>\n' +
            '                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">\n' +
            '                                        #\n' +
            '                                    </th>\n' +
            '                                </tr>\n' +
            '                                </thead>\n' +
            '                                <tbody>\n' +
            '                                </tbody>\n' +
            '                            </table>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>' +
            '            <div class="col-12">\n' +
            '                    <button class="btn btn-outline-primary btn-sm " onclick="closeModal()">Close</button>\n' +
            '             </div>';

        let validate = await queryPT('POST', user_exists + id, {
            "id": numerId,
            "tipo": type
        }, false);


        if (!validate.status) {
            alert('There are no registered users with this identification');
            return;
        }

        document.getElementById('titleModal').innerText = 'Pet';
        document.getElementById('modal_container').classList.add('show');

        const request = await fetch(all_pet + id + '/' + validate.id, {
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
            let fila =
                "<tr><td> " + pet.nombre + "</td>" +
                "<td> " + pet.raza + "</td>" +
                "<td>" +
                "<button style=\"color: rgba(0,255,82,0.61)\" class=\"btn btn-sm btn-neutral\" " +
                "onclick='registerQuery(" + pet.id + ")'>Query</button>" +
                "<button style=\"color: rgba(171,35,98,0.61)\" class=\"btn btn-sm btn-neutral\" " +
                "onclick='registerService(" + pet.id + ")'>Service</button>" +
                "</td>" +
                "</tr>";

            listHtml += fila;
        }

        document.querySelector('#tablePet tbody').outerHTML = listHtml;
    } else {
        alert('The identification field is required');
    }
}

function registerQuery(codigo) {
    let weight = document.getElementById('txtPetWeight').value;
    let description = document.getElementById('txtDescription').value;
    let typeQuery = document.getElementById('txtTypeQuery').value;

    if (description === "") {
        description = null;
    }

    let query = {
        "mascota": codigo,
        "peso": weight,
        "tipo": typeQuery,
        "fecha": null,
        "descripcion": description,
    }

    document.getElementById('titleModal').innerText = 'Authentication';

    document.getElementById('containerModal').innerHTML =
        '           <div class="row g-3">\n' +
        '                <div class="col-12">\n' +
        '                    <div class="form-group label-floating">\n' +
        '                        <label for="txtPasswordRemove" class="form-label">Current password</label>\n' +
        '                        <input class="form-control" type="password" id="txtPasswordAuthentication">\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="col-12">\n' +
        '                    <button id="onClickQuery" type="button" class="btn btn-primary">Ok</button>\n' +
        '                    <button class="btn btn-outline-primary btn-sm " onclick="closeModal()">Close</button>\n' +
        '                </div>\n' +
        '            </div>';

    document.getElementById('onClickQuery').onclick = async function () {
        let userLogin = await user_login({
            "correo": email,
            "clave": document.getElementById('txtPasswordAuthentication').value
        }, false);
        if (userLogin.status) {
            let res = await queryPT('POST', register_Query_pet + id, query, false);
            if (res.status) {
                closeModal();
                await llenarQuery();
            } else {
                alert(res.message);
            }
        } else {
            alert(userLogin.message);
        }
    }
}

function registerService(codigo){

    document.getElementById('titleModal').innerText = 'Services';

    document.getElementById('containerModal').innerHTML =
        '           <div class="row g-3">\n' +
        '                <div class="col-12">\n' +
        '                    <div class="form-group label-floating">\n' +
        '                        <label for="txtPasswordRemove" class="form-label">Current password</label>\n' +
        '                        <input class="form-control" type="password" id="txtPasswordAuthentication">\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="col-12">\n' +
        '                    <button id="onClickQuery" type="button" class="btn btn-primary">Ok</button>\n' +
        '                    <button class="btn btn-outline-primary btn-sm " onclick="closeModal()">Close</button>\n' +
        '                </div>\n' +
        '            </div>';
}

function closeModal() {
    document.getElementById('modal_container').classList.remove('show');
}