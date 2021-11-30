reports();

async function reports() {
    let numUser = await queryGD('GET', numUsers + id, false);
    document.getElementById('txtNumUsers').innerText = numUser;

    let numPet = await queryGD('GET', numPets + id, false);
    document.getElementById('txtNumPets').innerText = numPet;

    let numService = await queryGD('GET', numServices + id, false);
    document.getElementById('txtNumService').innerText = numService;

    let num_Complete = await queryGD('GET', numComplete + id, false);
    document.getElementById('txtNumComplete').innerText = num_Complete;
}
