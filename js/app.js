// ELEMENTOS DINÁMICOS DE DOM
appIconImg = ["img/ico/recycle_bin_full.ico","img/ico/directory_open.ico", "img/ico/msie2.ico"];
appIconTxt = ["Papelera", "Documentos", "InternetShop"];
// FUNCIONES
function crearAppIcon(){ // Esta función creal la app del escritorio
    cont = 0;
    appIconImg.forEach(link => {
        const appDivIcon = document.createElement("div");
        appDivIcon.setAttribute("class", "pointer iconDesktop")
        const img = document.createElement("img");
        img.setAttribute("class", "pointer");
        img.src = link;
        const btn = document.createElement("button");
        btn.setAttribute("class", "pointer");
        btn.textContent = appIconTxt[cont];
        cont++;
        console.log(cont);
        appDivIcon.append(img, btn);
        document.querySelector("#aps").append(appDivIcon);
    });
    
}

document.addEventListener("DOMContentLoaded", () => {
    // ELEMENTOS EXISTENTES EN EL DOM
    const sectionApp = document.querySelector("#aps");
    crearAppIcon();
})