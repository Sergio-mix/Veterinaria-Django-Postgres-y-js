const API = 'http://127.0.0.1:8000/';

const validate_Email = API + 'api/usuario/email';
const login = API + 'api/usuario/login';
const register_user = API + 'api/usuario/save';
const user_get = API + 'api/usuario';
const user_all = API + 'api/usuario/all/';
const typeDocument_all = API + 'api/tipo/all';

const all_tipo_User = API + 'api/tipo/all';
const update_user = API + 'api/usuario/update/';
const all_pet = API + 'api/mascota/all/';
const get_pet = API + 'api/mascota/byid/';
const save_pet = API + 'api/mascota/save/';


const all_species_pet = API + 'api/especie/all/';
const remove__pet = API + 'api/mascota/remove/';
const update__pet = API + 'api/mascota/update/';

const all_colors_pet = API + 'api/color/all/';
const register_color = API + 'api/color/save/';
const remove_color = API + 'api/color/remove/';
const getByid_color = API + 'api/color/byid/';
const update_Color = API + 'api/color/update/';

const all_race_pet = API + 'api/raza/all/';
const getByid_race = API + 'api/raza/byid/';
const register_Race = API +'api/raza/save/';
const remove_Race = API + 'api/raza/remove/';
const update_Race = API + 'api/raza/update/';

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


function doOpen(url) {
    document.location.target = "_blank";
    document.location.href = url;
}
