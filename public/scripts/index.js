const template = (data) => `
    <div class="Container container-fluid ">
        <figure class="figure">
            <a href="../pages/details.html?id=${data._id}">
                <img style="width: 253px; height: 351px" class="img-fluid rounded" src="${data.photo}" alt="${data._id}" />
            </a>
            <figcaption class="editorial figure-caption">${data.publisher}</figcaption>
            <figcaption class="titulo figure-caption">${data.title}</figcaption>
            <figcaption class="precio figure-caption">${data.price}</figcaption>
            <button type="button" class="btn btn-primary" onclick="addToCart('${data._id}')">Add to cart</button>
        </figure>
    </div>`;

async function fetchIndex() {
    try {
        let res = await fetch("/api/products");
        res = await res.json();
        console.log(res);
        const products = Array.isArray(res.response) ? res.response : [res.response];
        console.log(products);
        document.getElementById("products").innerHTML = products
            .map((each) => template(each))
            .join("")
    } catch (error) {
        console.log(error);
    }
}

fetchIndex();

async function addToCart(pid) {
    try {
        let response = await fetch("/api/sessions/online");
        response = await response.json();
        const user_id = response.user_id;
        if (user_id) {
            const data = {
                //user_id,
                product_id: pid,
                quantity: 1
            };
            const url = "/api/carts"
            const opts = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-Type" : "application/json"}
            };
            console.log(data);
            let response = await fetch(url, opts)
            response = await response.json()
            console.log(response);
        } else {
            console.log(user_id);
        }
    } catch (error) {
        console.log(error);
    }
}




/*async function addToCart(pid) {
    try {
        const data = {
            user_id: "66300e78465a634dfd0105df",
            product_id: pid,
            quantity: 1
        }
        const url = "/api/carts"
        const opts = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type" : "application/json"}
        }
        console.log(data);
        let response = await fetch(url, opts)
        response = await response.json()
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}*/


/*fetch("/api/products")
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
        const products = Array.isArray(res) ? res : [res];
        console.log(products);
        document.getElementById("products").innerHTML = products
            .map((each) => template(each))
            .join("")
    })
    .catch((err) => console.log(err));*/
