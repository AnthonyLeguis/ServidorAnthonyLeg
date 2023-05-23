//crear selectores
const formC = document.querySelector('#form-create');
const formL = document.querySelector('#form-login');
const loginInput = document.querySelector('#login-input');
const createInput = document.querySelector('#create-input');
const notificacion = document.querySelector('.notification');

formC.addEventListener('submit', async e=>{
    e.preventDefault();
    console.log('boton crear')
    const url = 'http://localhost:3000/usuarios'

    const response = await fetch(url,
        {method: 'GET'}
        );
    
    const users = await response.json();

    //voy a buscar el usuario que estoy colocando
    //en el campo del recurso de usuario
    const user = users.find(user=> user.username === createInput.value);

    //validacion 
    if(!createInput.value){
        //el campo esta vacio
        notificacion.innerHTML = "El campo de usuario no puede estar vacio";
        notificacion.classList.add('show-notification');
    }else if(user){
        //caso en el que el usuario exista
        notificacion.innerHTML = 'El usuario ya existe';
        notificacion.classList.add('show-notification');
    }else{
        //caso en el que el usuario no exista
        await fetch(url,{
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({username:createInput.value})
        });

        notificacion.innerHTML = `El usuario ${createInput.value} ha sido creado`;
        notificacion.classList.add('show-notification');
    }
})

formL.addEventListener('submit', async e =>{
    e.preventDefault();

    const response = await fetch('http://localhost:3000/usuarios',{method: 'GET'});
    const users = await response.json();
    
    const user = users.find(user => user.username === loginInput.value);
    console.log(user);

    if(!user){
        notificacion.innerHTML = 'El usuario no existe';
        notificacion.classList.add('show-notification');

        setTimeout(() => {
            notificacion.classList.remove('show-notification')
        }, 3000);
    }else{
        //console.log('el usuario existe')
        localStorage.setItem('user',JSON.stringify(user));
        window.location.href = '../tareas/tareas.html';

    }
})