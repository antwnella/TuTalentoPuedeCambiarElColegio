/* =========================================================
   🗺️ MAPA DE IMPACTO + 🌐 COMUNIDAD
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       URL DEL MAPA DE IMPACTO

       Cuando tengas la URL definitiva, me la das y
       la colocamos aquí sin que tengas que buscar nada.
    ===================================================== */

    const IMPACT_MAP_URL = "";


    /* =====================================================
       RECUPERAR MAPA
    ===================================================== */

    const mapSection =
        document.querySelector(".map-section");


    if (mapSection) {

        mapSection.id = "mapa";

        mapSection.classList.remove(
            "hidden"
        );

        mapSection.dataset.hiddenPanel =
            "false";


        mapSection.classList.add(
            "impact-map-panel"
        );


        /* Texto explicativo */

        const heading =
            mapSection.querySelector(
                ".section-heading"
            );


        if (
            heading &&
            !heading.querySelector(
                ".impact-map-intro"
            )
        ) {

            const intro =
                document.createElement(
                    "p"
                );


            intro.className =
                "impact-map-intro";


            intro.textContent =
                "Explora espacios concretos donde una idea puede convertirse en una acción que mejore nuestra comunidad educativa.";


            heading.appendChild(
                intro
            );

        }


        /* Botón del mapa */

        if (
            !mapSection.querySelector(
                ".impact-map-url-button"
            )
        ) {

            const button =
                document.createElement(
                    "button"
                );


            button.type = "button";

            button.className =
                "btn btn-primary impact-map-url-button";


            button.innerHTML = `
                VER MAPA DE IMPACTO
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            `;


            button.addEventListener(
                "click",
                () => {

                    if (
                        !IMPACT_MAP_URL
                    ) {

                        showInfoModal(
                            "MAPA DE IMPACTO",
                            "Aquí irá el enlace del mapa de impacto. Cuando tengas la URL, podemos colocarla directamente en la página."
                        );

                        return;
                    }


                    window.open(
                        IMPACT_MAP_URL,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }
            );


            if (heading) {
                heading.appendChild(
                    button
                );
            }

        }


        /* Reescribir ejemplos concretos */

        const mapExamples = {

            "Biblioteca":
                "Club de lectura, banco de libros y zona silenciosa de estudio.",

            "Área verde":
                "Huerto escolar, reciclaje y recuperación de áreas verdes.",

            "Patio":
                "Recreos activos, juegos cooperativos y actividades de convivencia.",

            "Zona deportiva":
                "Torneos intersalones, préstamo de implementos y actividades deportivas.",

            "Espacio comunitario":
                "Mural estudiantil, buzón de ideas y campañas de convivencia.",

            "Zona tecnológica":
                "Club de programación, proyectos digitales y laboratorio creativo."

        };


        mapSection
            .querySelectorAll(
                ".map-space"
            )
            .forEach((space) => {

                const title =
                    space.textContent
                        .trim()
                        .replace(
                            /\s+/g,
                            " "
                        );


                const example =
                    mapExamples[title];


                if (!example) {
                    return;
                }


                let exampleElement =
                    space.querySelector(
                        ".map-example"
                    );


                if (!exampleElement) {

                    exampleElement =
                        document.createElement(
                            "span"
                        );

                    exampleElement.className =
                        "map-example";

                    space.appendChild(
                        exampleElement
                    );

                }


                exampleElement.textContent =
                    example;

            });

    }


    /* =====================================================
       AGREGAR MAPA AL MENÚ
    ===================================================== */

    const nav =
        document.querySelector(
            ".main-nav"
        );


    if (
        nav &&
        !nav.querySelector(
            '[href="#mapa"]'
        )
    ) {

        const mapLink =
            document.createElement(
                "a"
            );


        mapLink.href =
            "#mapa";


        mapLink.textContent =
            "Mapa";


        nav.insertBefore(
            mapLink,
            nav.querySelector(
                '[href="#impacto"]'
            ) ||
            nav.querySelector(
                ".nav-highlight"
            )
        );


        mapLink.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                const panels =
                    document.querySelectorAll(
                        "main > section"
                    );


                panels.forEach(
                    (section) => {

                        section.classList.remove(
                            "panel-active"
                        );

                    }
                );


                if (mapSection) {

                    mapSection.classList.add(
                        "panel-active"
                    );

                }


                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       CREAR PANEL FINAL DE COMUNIDAD
    ===================================================== */

    if (
        !document.getElementById(
            "comunidad"
        )
    ) {

        const community =
            document.createElement(
                "section"
            );


        community.id =
            "comunidad";


        community.className =
            "community-panel";


        community.innerHTML = `

            <div class="container">

                <div class="community-layout">

                    <div class="community-logo-area">

                        <div class="community-logo-ring"></div>

                        <div class="community-logo-star community-star-one">
                            ✦
                        </div>

                        <div class="community-logo-star community-star-two">
                            ✦
                        </div>

                        <img
                            src="/static/images/logo.png"
                            alt="Tu Talento Puede Cambiar el Colegio"
                            class="community-logo"
                        >

                    </div>


                    <div class="community-copy">

                        <span class="eyebrow dark-eyebrow">
                            NUESTRA COMUNIDAD
                        </span>

                        <h2>
                            Escanea y sigue
                            <span>nuestra comunidad</span>
                        </h2>

                        <p>
                            Mantente al tanto de las novedades,
                            propuestas, actividades y nuevas formas
                            de participar en nuestro colegio.
                        </p>


                        <div class="community-qr-area">

                            <div
                                id="communityQrContainer"
                            >
                                <div class="community-qr-placeholder">

                                    <i class="fa-solid fa-qrcode"></i>

                                    <span>
                                        AQUÍ IRÁ<br>
                                        EL QR DE<br>
                                        NUESTRA RED SOCIAL
                                    </span>

                                </div>
                            </div>


                            <div class="community-qr-text">

                                <strong>
                                    Escanea el QR
                                </strong>

                                <span>
                                    Síguenos y continúa
                                    formando parte de nuestra
                                    comunidad.
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        `;


        document
            .querySelector("main")
            .appendChild(
                community
            );


        /* Intentar cargar QR */

        const qr =
            new Image();


        qr.src =
            "/static/images/qr-red-social.png";


        qr.className =
            "community-qr";


        qr.alt =
            "QR de la red social";


        qr.onload =
            () => {

                const container =
                    document.getElementById(
                        "communityQrContainer"
                    );


                if (container) {

                    container.innerHTML = "";

                    container.appendChild(
                        qr
                    );

                }

            };


        /* Si todavía no existe el QR,
           dejamos el bonito placeholder */

        qr.onerror =
            () => {

                console.log(
                    "QR de red social todavía no agregado."
                );

            };


        /* =================================================
           LINK DEL MENÚ
        ================================================= */

        if (
            nav &&
            !nav.querySelector(
                '[href="#comunidad"]'
            )
        ) {

            const communityLink =
                document.createElement(
                    "a"
                );


            communityLink.href =
                "#comunidad";


            communityLink.textContent =
                "Comunidad";


            nav.appendChild(
                communityLink
            );


            communityLink.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();


                    const panels =
                        document.querySelectorAll(
                            "main > section"
                        );


                    panels.forEach(
                        (section) => {

                            section.classList.remove(
                                "panel-active"
                            );

                        }
                    );


                    community.classList.add(
                        "panel-active"
                    );


                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );

        }

    }

});