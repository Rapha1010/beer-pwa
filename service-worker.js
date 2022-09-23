'use strict';

const CACHE_NAME = "BeerAppCache";

const FILES_CACHE = [
    "css/bootstrap.min.css",
    "css/bootstrap-icons.css",
    "css/style.css",
    "js/scroll-menu.js",
    "js/script.js",
    "js/bootstrap.bundle.min.js",
    "src/pages/offline.html",
    "img/bg.jpg",
    "img/slider1.jpg",
    "img/slider2.jpg",
    "img/slider3.jpg",
    "img/logo.png",
    "img/offline.png",
    "img/no_img.jpg",
    "img/favicon.ico",
    "img/logo.svg"
];

// //Instalar Service Worker
self.addEventListener("install", (evt) => {

    evt.waitUntil(

        caches.open(CACHE_NAME).then((cache) => {

            console.log("Service Worker gravando o cache estático.");
            return cache.addAll(FILES_CACHE);

        })

    );
    self.skipWaiting();

});

// //Ativar Service Worker
self.addEventListener("activate", (evt) => {

    evt.waitUntil(

        caches.keys().then((keylist) => {

            return Promise.all(keylist.map((key) => {
                if(key !== CACHE_NAME){
                    return caches.delete(key);
                } 
            }));

        })

    );
    self.clients.claim();
});

// //Responder Off-line

self.addEventListener("fetch", (evt) => {

    if(evt.request.mode !== "navigate"){
        return;
    }

    evt.respondWith(
        fetch(evt.request).catch(()=>{
            return caches.open(CACHE_NAME).then((cache) =>{

                return cache.match("src/pages/offline.html");
            });

        })
    );

});