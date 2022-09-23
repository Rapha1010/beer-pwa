let username = 'raphael';
let password = '123456';
let category = '';
let data_json;
let bfCategory = '';

var endPointUrlAddressLocal = "http://localhost:9081/api/itens";
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
    load_area.style.display = "block";
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

    let content = document.getElementById("content");
    loaded_elements = 0;
    content.innerHTML= '';
    load_area.style.display = "block";
    
    category = description.toLowerCase();
    printCard();
}

let load_area = document.getElementById("load-area");
let elements_per_load = 3;
let loaded_elements = 0;

//Print Card
function printCard() {

    let content = document.getElementById("content");
    let data_filter;

    if (category == bfCategory && category != '' ) return false;

    if (category != '') {
        data_filter = data_json.filter(d => category.includes(d.category));
    } else {
        data_filter = data_json;
    }

    let html_content = "";
    for(let i = loaded_elements; i < elements_per_load + loaded_elements; i++ ){
        html_content+=card(data_filter[i]);
    }

    loaded_elements = loaded_elements + elements_per_load;

    if (loaded_elements >= data_filter.length){
        loaded_elements = data_filter.length
        load_area.style.display = "none";
    }

    content.innerHTML+=html_content;
}


//Template Engine
card = function ({id, description, price, imageUrl}) {

    var url = window.location.origin;

    console.log(url);

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