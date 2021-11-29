//----------------------------------- Record -----------------------------------------------
async function llenarTablaRecord() {
    const request = await fetch(all_record_service_all + id, {
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
            "<tr>" +
            "<td> " + record.nombre + "</td>" +
            "<td> " + record.fecha + "</td>" +
            "<td> " + record.tarifa + "</td>" +
            "</tr>";

        listHtml += fila;
    }

    document.querySelector('#tableRecord tbody').outerHTML = listHtml;
    document.getElementById('txtRecord').innerText = records.length;
}