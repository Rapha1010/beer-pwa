let username = 'raphael';
let password = '123456';
let category = '';
let data_json;
let bfCategory = '';

var endPointUrlAddressLocal = "http://localhost:9081/api/itens";
var endPointUrlAddress = "https://deliveryfoodapi.herokuapp.com/api/itens";
var file = "/../data_json.json";

var auth = "Basic " + btoa(username + ":" + password);

var myInit = {
    method: 'GET',
    headers: {
        'Authorization': auth
    },
    mode: 'cors',
}; 


var allItens = fetch(file, myInit).then(function (response) {
    return response.json();
}).then(function (data) {
    load_area.style.display = "block";
    data_json = data;
    cache_dinamico_json();
    printCard();
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
    elements_per_load = 3;
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

    let final = loaded_elements + elements_per_load;

    if (final > data_filter.length) final = data_filter.length;

    let html_content = "";
    for(let i = loaded_elements; i < final; i++ ){
        html_content+=card(data_filter[i]);
    }

    loaded_elements = loaded_elements + elements_per_load;

    if (loaded_elements >= data_filter.length){
        loaded_elements = data_filter.length
        load_area.style.display = "none";
    }

    content.innerHTML+=html_content;
}

/*
#
# Cache Dinâmico (json / imgs)
#
*/
var cache_dinamico_json = function(){
    localStorage['BEERAPP'] = JSON.stringify(data_json);
}


//Template Engine
card = function ({id, description, price, imageUrl}) {

    var url = window.location.origin;

    return `<div class="col-4 d-flex align-items-stretch">
                <div class="card">
                    <img src="${url}/beer-pwa/img/itens/${imageUrl}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <div class="card-title">${description}</div>
                        <div class="card-price">R$ ${price}</div>
                    </div>
                    <a onclick="findOneIten('${id}')" class="btn-comprar btn btn-warning">Comprar</a>
                </div>
            </div>`;
}


function findOneIten(itenId) {
    url = "/src/pages/product.html";
    console.log(itenId);
    // return itenId;
}

/*
#
# Botao de Instalação
#
*/

let janelaInstalacao = null;

const btInstall = document.getElementById("btInstall");

window.addEventListener('beforeinstallprompt', gravarJanela);

function gravarJanela(evt){
    janelaInstalacao = evt;
}

let inicializarInstalacao = function(){

    setTimeout(function() {
        if(janelaInstalacao != null) 
            btInstall.removeAttribute("hidden");
    },500)

    btInstall.removeAttribute("hidden");
    btInstall.addEventListener("click", function(){

        btInstall.setAttribute("hidden", true);

        janelaInstalacao.prompt();

        janelaInstalacao.userChoice.then((choice) => {

            if(choice.outcome === 'accepted'){
                console.log("Usuário fez a instalação do app");
            }else{
                console.log("Usuário NÃO fez a instalação do app");
            }

        });

    });

}