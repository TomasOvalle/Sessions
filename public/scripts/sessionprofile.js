const template = (data) => `
    <div class="Container container-fluid ">
        <figure class="figure">
                <img style="width: 253px; height: 351px" class="img-fluid rounded" src="${data.photo}" alt="${data._id}" />
            <figcaption class="editorial figure-caption">${data.email}</figcaption>
            <figcaption class="titulo figure-caption">${data.age}</figcaption>
        </figure>
    </div>`;

/*document.querySelector("#SessionProfile").addEventListener("click", async () => {
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    };
})*/

/*
    fetch("/api/sessions")
    .then(res => res.json())
    .then(res => {
        console.log(res);
        const user = Array.isArray(res.response) ? res.response : [res.response];
        console.log(user);
        document.querySelector("#sessionprofile").innerHTML = user.map(each => template(each)).join("")
    })
    .catch(err => console.log(err));*/