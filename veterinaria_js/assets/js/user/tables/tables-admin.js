llenarTablaColores();

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

    const pets = await request.json();

    let listHtml = '';
    for (let pet of pets) {
        let fila =
            "<tr><td> " + pet.microchip + "</td>" +
            "<td> " + pet.nombre + "</td>" +
            "<td> " + pet.color + "</td>" +
            "<td> " + pet.especie + "</td>" +
            "<td> " + pet.raza + "</td>" +
            "<td> " + pet.tamanio + "</td>" +
            "<td> " + pet.fecha_nacimiento + "</td>" +
            "<td>" +
            "<button style=\"color: #ffd025\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openPetUpdate(" + pet.id + ")'>Update</button>" +
            "<button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openPetRemove(" + pet.id + ",this" + ")'>" +
            "Remove</button>" +
            "</td></tr>";

        listHtml += fila;
    }

    document.querySelector('#table_pet tbody').outerHTML = listHtml;
}