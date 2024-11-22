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
    },
]

let screenUp = []; // Creo un array donde voy a almacenar las ventanas para ir colocandolas unas encimas de otras

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
            <div class="screen-header borderStatic">
                <div class="screen-header-logo borderSelectable">
                    <img src="img/ico/msie2.ico" alt="">
                    <p>${text.textContent}</p>
                </div>
                <div class="btnMFC">
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
                <select class="urlSelectShop" name="url">
                    <option value="Productos">https://Shop/${text.textContent}</option>
                    <option value="Conócenos">https://Shop/Conócenos</option>
                    <option value="Contacto">https://Shop/Contacto</option>
                </select>
                <p>Links</p>
            </div>
            <div class="scaleScreen scaleScreenAR"></div>
            <div class="scaleScreen scaleScreenAB"></div>
            <div class="scaleScreen scaleScreenDER"></div>
            <div class="scaleScreen scaleScreenIZQ"></div>
    `;
    document.querySelector("main").prepend(screen);

    addContentScreen(text, screen);

    const borderSelectable = document.querySelectorAll(".borderSelectable");
    let primerTextComp = true;

    // Creamos un div auxiliar que me permitirá mover mis objetos
    const divAux = document.createElement("div");
    divAux.setAttribute("class", "divAux");

    //SCALES SCREEN
    //Variables
    const scaleScreen = document.querySelectorAll(".scaleScreen");

    scaleScreen.forEach(el => {
        let escalar = false;
        let altura = 0;
        let ancho = 0;
        let height = 0;
        el.addEventListener("mousedown", () => {
            escalar = true;
            // Saco la altura del screen-content
            height= window.getComputedStyle(el.parentElement).height;
            // Me devuelve los datos con px. pues se los sacamos para poder jugar con el numero
            height = height.replace("px", "");
            // Saco la altura de la ventana
            altura = window.getComputedStyle(el.parentElement).height;
            // Saco la anchura de la ventana
            ancho = window.getComputedStyle(el.parentElement).width;
            // Me devuelve los datos con px. pues se los sacamos para poder jugar con el numero
            ancho = ancho.replace("px", "");
            // Me devuelve los datos con px. pues se los sacamos para poder jugar con el numero
            altura = altura.replace("px", "");
            console.log(ancho)
        })
        window.addEventListener("mousemove", (e) => {
            if (escalar){
                console.log("moviendo");
                // document.body.querySelector("main").prepend(divAux);
                ancho++; // Sumo 1 al ancho
                altura++; // Sumo 1 al alto
                height++; // Sumo 1 al alto del contenido de la ventana
                el.parentElement.querySelector(".screen-content").style.height = height+"px";
                el.parentElement.style.width = ancho+"px";
                el.parentElement.style.height = altura+"px";
                console.log(ancho)
                console.log(altura)
            }
            
        })
        window.addEventListener("mouseup", () => {
            escalar=false;
        })
    });
    //FIN SCALES SCREEN

    borderSelectable.forEach(bselect => {
        // Literalmente voy a copiar este codigo de abajo para hacer full y min
        const closes = document.querySelectorAll(".close");
        closes.forEach(close => {
            close.addEventListener("click", () => {
                const elPadre = close.parentElement.parentElement.parentElement;
                elPadre.remove();
                barElDelete(elPadre);
            })
        });
        // Hasta aqui
        const mins = document.querySelectorAll(".min");
        mins.forEach(min => {
            min.addEventListener("click", () => {
                const elPadre = min.parentElement.parentElement.parentElement;
                elPadre.remove();
            })
        });
        const fulls = document.querySelectorAll(".full");
        fulls.forEach(full => {
            full.addEventListener("click", () => {
                const elPadre = full.parentElement.parentElement.parentElement;
                fullAjuste(elPadre);
            })
        });
        // Variables
        console.log(bselect)
        let mover = false; // Nos indicará cuando está pulsando la ventana y cuando la suelta
        let posX = 0;
        let posY = 0; // Guardaré la posición de donde agarra la ventana
        const textComp = bselect.parentElement.querySelector("div > div > p");

        //No tiene ningun sentido que funcione, pero me alegro de que lo haga! Creo que se debe sobre todo al textComp de arriba pero prefiero no opinar
        let textCompGod = "";
        if(primerTextComp){
            textCompGod = textComp.textContent;
            console.log(textComp);
            primerTextComp = false;
        }

        bselect.addEventListener("mousedown", (e) =>{
            if (textCompGod == bselect.querySelector("div > div > p").textContent) {
                mover = true;
                document.body.querySelector("main").prepend(divAux);
                posX = e.offsetX;
                posY = e.offsetY;
                posScreen(screen);
            }
        })
        window.addEventListener("mousemove", (e) =>{
            if (mover){
                const { offsetX, offsetY } = e;
                screen.style.top = -posY+offsetY+"px";
                screen.style.left = -posX+offsetX+"px"; // Obra maestra del -posX para que la ventana siempre se empiece a mover desde donde seleccionas
            }
        })
        window.addEventListener("mouseup", () =>{
            mover = false;
            divAux.remove();
        })
    });
}
function fullAjuste(elPadre){
    let content = elPadre.querySelector(".screen-content");
    if(elPadre.style.width == "100%"){
        content.style.height = "40vh";
        elPadre.style.width = "700px";
        elPadre.style.height = "auto";
    }else{
        elPadre.style.top = "0";
        elPadre.style.left = "0";
        content.style.height = "90vh";
        elPadre.style.width = "100%";
        elPadre.style.height = "100vh";
    }
}
// Pone la posicion en z de la pantalla que corresponda
function posScreen(screen){
    textScreen = screen.querySelector("div > div > p");
    let add = compScreen(textScreen, screen);
    console.log(add);
    screenUp.forEach( el => {
        textEl = el.querySelector("div > div > p");
        if(textScreen.textContent == textEl.textContent) el.style.zIndex = 122;
        else el.style.zIndex = 111;
    });
}

// Comprueba si la ventana ya ha sido agregada al array
function compScreen(textScreen, screen){
    let add = true;
    if (screenUp.length == 0){
        screenUp.push(screen);
    } 
    else{
        screenUp.forEach( el => {
            console.log(el);
            textEl = el.querySelector("div > div > p");
            if(textScreen.textContent == textEl.textContent) add = false;
            if(add){
                screenUp.push(screen)
            }
        });
    }
    console.log(screenUp);
    return add;
}

function barElDelete(elPadre){
    console.log(elPadre);
    textPadre = elPadre.querySelector("div > div > p");
    const footerDiv = document.querySelectorAll("footer > div");
    footerDiv.forEach(el => {
        textComp = el.querySelector("p")
        if(textComp.textContent == textPadre.textContent){
            textComp.parentElement.remove();
        }
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

    // SELECCION DE OTRAS VENTANAS DENTRO DE LA SHOP
    const urlSelectShop = document.querySelector(".urlSelectShop");
    urlSelectShop.addEventListener("change", (e) => {
        const opc = e.target.value;
        cambiarContentShop(screen, opc);
    })
}

function crearConocenos(screen){
    const divProd = document.createElement("div");
    divProd.setAttribute("class", "screen-content borderStatic");
    divProd.innerHTML = `
        <div class="imgText">
            <div>
                <img class="borderStatic" src="img/conocenos.jpg" alt="">
            </div>
            <div>
                <h2>EAGS 95 SHOP</h2>
                <p>
                Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, "consecteur".
                </p>
            </div>
        </div>
        <div class="ubi borderStatic">
            <div>
                <h3>Donde estamos?</h3>
                <p>En tienda física, solo cobramos en pesetas.</p>
                <p>De Lunes a Viernes:</p>
                <p>7:00 h a 22:00 h</p>
                <p>Fines de semana y festivos:</p>
                <p>10:00 h a 20:00 h</p>
                <p>La web abierta las 24 horas del dia jejejeje</p>
            </div>
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2183.5406628568153!2d-3.6070775630352863!3d37.18887703142041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses!4v1732194812686!5m2!1ses!2ses" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
        <div class="divError">
            <div class="modalError borderStatic">
                <div class="borderStatic">
                    <p>Error por no comprar</p>
                    <p class="btn border pointer red btnError">X</p>
                </div>
                <div class="contentModalError">
                    <div>
                        <img src="img/ico/msg_warning.ico" alt="">
                        <p>Compra productos para mejorar en la vida</p>
                    </div>
                    <div>
                        <button class="border pointer">OK</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    addFooter(divProd);
    screen.append(divProd)
    
    const btnError = document.querySelector(".btnError");
    const modalError = document.querySelector(".modalError");
    btnError.addEventListener("click", () => {
        modalError.classList.add("shake");
        setTimeout(() => {
            modalError.classList.remove("shake");
        }, 820);
    })
}

