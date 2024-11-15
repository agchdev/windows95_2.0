// ELEMENTOS DINÁMICOS DE DOM
appIconImg = ["img/ico/recycle_bin_full.ico","img/ico/directory_open.ico", "img/ico/msie2.ico"];
appIconTxt = ["Papelera", "Documentos", "InternetShop"];

const productos = [
    {
        nombre: "EagWindows Green",
        img: "img/IMAGEN CAMISETA3.jpg",
        desc: "Camiseta con el logo EAG Windows verde",
        price: "15,99€"
    },
    {
        nombre: "EagWindows Blue",
        img: "img/IMAGEN CAMISETA2.jpg",
        desc: "Camiseta con el logo EAG Windows azul",
        price: "15,99€"
    },
    {
        nombre: "EagWindows Red",
        img: "img/IMAGEN CAMISETA3.jpg",
        desc: "Camiseta con el logo EAG Windows roja",
        price: "15,99€"
    }
]

const valoraciones = [
    {
        nombre: "TuMorenito19",
        img: "img/FOTODEPERFIL1.png",
        stars: 5,
        valoracion: "El mejor producto, tiene la mejor calidad que he visto en mi vida, que ganas de seguir comprando"
    },
    {
        nombre: "Iva_ahi",
        img: "img/FOTODEPERFIL2.png",
        stars: 5,
        valoracion: "El mejor producto, tiene la mejor calidad que he visto en mi vida, que ganas de seguir comprando"
    },
    {
        nombre: "huevoNete",
        img: "img/FOTODEPERFIL3.png",
        stars: 5,
        valoracion: "El mejor producto, tiene la mejor calidad que he visto en mi vida, que ganas de seguir comprando"
    }
]
// FUNCIONES
function crearAppIcon(){ // Esta función creal la app del escritorio
    cont = 0;
    appIconImg.forEach(link => { // Recorro el array con las imágenes
        const appDivIcon = document.createElement("div"); // Creo el div contenedor del logo y el texto
        appDivIcon.setAttribute("class", "pointer iconDesktop"); // las clases para poder ser seleccionado y estilos
        const img = document.createElement("img"); //Creo la imagen
        img.setAttribute("class", "pointer"); // Añado las clases
        img.src = link; // Le meto la imagen
        const btn = document.createElement("button"); // Creo el botón
        btn.setAttribute("class", "pointer"); // Añado las clases correspondientes
        btn.textContent = appIconTxt[cont]; // Le meto el texto correspodiente creado en un array anterior 
        cont++; // Le añado uno al contador
        appDivIcon.append(img, btn); // Lo añado al div
        document.querySelector("#aps").append(appDivIcon); // Finalmente al padre
    });  
}

// Esta funcion añade la aplicacion a la barra de tareas
function addBarraDeTareas(app){
    let creado = false;
    const appDivBarTarea = document.createElement("div");
    appDivBarTarea.setAttribute("class", "divWM border pointer");
    // Creo el elemento imagen
    const img = document.createElement("img");
    // Añado clases a imagen
    img.setAttribute("class", "imgWM maxwidth-100 pointer");
    // Creo el elemento imagen
    const p = document.createElement("p");
    // Añado clases a párrafo
    p.setAttribute("class", "pWM pointer");
    // Selecciono la imagen
    const link = app.querySelector("img");
    // Cojo el link
    img.src = link.src;
    // Selecciono el párrafo
    const text = app.querySelector("button");
    // Le añado el texto
    p.textContent = text.textContent;

    appDivBarTarea.append(img,p);

    if(!comprobarBarTar(appDivBarTarea)){
        creado = comprobarBarTar(appDivBarTarea);
        const footer = document.querySelector("footer");
        footer.insertBefore(appDivBarTarea, footer.children[1]);
    }

    return creado;
}

