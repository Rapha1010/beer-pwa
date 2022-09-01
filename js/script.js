const nav = document.querySelector("header");
let lastScrollY = window.scrollY;
console.log(lastScrollY);

window.addEventListener("scroll", ()=> {

    if(lastScrollY < window.scrollY) {
        nav.style["opacity"] = 1;
        for (let scroll = 0; scroll < 100; scroll+=10) {
            if (window.scrollY > scroll) {
                nav.style["opacity"] -= 0.1;
            }
        }
    } else {
        nav.style["opacity"] = 1;
    }

    lastScrollY = window.scrollY;

})