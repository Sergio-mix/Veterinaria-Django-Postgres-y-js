tipoId();
document.getElementById('txtEmail').value = sessionStorage.getItem('email');


async function register() {
    let nombres = document.getElementById('txtName').value;
    let apellidos = document.getElementById('txtName').value;
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

        let res = await registerUser(user);

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

function registerUser(user) {
    return new Promise(resolve => {
        return resolve(
            fetch(register_user, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(user)
            }).then(res => res.json()).then(res => {
                return res;
            }).catch(err => {
                alert('Process error');
                location.reload();
            })
        );
    });
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