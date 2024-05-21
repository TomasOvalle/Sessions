async function printIcons() {
    let template = ``
    let online = await fetch("/api/sessions/online")
    online = await online.json()
    if (online.statusCode === 200) {
        template = ``
    }
}

//Falta la logica para que al iniciar sesión se renderize cierto contenido y desaparezca otro.
//fetch, etc...


