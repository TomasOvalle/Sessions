const socket = io()

let nickname = ""
let allMessages = []

Swal.fire({
    title: "Write your nickname",
    input: "text",
    allowOutsideClick: false,
    inputValidator: value => !value && "Write your nickname"
}).then( data => {
    nickname = data.value
    document.querySelector("#nickname").innerHTML = nickname
    socket.emit("nickname", nickname)
})

socket.on("messages", messages => {
    allMessages = messages 
    document.querySelector("#allMessages").innerHTML = messages.map(each => each).join("")
})

document.querySelector("#message").addEventListener("keyup", event => {
    if(event.key == "Enter") {
        const message = `<p <span${nickname}: </span> ${event.target.value}</p>`
        allMessages.push(message)
        socket.emit("all messages", allMessages)
        event.target.value = ""
    }
})