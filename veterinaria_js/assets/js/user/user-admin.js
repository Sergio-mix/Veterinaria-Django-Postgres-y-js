id = sessionStorage.getItem('id')
email = sessionStorage.getItem('email')
data();

async function data() {
    let user = await queryPT('POST', user_get, {"id": id}, true);
    if (user.status) {
        document.getElementById('userNameAdmin').innerText = user.nombres;
    } else {
        alert(user.message);
        doOpen('sign-in.html');
    }
}