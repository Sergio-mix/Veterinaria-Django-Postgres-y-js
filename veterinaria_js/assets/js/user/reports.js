reports();

async function reports() {
    let f = date();
    document.getElementById('txtDatePets').innerText = f;

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
    let pets = await queryGD('GET', all_pet + id, false);
    let list = []
    for (let pet of pets) {
        list.push([pet.usuario, pet.microchip,
            pet.nombre, pet.color, pet.especie,
            pet.raza, pet.tamanio, pet.fecha_nacimiento])
    }


    pdf('Mascotas',
        ['USER', 'MICROCHIP', 'MICROCHIP', 'COLOUR', 'SPECIES', 'DATE OF BIRTH', 'SEX'],
        list);
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

    doc.save(title + '_' + fecha + '.pdf');
}