tipoId();
tipoQuery();
let services;
tipeService().then(r => services = r);
let listService = [];

document.getElementById('txtPetWeight').value = sessionStorage.getItem('peso');
document.getElementById('txtTypeQuery').value = sessionStorage.getItem('type');
document.getElementById('txtDescription').value = sessionStorage.getItem('description');
document.getElementById('txtNumerId').value = sessionStorage.getItem('numberId');

function selectPrice() {
    let r = document.getElementById('txtService').value;

    let rate = '';
    for (let service of services) {
        if (service.id === +r) {
            rate = service.tarifa;
            break;
        }
    }

    document.getElementById('txtPrice').innerText = rate;
}

function addService() {
    let r = document.getElementById('txtService').value;

    let ser = '';
    for (let service of services) {
        if (service.id === +r) {
            ser = service;
            break;
        }
    }

    let listHtml = '';

    if (ser.descripcion === null) {
        ser.descripcion = '';
    }

    let fila =
        "<tr>" +
        "<td> " + ser.nombre + "</td>" +
        "<td> " + ser.tarifa + "</td>" +
        "<td> " + ser.descripcion + "</td>" +
        "<td>" +
        " <button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
        "onclick='removeService(" + ser.id + ",this" + ")'>" +
        "Remove</button>" +
        "</td> " +
        "</tr>";

    listService.push(ser);

    listHtml += fila;

    document.querySelector('#tableService tbody').outerHTML += listHtml;
    sumList();
}

function removeService(codigo, btn) {
    let aux = 0;
    for (let a of listService) {
        if (a.id === codigo) {
            listService.splice(aux, 1);
            let row = btn.parentNode.parentNode;
            row.parentNode.removeChild(row);
            sumList();
            break;
        }
        aux++;
    }

}

function sumList() {
    let sum = 0;
    for (let i of listService) {
        sum += i.tarifa;
    }

    document.getElementById('txtTotalCost').value = sum;
}

async function registerInvoice() {
    let weight = document.getElementById('txtPetWeight').value;
    let type = document.getElementById('txtTypeQuery').value;
    let description = document.getElementById('txtDescription').value;
    let totalCost = document.getElementById('txtTotalCost').value;
    let additional = document.getElementById('txtAdditional').value;
    let waytopay = document.getElementById('txtWaytopay').value;
    let idPet = sessionStorage.getItem('idPet');

    if (listService.length !== 0) {

        if (description === "") {
            description = null;
        }

        let query = {
            "mascota": parseInt(idPet),
            "peso": weight,
            "tipo": type,
            "fecha": null,
            "descripcion": description,
        }

        
        let res = await queryPT('POST', register_Query_pet + id, query, false);

    } else {
        alert('There are no associated services');
    }

}



