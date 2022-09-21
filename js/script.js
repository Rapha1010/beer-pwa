let username = 'raphael';
let password = '123456';
let category = '';
let data_json;
let bfCategory = '';

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
    data_json = data;
    printCard(data);
}).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
});

menuCategory = function(description) {
    console.log(description);
    document.getElementById("catTitle").innerHTML = description || "Todas as Bebidas" ;
    bfCategory = category;
    category = description.toLowerCase();
    printCard();
}

let elements_per_load = 9;
let loaded_elements = 0;

//Print Card
function printCard() {

    let content = document.getElementById("content");
    let data_filter;
    count = 0;
    drink_amount = 10;

    if (category == bfCategory && category != '' ) return false;

    if (category != '')
        data_filter = data_json.filter(d => category.includes(d.category));
    else
        data_filter = data_json;

    content.innerHTML='';
    data_filter.forEach(element => {
        content.innerHTML+=card(element);
    });
}


//Template Engine
card = function ({id, description, price, imageUrl}) {

    return `<div class="col-4 col-md-4">
                <div class="card h-200" style="width: 7rem;">
                    <img src="${imageUrl}" class="card-img-top img-responsive" alt="...">
                <div class="card-body">
                <div class="card-title">${description} - R$ ${price}</div>
                <a onclick="findOneIten('${id}')" class="btn-comprar btn btn-warning">Comprar</a>
                </div>
                </div>
            </div>`;
}


function findOneIten(itenId) {
    url = "/src/pages/product.html";
    console.log(itenId);
    // return itenId;
}