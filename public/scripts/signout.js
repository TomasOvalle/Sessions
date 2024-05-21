document.querySelector("#SignOut").addEventListener("click", async () => {
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    };
    let response = await fetch("/api/sessions/signout", opts);
    response = await response.json();
    console.log(response);
    if (response.statusCode === 200) {
        location.replace("/pages/index.html")
    }
})