// Esta funcion comprueba que no este abierto ese elemento
function comprobarBarTar(appDivBarTarea){
    let error = false;
    const footer = document.querySelector("footer");
    const footerDiv = footer.querySelectorAll("div");
    const pAdd = appDivBarTarea.querySelector("p");

    footerDiv.forEach(div => {
        const pExist = div.querySelector("p");
        console.log(pExist.textContent+"=="+pAdd.textContent);
        if(pExist.textContent == pAdd.textContent && !error) error = true;
    })
    return error;
}

// Esta funcion crea la ventana
function crearVentana(app){
    // Selecciono el párrafo
    const text = app.querySelector("button");

    // Creo la ventana
    const screen = document.createElement("section");
    screen.setAttribute("class", "screen borderStatic");
    screen.innerHTML = `
    <!-- CERRAR ABRIR Y MINIMIZAR -->
            <div class="screen-header borderStatic borderSelectable">
                <div class="screen-header-logo">
                    <img src="img/ico/msie2.ico" alt="">
                    <p>${text.textContent}</p>
                </div>
                <div>
                    <button class="btn border pointer min">_</button>
                    <button class="btn border pointer full">[]</button>
                    <button class="btn border pointer close">X</button>
                </div>
            </div>
            <!-- BACK FORWARD PROD CONTACT -->
            <div class="borderStatic">
                <div class="screen-subHeader">
                    <div>
                        <img src="img/ico/backForward.png" alt="">
                        <p>Back</p>
                    </div>
                    <div>
                        <img class="forward" src="img/ico/backForward.png" alt="">
                        <p>Forward</p>
                    </div>
                    <div>
                        <img src="img/ico/msie2.ico" alt="">
                        <p>Conócenos</p>
                    </div>
                    <div>
                        <img src="img/ico/modem.ico" alt="">
                        <p>Contacto</p>
                    </div>
                </div>
            </div>
            <!-- URL -->
            <div class="screen-url borderStatic">
                <p>Address</p>
                <select name="url">
                    <option value="Productos">https://Shop/${text.textContent}</option>
                    <option value="Conócenos">https://Shop/Conócenos</option>
                    <option value="Contacto">https://Shop/Contacto</option>
                </select>
                <p>Links</p>
            </div>
    `;
    document.querySelector("main").prepend(screen);

    addContentScreen(text, screen);

    const borderSelectable = document.querySelectorAll(".borderSelectable");
    let primerTextComp = true;

    borderSelectable.forEach(bselect => {
        // Variables
        let mover = false; // Nos indicará cuando está pulsando la ventana y cuando la suelta
        let posX = 0; // Guardaré la posición de donde agarra la ventana
        // Creamos un div auxiliar que me permitirá mover mis objetos
        const divAux = document.createElement("div");
        divAux.setAttribute("class", "divAux");
        const textComp = bselect.querySelector("div > div > p");
        let textCompGod = ""
        if(primerTextComp){
            textCompGod = textComp.textContent
            console.log(textComp);
            primerTextComp = false;
        }
        

        bselect.addEventListener("mousedown", (e) =>{
            if (textCompGod == bselect.querySelector("div > div > p").textContent) {
                mover = true;
                document.body.prepend(divAux);
                posX = e.offsetX;
            }
        })
        window.addEventListener("mousemove", (e) =>{
            if (mover){
                const { offsetX, offsetY } = e;
                screen.style.top = offsetY+"px";
                screen.style.left = -posX+offsetX+"px"; // Obra maestra del -posX para que la ventana siempre se empiece a mover desde donde seleccionas
            }
        })
        window.addEventListener("mouseup", () =>{
            mover = false;
            divAux.remove();
        })
    });
}

function addContentScreen(text, screen){
    console.log(text)
    if (text.textContent == "InternetShop") {
        contentIShopPro(screen);
    }
}

