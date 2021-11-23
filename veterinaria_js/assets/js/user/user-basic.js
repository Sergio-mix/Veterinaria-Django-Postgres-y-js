id = sessionStorage.getItem('id')
data();

async function data() {
    const us = {id: id}
    let user = await userData(us);
    if (user.status) {
        document.getElementById('txtName').innerText = user.user.nombres;
    } else {
        alert(user.message);
        doOpen('sign-in.html');
    }
}

function userData(user) {
    return new Promise(resolve => {
        return resolve(
            fetch(user, {
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