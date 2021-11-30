reports();

async function reports() {
    let f = date();
    document.getElementById('txtDatePets').innerText = f;
    document.getElementById('txtDateUsers').innerText = f;
    document.getElementById('txtDataInvoices').innerText = f;
    document.getElementById('txtDataService').innerText = f;
    document.getElementById('txtDataRecord_service').innerText = f;

    let numUser = await queryGD('GET', numUsers + id, false);
    document.getElementById('txtNumUsers').innerText = numUser;

    let numPet = await queryGD('GET', numPets + id, false);
    document.getElementById('txtNumPets').innerText = numPet;

    let numService = await queryGD('GET', numServices + id, false);
    document.getElementById('txtNumService').innerText = numService;

    let num_Complete = await queryGD('GET', numComplete + id, false);
    document.getElementById('txtNumComplete').innerText = num_Complete;
}

function date() {
    let f = new Date();
    return f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
}

async function pdfPets() {
    document.getElementById('load_modal').classList.add('show');
    let pets = await queryGD('GET', all_pet + id, false);
    let list = []
    for (let pet of pets) {
        list.push([pet.usuario, pet.microchip,
            pet.nombre, pet.color, pet.especie,
            pet.raza, pet.tamanio, pet.fecha_nacimiento])
    }


    pdf('Mascotas',
        ['USER', 'MICROCHIP', 'PET', 'COLOUR', 'SPECIES', 'DATE OF BIRTH', 'SEX'],
        list);
    document.getElementById('load_modal').classList.remove('show');
}

async function pdfUsers() {
    document.getElementById('load_modal').classList.add('show');
    let users = await queryGD('GET', user_all + id, false);
    let list = []
    for (let user of users) {
        list.push([user.correo, user.identificacion,
            user.nombres, user.apellidos, user.telefono,
            user.telefono_fijo, user.direccion])
    }


    pdf('Usuarios',
        ['EMAIL', 'ID', 'NAMES', 'LASTNAMES', 'TELEPHONE', 'LANDLINE', 'ADDRESS'],
        list);
    document.getElementById('load_modal').classList.remove('show');
}

async function pdfFacturas() {
    document.getElementById('load_modal').classList.add('show');
    let invoices = await queryGD('GET', all_Invoice + id, false);
    let list = []
    for (let invoice of invoices) {

        let services = []

        for (let s of invoice.lista) {
            services.push(s.servicio)
        }

        list.push([invoice.usuario, invoice.mascota,
            invoice.costo_total, invoice.forma_pago, invoice.fecha,
            services])
    }


    pdf('Facturas',
        ['USER', 'PET', 'COST', 'WAY TO PAY', 'DATE', 'SERVICES'],
        list);
    document.getElementById('load_modal').classList.remove('show');
}

async function pdfServices() {
    document.getElementById('load_modal').classList.add('show');
    let services = await queryGD('GET', all_service + id, false);
    let list = []
    for (let service of services) {
        list.push([service.nombre, service.tarifa,
            service.descripcion])
    }


    pdf('Servicios',
        ['NAME', 'RATE', 'DESCRIPTION'],
        list);
    document.getElementById('load_modal').classList.remove('show');
}

async function pdfDataRecord_service() {
    document.getElementById('load_modal').classList.add('show');
    let services = await queryGD('GET', all_record_service_all + id, false);
    let list = []
    for (let service of services) {
        list.push([service.nombre, service.fecha,
            service.tarifa])
    }


    pdf('Historial Servicios',
        ['NAME', 'Date', 'RATE'],
        list);
    document.getElementById('load_modal').classList.remove('show');
}

function pdf(title, head, body) {
    const fecha = date();
    const doc = new jsPDF();
    doc.setFontSize(18)
    doc.text(95, 10, title)
    doc.setFontSize(14)
    doc.text(95, 20, fecha)
    doc.autoTable({html: '#my-table'})

    doc.autoTable({
        head: [head],
        body: body
    })

    doc.setProperties({
        title: title + ' ' + fecha
    });

    window.open(doc.output('bloburl', {filename: 'myFileName.pdf'}), '_blank');
}