function crearContacto(screen){
    const divProd = document.createElement("div");
    divProd.setAttribute("class", "screen-content borderStatic");
    divProd.innerHTML = `
        <div class="formContacto borderStatic">
            <div class="borderStatic">
                <p>Error por no comprar</p>
                <p class="btn border pointer red btnError">X</p>
            </div>
            <div class="formContent">
                <h3 class="h3form">CONTACTO</h3>
                <input type="text" name="nombre" placeholder="nombre">
                <input type="email" name="email" placeholder="email">
                <textarea name="duda" placeholder="alguna duda o nada"></textarea>
                <div>
                    <input type="checkbox" name="terms">
                    <p>i read & Agree to Terms and Conditions</p>
                </div>
                <button class="btnEnviar">Enviar</button>
            </div>
        </div>
        <h3 class="h3contanct">PREGUNTAS FRECUENTES</h3>
        <div id="preguntas">
            <details class="a">
                <summary>¿Los pagos son seguros?<hr></summary>
                <p>HBO Max es una experiencia de streaming espectacular que te trae las mejores historias de Warner Bros., HBO, Max, DC, Cartoon Network y mucho más, juntos por primera vez.</p>
            </details>
            
            <details class="b">
                <summary>¿Se aceptan devoluciones?<hr></summary>
                
                <p>Si tienes algún problema al suscribirte o al acceder a HBO Max, encontrarás ayuda en nuestro <a href="">Centro de Ayuda</a>. ¡Estarás viendo HBO Max antes de que las palomitas estén listas!</p>
            </details>
            <details class="c">
                <summary>¿Por que el proyecto de los de primero es mejor que los de segundo?<hr></summary>
                
                <p>Con los perfiles de los niños y los controles parentales personalizados, las familias pueden reír y aprender con personajes como Bugs Bunny, Peppa Pig, Harry Potter y más.</p>
            </details>
            <details class="d">
                <summary>¿Tortilla con o sin cebolla?<hr></summary>
                
                <p>HBO Max tiene un precio mensual de 9,99 €. Puedes ahorrar un 41 % si pagas el precio anual de 69,99 € por adelantado.</p>
            </details>
        </div>
    `;
    addFooter(divProd);
    screen.append(divProd);
    const btnEnviar = document.querySelector(".btnEnviar");
    const formContent = document.querySelector(".formContent");
    btnEnviar.addEventListener("click", (e) => {
        e.preventDefault();
        formContent.innerHTML = `
            <h3 class="h3form">CONTACTO</h3>
            <img src="img/ico/check.ico" alt="">
        `;
    })
}

// ESTA FUNCION SE ENCARGA DE VER QUE OPCIÓN HA ESCOGIDO PARA MOSTRAR EL NUEVO CONTENIDO 
function cambiarContentShop(screen, opc){
    if(document.querySelector(".screen-content")){
        let screenRemover = document.querySelector(".screen-content");
        screenRemover.remove();
    }
    
    if(opc == "Contacto") crearContacto(screen);
    if(opc == "Conócenos") crearConocenos(screen);
    if(opc == "Productos") contentIShopPro(screen);
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