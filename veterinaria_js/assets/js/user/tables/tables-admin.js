llenarTablaColores();
llenarTablaRazas();
llenarTablaSpecies();
llenarPets();
llenarUsers();

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

    const colors = await request.json();

    let listHtml = '';
    for (let color of colors) {
        let fila =
            "<tr><td> " + color.nombre + "</td>" +
            "<td>" +
            "<button style=\"color: #ffd025\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openPetUpdate(" + color.id + ")'>Update</button>" +
            "<button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openRemoveColor(" + color.id + ",this" + ")'>" +
            "Remove</button>" +
            "</td></tr>";

        listHtml += fila;
    }

    document.querySelector('#tableColores tbody').outerHTML = listHtml;
}

function openRemoveColor(codigo, btn) {
    document.getElementById('titleTable').innerText = 'Remove Color'
    document.getElementById('modal_container_remove').classList.add('show');
}

async function llenarTablaRazas() {
    const request = await fetch(all_race_pet + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        alert('Process error');
        location.reload();
    })

    const races = await request.json();

    let listHtml = '';
    for (let race of races) {
        let fila =
            "<tr><td> " + race.nombre + "</td>" +
            "<td> " + race.tamanio + "</td>" +
            "<td>" +
            "<button style=\"color: #ffd025\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openPetUpdate(" + race.id + ")'>Update</button>" +
            "<button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openRemoveRace(" + race.id + ",this" + ")'>" +
            "Remove</button>" +
            "</td></tr>";

        listHtml += fila;
    }

    document.querySelector('#tableRace tbody').outerHTML = listHtml;
}

function openRemoveRace(codigo, btn) {
    document.getElementById('titleTable').innerText = 'Remove Race'
    document.getElementById('modal_container_remove').classList.add('show');
}

async function llenarTablaSpecies() {
    const request = await fetch(all_species_pet + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        alert('Process error');
        location.reload();
    })

    const races = await request.json();

    let listHtml = '';
    for (let race of races) {
        let fila =
            "<tr><td> " + race.nombre + "</td>" +
            "<td>" +
            "<button style=\"color: #ffd025\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openPetUpdate(" + race.id + ")'>Update</button>" +
            "<button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openRemoveSpecies(" + race.id + ",this" + ")'>" +
            "Remove</button>" +
            "</td></tr>";

        listHtml += fila;
    }

    document.querySelector('#tableSpecies tbody').outerHTML = listHtml;
}

function openRemoveSpecies(codigo, btn) {
    document.getElementById('titleTable').innerText = 'Remove Species'
    document.getElementById('modal_container_remove').classList.add('show');
}

async function llenarPets() {
    const request = await fetch(all_pet + id, {
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
        let sexo = '';

        if (pet.sexo === 'M') {
            sexo = 'Male'
        } else {
            sexo = 'Famale'
        }

        let microchip = '';

        if (pet.microchip === null) {
            microchip = 'undefined'
        } else {
            microchip = pet.microchip;
        }

        let fila =
            "<tr><td> " + microchip + "</td>" +
            "<td> " + pet.nombre + "</td>" +
            "<td> " + pet.color + "</td>" +
            "<td> " + pet.especie + "</td>" +
            "<td> " + pet.raza + "</td>" +
            "<td> " + pet.tamanio + "</td>" +
            "<td> " + pet.fecha_nacimiento + "</td>" +
            "<td> " + sexo + "</td>" +
            "<td>" +
            "<button style=\"color: #ffd025\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openPetUpdate(" + pet.id + ")'>Update</button>" +
            "<button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openRemovePets(" + pet.id + ",this" + ")'>" +
            "Remove</button>" +
            "<button style=\"color: rgba(0,255,82,0.61)\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openPetUpdate(" + pet.id + ")'>Queries</button>" +
            "</td></tr>";

        listHtml += fila;
    }

    document.querySelector('#tablePets tbody').outerHTML = listHtml;
}

function openRemovePets(codigo, btn) {
    document.getElementById('titleTable').innerText = 'Remove Pet'
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
        alert('Process error');
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
            "onclick='openRemovePets(" + user.id + ",this" + ")'>" +
            "Remove</button>" +
            "<button style=\"color: rgb(0,167,255)\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='openPetUpdate(" + user.id + ")'>Record</button>" +
            "</td></tr>";

        listHtml += fila;
    }

    document.querySelector('#tableUser tbody').outerHTML = listHtml;
}

function closeRemove() {
    document.getElementById('modal_container_remove').classList.remove('show');
    document.getElementById('txtPasswordRemove').value = '';
}