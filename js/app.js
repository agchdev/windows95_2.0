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
    const img = document.createElement("img");
    
    // <div class="windowMenu border pointer">
    //     <img class="maxwidth-100 pointer" src="img/logoEagWindow.png" alt="">
    //     <p class="pointer">Start</p>
    // </div>
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