//-----------------------------------------------------------------------------------------
llenarTablaDocumentType();
llenarUsers();
//-----------------------------------------------------------------------------------------
function closeModal() {
    document.getElementById('modal_container').classList.remove('show');
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



function closeRemove() {
    document.getElementById('modal_container_remove').classList.remove('show');
    document.getElementById('txtPasswordRemove').value = '';
}