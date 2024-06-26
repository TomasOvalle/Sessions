console.log(location);
const queries = new URL(location.href)
const uid = queries.searchParams.get("id")
console.log(uid);

const template = (data) => `
    <div class="Container container-fluid ">
        <figure class="figure">
                <img style="width: 253px; height: 351px" class="img-fluid rounded" src="${data.photo}" alt="${data._id}" />
            <figcaption class="editorial figure-caption">${data.email}</figcaption>
            <figcaption class="titulo figure-caption">${data.age}</figcaption>
        </figure>
    </div>`;

    async function fetchProfile() {
        try {
            let res = await fetch("/api/users/"+uid);
            res = await res.json();
            console.log(res);
            const users = Array.isArray(res.response) ? res.response : [res.response];
            console.log(users);
            document.getElementById("profile").innerHTML = users
                .map((each) => template(each))
                .join("")
        } catch (error) {
            console.log(error);
        }
    };

fetchProfile()