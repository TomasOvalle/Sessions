document.querySelector("#register").addEventListener("click", async () => {
    const data = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
        photo: document.querySelector("#photo").value,
        age: document.querySelector("#age").value,
    };
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
    console.log(data);
    let response = await fetch("/api/sessions/register", opts);
    response = await response.json();
    console.log(response);
    if (response.statusCode === 201) {
        Swal.fire({
            title: response.message,
            icon: "success",
            timer: 5000,
            timerProgressBar: true,
            confirmButtonColor: "#ff3b3c",
        });
        //return location.replace("/login.html");
    }
    return Swal.fire({
        title: response.message,
        icon: "error",
        timer: 50000,
        timerProgressBar: true,
        confirmButtonColor: "#ff3bc"
    });
});