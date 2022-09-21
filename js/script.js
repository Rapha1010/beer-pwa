const nav = document.querySelector("header");
let lastScrollY = window.scrollY;
console.log(lastScrollY);

window.addEventListener("scroll", () => {

    if (lastScrollY < window.scrollY) {
        nav.style["opacity"] = 1;
        for (let scroll = 0; scroll < 100; scroll += 10) {
            if (window.scrollY > scroll) {
                nav.style["opacity"] -= 0.1;
            }
        }
    } else {
        nav.style["opacity"] = 1;
    }

    lastScrollY = window.scrollY;

})


let username = 'raphael';
let password = '123456';

var endPointUrlAddressLocal = "http://localhost:8081/api/itens";
var endPointUrlAddress = "https://deliveryfoodapi.herokuapp.com/api/itens";

var auth = "Basic " + btoa(username + ":" + password);

var myInit = {
    method: 'GET',
    headers: {
        'Authorization': auth
    },
    mode: 'cors',
};


var allItens = fetch(endPointUrlAddressLocal, myInit).then(function (response) {
    return response.json();
}).then(function (data) {
    printCard(data);
}).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
});




//Print Card
function printCard(data) {

    let content = document.getElementById("content");

    data.forEach(element => {
        content.innerHTML+=card(element);
    });
}

function findOneIten(itenId) {
    url = "/src/pages/product.html";
    console.log(itenId);
    // return itenId;
}


//Template Engine
card = function ({id, description, price, imageUrl}) {

    return `<div class="col-4 col-md-4">
                <div class="card" style="width: 7rem;">
                    <img src="${imageUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${description} - R$ ${price}</h5>
                <a onclick="findOneIten('${id}')" class="btn-comprar btn btn-warning">Comprar</a>
                </div>
                </div>
            </div>`;
}