// Esta funcion crea el contenido de la ventana de shop
function contentIShopPro(screen){
    const divProd = document.createElement("div");
    divProd.setAttribute("class", "screen-content borderStatic");

    const divBG = document.createElement("div");
    divBG.setAttribute("class", "screen-content-banner");

    const divContProd = document.createElement("div");
    divContProd.setAttribute("class", "screen-content-productos");

    const titProd = document.createElement("h2");
    titProd.textContent = "productos";

    const divArticleProd = document.createElement("div");
    divArticleProd.setAttribute("class", "screen-content-productos-articles");
    
    productos.forEach(producto => {
        const articleProd = document.createElement("article");
        articleProd.setAttribute("class", "screen-article pointer");
        articleProd.innerHTML = `
            <img class="border" src="${producto.img}" alt="">
            <h3>${producto.nombre}</h3>
            <p>${producto.desc}</p>
            <p>${producto.price}</p>
        `;
        divArticleProd.append(articleProd);
    });

    const divValoraciones = document.createElement("div");
    divValoraciones.setAttribute("class", "screen-content-valoraciones");

    const titVal = document.createElement("h2");
    titVal.textContent = "valoraciones";
    divValoraciones.append(titVal)
    valoraciones.forEach(valoracion => {
        const articleValoraciones = document.createElement("article");
        articleValoraciones.setAttribute("class", "screen-content-valoraciones-article");
        
        const divImgVal = document.createElement("div");
        divImgVal.innerHTML = `
            <img class="maxwidth-100" src="${valoracion.img}" alt="">
        `;
        const divNickStarDesc = document.createElement("div");
        divNickStarDesc.innerHTML = `<h4>huevoNete</h4>`;
        let divStars = document.createElement("div");
        divStars.innerHTML = ``;
        for (let i = 0; i < valoracion.stars; i++) {
            divStars.innerHTML += `
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 0L7.95934 4.49139H12.6819L8.86126 7.26722L10.3206 11.7586L6.5 8.98278L2.6794 11.7586L4.13874 7.26722L0.318133 4.49139H5.04066L6.5 0Z" fill="#FFE100"/>
            </svg>`;
        }
        divNickStarDesc.append(divStars);
        
        divNickStarDesc.innerHTML += `<p>El mejor producto, tiene la mejor calidad que he visto en mi vida, que ganas de seguir comprando</p>`;
        articleValoraciones.append(divImgVal, divNickStarDesc);
        divValoraciones.append(articleValoraciones);
    })

    divContProd.append(titProd, divArticleProd);
    divProd.append(divBG, divContProd, divValoraciones);
    addFooter(divProd);
    screen.append(divProd);
}

// Esta funcion crea el footer de la ventana
function addFooter(screen){
    const footer = document.createElement("div");
    footer.setAttribute("class", "screen-content-footer");
    footer.innerHTML = `
    <div class="screen-content-footer">
        <div class="screen-content-footer-redes borderStatic">
            <div>
                <div class="pointer">
                    <img class="maxwidth-100" src="img/ico/camera.ico" alt="">
                    <p>Instagram</p>
                </div>
                <div class="pointer"> 
                    <img class="maxwidth-100" src="img/ico/computer_explorer_2k.ico" alt="">
                    <p>Twitter</p>
                </div>
                <div class="pointer">
                    <img class="maxwidth-100" src="img/ico/help_book_cool.ico" alt="">
                    <p>Facebook</p>
                </div>
            </div>
            <div>
                <a href="">Avisos legales</a>
                <a href="">Políticas de privacidad</a>
                <a href="">Condicones y servicios</a>
            </div>
        </div>
        <div class="screen-content-footer-copyright borderStatic">
            <p>copyright 2024 designed by Alejandro Aguayo</p>
        </div>
    </div>
    `;
    screen.append(footer);
}

// Parte del dom
document.addEventListener("DOMContentLoaded", () => {
    crearAppIcon();
    const appDivIcon = document.querySelectorAll("#aps > div");
    appDivIcon.forEach(app => {
        app.addEventListener("click", () => {
            let crear = addBarraDeTareas(app);
            console.log(crear);
            if(!crear) crearVentana(app);
        })
    })

    
})