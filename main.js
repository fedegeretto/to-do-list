const tareaNueva = document.querySelector('.agregar-tarea input');
const listaDeTareas = document.querySelector('.lista-de-tareas ul');
const aviso = document.querySelector('.lista-de-tareas');
let tareas = [];

function agregarTarea(){
    const tarea = tareaNueva.value;
    if (tarea === '') {
        mostrarError('Por favor, agregue una tarea');
        return
    }

    const objetoTareas = {
        tarea,
        id: Date.now()
    }
    tareas = [...tareas, objetoTareas];

    agregarHTML();

    tareaNueva.value = '';
}

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('mensaje-error');
    aviso.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function agregarHTML(){

    limpiarHTML();

    if (tareas.length > 0) {
        tareas.forEach(tarea => {
            const li = document.createElement('li');
            li.innerHTML = `${tarea.tarea} <i tarea-id=${tarea.id} class="fa-solid fa-trash"></i>`
            listaDeTareas.appendChild(li);
        });
    }

    guardarStorage();
}

function limpiarHTML(){
    listaDeTareas.innerHTML = '';
}

function guardarStorage(){
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

recuperarStorage();

function recuperarStorage(){
    document.addEventListener('DOMContentLoaded', () => {
        tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        console.log(tareas);
        agregarHTML();
    })
}

eliminarTarea();

function eliminarTarea(){
    listaDeTareas.addEventListener('click', borrarTarea);
}

function borrarTarea(e){
    if (e.target.tagName == 'I') {
        console.log(e.target);
        const borrarId = parseInt(e.target.getAttribute('tarea-id'));
        tareas = tareas.filter(tarea => tarea.id !== borrarId);
        agregarHTML();
    }
}

function eliminarTodo(){
    tareas = [];
    agregarHTML();
}