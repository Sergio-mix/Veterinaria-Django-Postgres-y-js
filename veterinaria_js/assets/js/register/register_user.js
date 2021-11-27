tipoId();
document.getElementById('txtEmail').value = sessionStorage.getItem('email');


async function register() {
    let nombres = document.getElementById('txtName').value;
    let apellidos = document.getElementById('txtLastname').value;
    let identificacion = document.getElementById('txtId').value;
    let tipo = document.getElementById('txtType').option;
    let telefono = document.getElementById('txtTelephone').value;
    let telefonoFijo = document.getElementById('txtLandline').value;
    let address = document.getElementById('txtAddress').value;

    if (telefonoFijo === "") {
        telefonoFijo = null;
    }

    if (nombres !== "" && apellidos !== "" && identificacion !== "" && telefono !== "" && tipo !== null) {
        const user = {
            "correo": sessionStorage.getItem('email'),
            "clave": sessionStorage.getItem('password'),
            "rol": null,
            "identificacion": identificacion,
            "tipo": document.getElementById('txtType').value,
            "nombres": nombres,
            "apellidos": apellidos,
            "telefono": telefono,
            "telefono_fijo": telefonoFijo,
            "direccion": address
        }

        let res = await queryPT('POST', register_user, user, false);

        if (res) {
            alert(res.message);
            doOpen('sign-in.html');
        } else {
            alert(res.message);
        }
    } else {
        alert('The values entered are not valid');
    }
}