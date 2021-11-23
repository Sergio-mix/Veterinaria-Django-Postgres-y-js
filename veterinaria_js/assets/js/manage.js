const API = 'http://127.0.0.1:8000/';

const validate_Email = API + 'api/usuario/email';
const login = API + 'api/usuario/login';
const register_user = API + 'api/usuario/save';
const user = API + 'api/usuario';

const all_tipo_User = API + 'api/tipo/all';


function doOpen(url) {
    document.location.target = "_blank";
    document.location.href = url;
}
