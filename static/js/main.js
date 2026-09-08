document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       CONFIGURACIÓN
    ========================================================= */

    const config = window.PROJECT_CONFIG || {};

    const urls = {
        talentos: config.GOOGLE_FORM_TALENTOS_URL || "",
        propuestas: config.GOOGLE_FORM_PROPUESTAS_URL || "",
        participacion: config.GOOGLE_FORM_PARTICIPACION_URL || "",
        padlet: config.PADLET_URL || ""
    };


    /* =========================================================
       BOTONES QUE ABREN FORMULARIOS / ENLACES
    ========================================================= */

    document.querySelectorAll("[data-external]").forEach((button) => {

        button.addEventListener("click", () => {

            const destination = button.dataset.external;
            const url = urls[destination];

            if (!url) {
                alert(
                    "Este enlace todavía no está configurado. Podemos agregarlo después."
                );
                return;
            }

            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        });

    });


    /* =========================================================
       MAPA
    ========================================================= */

    const mapSection = document.querySelector(".map-section");

    if (mapSection) {

        const mapExamples = {

            "Patio 1":
                "Recreos activos, juegos cooperativos y actividades de convivencia.",

            "Patio 2":
                "Espacio para actividades, encuentros estudiantiles y nuevas propuestas.",

            "Biblioteca":
                "Club de lectura, banco de libros y zona silenciosa de estudio.",

            "áreas verdes 1":
                "Huerto escolar, reciclaje y recuperación de áreas verdes.",

            "áreas verdes 2":
                "Cuidado de plantas, campañas ambientales y espacios de descanso.",

            "piscina":
                "Actividades deportivas, recreativas y propuestas para mejorar el espacio."
        };


        mapSection
            .querySelectorAll(".map-space")
            .forEach((space) => {

                const title =
                    space.dataset.mapSpace ||
                    space.textContent.trim();

                const example =
                    mapExamples[title];

                if (!example) {
                    return;
                }


                let exampleElement =
                    space.querySelector(".map-example");


                if (!exampleElement) {

                    exampleElement =
                        document.createElement("span");

                    exampleElement.className =
                        "map-example";

                    space.appendChild(
                        exampleElement
                    );

                }


                exampleElement.textContent =
                    example;


                /* Seleccionar espacio */

                space.addEventListener(
                    "click",
                    () => {

                        mapSection
                            .querySelectorAll(".map-space")
                            .forEach((item) => {
                                item.classList.remove(
                                    "map-selected"
                                );
                            });

                        space.classList.add(
                            "map-selected"
                        );

                    }
                );

            });

    }


    /* =========================================================
       MENÚ → MAPA
    ========================================================= */

    const nav =
        document.querySelector(".main-nav");

    const mapLink =
        nav?.querySelector('[href="#mapa"]');


    if (mapLink) {

        mapLink.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                const target =
                    document.getElementById("mapa");

                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    /* =========================================================
       MENÚ MÓVIL
    ========================================================= */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mainNav =
        document.querySelector(".main-nav");


    if (menuToggle && mainNav) {

        menuToggle.addEventListener(
            "click",
            () => {

                mainNav.classList.toggle(
                    "nav-open"
                );

                menuToggle.classList.toggle(
                    "active"
                );

            }
        );


        mainNav
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        mainNav.classList.remove(
                            "nav-open"
                        );

                        menuToggle.classList.remove(
                            "active"
                        );

                    }
                );

            });

    }


    /* =========================================================
       HEADER AL HACER SCROLL
    ========================================================= */

    const header =
        document.querySelector(".site-header");


    if (header) {

        const updateHeader =
            () => {

                if (window.scrollY > 30) {

                    header.classList.add(
                        "header-scrolled"
                    );

                } else {

                    header.classList.remove(
                        "header-scrolled"
                    );

                }

            };


        window.addEventListener(
            "scroll",
            updateHeader
        );

        updateHeader();

    }


    /* =========================================================
       ANIMACIONES AL APARECER
    ========================================================= */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, .talent-card, .proposal-card, .mission-card, .participation-card, .testimonial-card, .before-after-grid > *"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach((element) => {

            element.classList.add(
                "scroll-reveal"
            );

            observer.observe(
                element
            );

        });

    }


    /* =========================================================
       CONTADORES DE ESTADÍSTICAS
    ========================================================= */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    counters.forEach((counter) => {

        const target =
            Number(
                counter.dataset.counter
            );

        if (!Number.isFinite(target)) {
            return;
        }


        counter.textContent = "0";


        if (!("IntersectionObserver" in window)) {

            counter.textContent =
                target.toLocaleString();

            return;

        }


        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    if (!entries[0].isIntersecting) {
                        return;
                    }


                    let current = 0;

                    const duration = 1200;

                    const start =
                        performance.now();


                    const animate =
                        (time) => {

                            const progress =
                                Math.min(
                                    (time - start) /
                                    duration,
                                    1
                                );


                            current =
                                Math.floor(
                                    progress * target
                                );


                            counter.textContent =
                                current.toLocaleString();


                            if (
                                progress < 1
                            ) {

                                requestAnimationFrame(
                                    animate
                                );

                            } else {

                                counter.textContent =
                                    target.toLocaleString();

                            }

                        };


                    requestAnimationFrame(
                        animate
                    );


                    observer.unobserve(
                        counter
                    );

                },
                {
                    threshold: 0.6
                }
            );


        counterObserver.observe(
            counter
        );

    });


    /* =========================================================
       BOTONES DE MISIONES
    ========================================================= */

    document
        .querySelectorAll("[data-mission]")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const missionId =
                        button.dataset.mission;

                    const missions =
                        window.MISSIONS_DATA || [];

                    const mission =
                        missions.find(
                            (item) =>
                                String(item.id) ===
                                String(missionId)
                        );


                    if (!mission) {
                        return;
                    }


                    const title =
                        mission.title ||
                        "Misión";


                    const description =
                        mission.description ||
                        "Esta misión forma parte del proyecto.";


                    if (
                        typeof showInfoModal ===
                        "function"
                    ) {

                        showInfoModal(
                            title,
                            description
                        );

                    } else {

                        alert(
                            `${title}\n\n${description}`
                        );

                    }

                }
            );

        });


    /* =========================================================
       BOTONES DE APOYO
    ========================================================= */

    document
        .querySelectorAll("[data-support]")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    button.classList.toggle(
                        "supported"
                    );


                    const number =
                        button.querySelector(
                            "[data-support-count]"
                        );


                    if (!number) {
                        return;
                    }


                    let count =
                        Number(
                            number.textContent
                        ) || 0;


                    if (
                        button.classList.contains(
                            "supported"
                        )
                    ) {

                        count++;

                    } else {

                        count =
                            Math.max(
                                0,
                                count - 1
                            );

                    }


                    number.textContent =
                        count;

                }
            );

        });


    /* =========================================================
       SMOOTH SCROLL PARA EL MENÚ
    ========================================================= */

    document
        .querySelectorAll(
            '.main-nav a[href^="#"]'
        )
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const id =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            id
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =========================================================
       EFECTO DE LUZ EN ELEMENTOS INTERACTIVOS
    ========================================================= */

    document
        .querySelectorAll(
            ".btn, .participation-card, .map-space"
        )
        .forEach((element) => {

            element.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        element.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;


                    element.style.setProperty(
                        "--mouse-x",
                        `${x}px`
                    );

                    element.style.setProperty(
                        "--mouse-y",
                        `${y}px`
                    );

                }
            );

        });

});