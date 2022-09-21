let content = document.getElementById("horizontal-scroll-menu");
let template = `
<div class="container">
    <div class="menu-container">
        <div class="menu-item">
            <a onclick="menuCategory('Cerveja')">
                <div class="card h-200" style="width: 7rem;">
                    <div class="card-body">
                        Cerveja
                    </div>
                </div>
            </a>
        </div>
        <div class="menu-item">
            <a onclick="menuCategory('Refrigerante')">
                <div class="card h-200" style="width: 7rem;">
                    <div class="card-body">
                        S/Álcool
                    </div>
                </div>
            </a>
        </div>
        <div class="menu-item">
            <a onclick="menuCategory('Drink')">
                <div class="card h-200" style="width: 7rem;">
                    <div class="card-body">
                    Drink 
                    </div>
                </div>
            </a>
        </div>
        <div class="menu-item">
            <a onclick="menuCategory('Vinho')">
                <div class="card h-200" style="width: 7rem;">
                    <div class="card-body">
                        Vinho
                    </div>
                </div>
            </a>
        </div>
        <div class="menu-item">
            <a onclick="menuCategory('')">
                <div class="card h-200" style="width: 7rem;">
                    <div class="card-body">
                        Todos
                    </div>
                </div>
            </a>
        </div>
    </div>
</div>`;

content.innerHTML+=template;

const nav = document.querySelector("header");
let lastScrollY = window.scrollY;

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

});