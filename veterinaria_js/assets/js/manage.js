const API = 'http://127.0.0.1:8000/';

const validate_Email = API + 'api/usuario/email';
const login = API + 'api/usuario/login';
const register_user = API + 'api/usuario/save';
const user_get = API + 'api/usuario/byid';
const user_all = API + 'api/usuario/all/';
const user_exists = API + 'api/usuario/existing/';
const update_user = API + 'api/usuario/update/';

const typeDocument_all = API + 'api/tipo/all';
const all_tipo_User = API + 'api/tipo/all';

const all_pet = API + 'api/mascota/all/';
const get_pet = API + 'api/mascota/byid/';
const save_pet = API + 'api/mascota/save/';
const remove__pet = API + 'api/mascota/remove/';
const update__pet = API + 'api/mascota/update/';

const all_colors_pet = API + 'api/color/all/';
const register_color = API + 'api/color/save/';
const remove_color = API + 'api/color/remove/';
const getByid_color = API + 'api/color/byid/';
const update_Color = API + 'api/color/update/';

const all_race_pet = API + 'api/raza/all/';
const getByid_race = API + 'api/raza/byid/';
const register_Race = API + 'api/raza/save/';
const remove_Race = API + 'api/raza/remove/';
const update_Race = API + 'api/raza/update/';

const all_species_pet = API + 'api/especie/all/';
const getByid_species = API + 'api/especie/byid/';
const register_species = API + 'api/especie/save/'
const remove_species = API + 'api/especie/remove/';
const update_species = API + 'api/especie/update/';

const all_query = API + 'api/consulta/all/';


function user_login(user, error) {
    return new Promise(resolve => {
        return resolve(
            fetch(login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(user)
            }).then(res => res.json()).then(res => {
                return res;
            }).catch(err => {
                if (error) {
                    doOpen('sign-in.html');
                } else {
                    location.reload();
                }
            })
        );
    });
}


function queryPT(type, url, object, error) {
    return new Promise(resolve => {
        return resolve(
            fetch(url, {
                method: type,
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(object)
            }).then(res => res.json()).then(res => {
                return res;
            }).catch(err => {
                if (error) {
                    doOpen('sign-in.html');
                } else {
                    location.reload();
                }
            })
        );
    });
}

function queryGD(type, url, error) {
    return new Promise(resolve => {
        return resolve(
            fetch(url, {
                method: type,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(res => {
                return res;
            }).catch(err => {

                if (error) {
                    doOpen('sign-in.html');
                } else {
                    location.reload();
                }
            })
        );
    });
}

async function colors() {
    const request = await fetch(all_colors_pet + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        location.reload();
    });

    const colors = await request.json();

    for (let color of colors) {
        document.getElementById('txtColour').innerHTML +=
            "<option value='" + color.id + "'>" + color.nombre + "</option>";
    }
}

async function race() {
    const request = await fetch(all_race_pet + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        location.reload();
    });

    const races = await request.json();

    for (let race of races) {
        document.getElementById('txtRace').innerHTML +=
            "<option value='" + race.id + "'>" + race.nombre + "</option>";
    }
}

async function species() {
    const request = await fetch(all_species_pet + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        location.reload();
    });

    const species = await request.json();

    for (let specie of species) {
        document.getElementById('txtSpecies').innerHTML +=
            "<option value='" + specie.id + "'>" + specie.nombre + "</option>";

    }
}

async function tipoId() {
    const request = await fetch(all_tipo_User, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        alert('Process error');
        location.reload();
    });

    const tipos = await request.json();

    for (let tipo of tipos) {
        document.getElementById('txtType').innerHTML +=
            "<option value='" + tipo.id + "'>" + tipo.nombre + "</option>";
    }
}

function capitalizar(sr) {
    let s = sr.toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function doOpen(url) {
    document.location.target = "_blank";
    document.location.href = url;
}
