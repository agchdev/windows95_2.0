// ELEMENTOS DINÁMICOS DE DOM
appIconImg = ["img/ico/recycle_bin_full.ico","img/ico/directory_open.ico", "img/ico/msie2.ico"];
appIconTxt = ["Papelera", "Documentos", "InternetShop"];
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
    let add = true;
    const footer = document.querySelector("footer");
    const footerDiv = footer.querySelectorAll("div");
    const pAdd = appDivBarTarea.querySelector("p");

    footerDiv.forEach(div => {
        const pExist = div.querySelector("p");
        console.log(pExist.textContent+"=="+pAdd.textContent);
        if(pExist.textContent == pAdd.textContent) add = true;
        else add = false;
    })
    return add;
}

document.addEventListener("DOMContentLoaded", () => {
    crearAppIcon();
    const appDivIcon = document.querySelectorAll("#aps > div");
    appDivIcon.forEach(app => {
        app.addEventListener("click", () => {
            addBarraDeTareas(app);
        })
    })
})