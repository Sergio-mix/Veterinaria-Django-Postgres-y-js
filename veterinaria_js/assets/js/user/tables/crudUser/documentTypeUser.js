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