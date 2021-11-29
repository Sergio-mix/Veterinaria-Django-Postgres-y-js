llenarTablaService();

//-----------------------------------------------------------------------------------------
function closeModal() {
    document.getElementById('modal_container').classList.remove('show');
}

function closeRemove() {
    document.getElementById('modal_container_remove').classList.remove('show');
    document.getElementById('txtPasswordRemove').value = '';
}