// ELEMENTOS DINÁMICOS DE DOM
const appDivIcon = document.createElement("div");
appIconImg = ["img/ico/recycle_bin_full.ico","img/ico/directory_open.ico", "img/ico/msie2.ico"];
appIconTxt = ["Papelera", "Documentos", "InternetShop"];
// FUNCIONES
function crearAppIcon(){ // Esta función creal la app del escritorio
    cont = 0;
    appIcon.forEach(link => {
        const img = document.createElement("img");
        img.setAttribute("class", "pointer");
        img.src = link;
        const btn = document.createElement("button");
        btn.setAttribute("class", "pointer");
        btn.textContent = appIconTxt[0];
        cont++;
    });

    appDivIcon.append(img, btn);
}

document.addEventListener("DOMContentLoaded", () => {
    // ELEMENTOS EXISTENTES EN EL DOM
    const sectionApp = document.querySelector("#aps");

})