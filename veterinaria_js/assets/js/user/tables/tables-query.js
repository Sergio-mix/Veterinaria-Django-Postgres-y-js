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