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

function addBarraDeTareas(app){
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
    console.log(comprobarBarTar(appDivBarTarea));
    if(!comprobarBarTar(appDivBarTarea)){
        const footer = document.querySelector("footer");
        footer.insertBefore(appDivBarTarea, footer.children[1]);
    }
}

function comprobarBarTar(appDivBarTarea){
    let add = false;
    const footer = document.querySelector("footer");
    const footerDiv = footer.querySelectorAll("div");
    const pAdd = appDivBarTarea.querySelector("p");

    footerDiv.forEach(div => {
        const pExist = div.querySelector("p");
        console.log(pExist.textContent+"=="+pAdd.textContent);
        if(pExist.textContent == pAdd.textContent && !add) add = true;
    })
    return add;
}

function crearVentana(app){
    // Selecciono el párrafo
    const text = app.querySelector("button");

    // Creo la ventana
    const screen = document.createElement("section");
    screen.setAttribute("class", "screen borderStatic");
    screen.innerHTML = `
    <!-- CERRAR ABRIR Y MINIMIZAR -->
            <div class="screen-header borderStatic">
                <div class="screen-header-logo">
                    <img src="img/ico/msie2.ico" alt="">
                    <p>${text.textContent}</p>
                </div>
                <div>
                    <button class="btn border pointer">_</button>
                    <button class="btn border pointer">[]</button>
                    <button class="btn border pointer">X</button>
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

    addContentScreen(text);
    
}

function addContentScreen(text){
    if (text == "InternetShop") {
        
    }
}

function contentIShopPro(){
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

    divContProd.append(titProd, divArticleProd);
    divProd.append(divBG, divContProd);
    
}

document.addEventListener("DOMContentLoaded", () => {
    crearAppIcon();
    const appDivIcon = document.querySelectorAll("#aps > div");
    appDivIcon.forEach(app => {
        app.addEventListener("click", () => {
            addBarraDeTareas(app);
            crearVentana(app);
        })
    })
})