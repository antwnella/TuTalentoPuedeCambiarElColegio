document.addEventListener("DOMContentLoaded", () => {

    const config = window.PROJECT_CONFIG || {};
    const missions = window.MISSIONS_DATA || [];

    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

        mainNav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });
    }


    /* =====================================================
       CONTADORES ANIMADOS
    ===================================================== */

    const counters = document.querySelectorAll(".counter");

    function animateCounter(element) {

        const target = Number(element.dataset.target);

        if (!Number.isFinite(target)) {
            return;
        }

        const duration = 1300;
        const startTime = performance.now();

        function update(currentTime) {

            const elapsed = currentTime - startTime;

            const progress = Math.min(
                elapsed / duration,
                1
            );

            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            const currentValue =
                Math.round(target * easedProgress);

            element.textContent =
                currentValue.toLocaleString("es-PE");

            if (progress < 1) {
                requestAnimationFrame(update);
            }

        }

        requestAnimationFrame(update);
    }


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            animateCounter(entry.target);

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.5
                }
            );

        counters.forEach((counter) => {
            counterObserver.observe(counter);
        });

    } else {

        counters.forEach((counter) => {
            animateCounter(counter);
        });

    }


    /* =====================================================
       MODAL
    ===================================================== */

    const modalOverlay =
        document.getElementById("modalOverlay");

    const modalClose =
        document.getElementById("modalClose");


    function escapeHTML(value) {

        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }


    function showInfoModal(title, message) {

        const modalContent =
            document.getElementById("modalContent");

        const modalTitle =
            document.getElementById("modalTitle");

        const modalDescription =
            document.getElementById("modalDescription");

        const modalEyebrow =
            document.getElementById("modalEyebrow");


        if (
            !modalOverlay ||
            !modalContent ||
            !modalTitle ||
            !modalDescription
        ) {

            alert(
                `${title}\n\n${message}`
            );

            return;
        }


        if (modalEyebrow) {
            modalEyebrow.textContent =
                "INFORMACIÓN";
        }


        modalTitle.textContent = title;

        modalDescription.textContent =
            message;

        modalContent.innerHTML = "";


        modalOverlay.classList.add("active");

        modalOverlay.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";
    }


    function closeModal() {

        if (!modalOverlay) {
            return;
        }

        modalOverlay.classList.remove("active");

        modalOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";
    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    modalOverlay
                ) {
                    closeModal();
                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                modalOverlay?.classList.contains(
                    "active"
                )
            ) {
                closeModal();
            }

        }
    );


    /* =====================================================
       GOOGLE FORMS / ENLACES EXTERNOS
    ===================================================== */

    function openExternalLink(
        url,
        title
    ) {

        if (
            typeof url !== "string" ||
            !url.trim()
        ) {

            showInfoModal(
                "ENLACE PENDIENTE",
                `El enlace de ${title} todavía no está configurado en config.py.`
            );

            return;
        }


        try {

            const parsedUrl =
                new URL(url.trim());


            if (
                parsedUrl.protocol !== "http:" &&
                parsedUrl.protocol !== "https:"
            ) {

                showInfoModal(
                    "ENLACE NO VÁLIDO",
                    "El enlace configurado no utiliza HTTP o HTTPS."
                );

                return;
            }


            window.location.href =
                parsedUrl.href;

        } catch (error) {

            showInfoModal(
                "ENLACE NO VÁLIDO",
                "Revisa que el enlace configurado esté completo y sea válido."
            );

        }

    }


    const externalButtons =
        document.querySelectorAll(
            "[data-external]"
        );


    externalButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const type =
                    button.dataset.external;


                if (type === "talentos") {

                    openExternalLink(
                        config.GOOGLE_FORM_TALENTOS_URL,
                        "DESCUBRIR MI TALENTO"
                    );

                    return;
                }


                if (type === "propuestas") {

                    openExternalLink(
                        config.GOOGLE_FORM_PROPUESTAS_URL,
                        "PROPONER UNA IDEA"
                    );

                    return;
                }


                if (type === "participacion") {

                    openExternalLink(
                        config.GOOGLE_FORM_PARTICIPACION_URL,
                        "PARTICIPACIÓN"
                    );

                    return;
                }


                if (type === "padlet") {

                    openExternalLink(
                        config.PADLET_URL,
                        "PADLET"
                    );

                    return;
                }

            }
        );

    });


    /* =====================================================
       APOYAR IDEAS
    ===================================================== */

    const supportButtons =
        document.querySelectorAll(
            "[data-support]"
        );


    supportButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                if (
                    button.classList.contains(
                        "supported"
                    )
                ) {

                    showInfoModal(
                        "YA APOYASTE ESTA IDEA",
                        "Esta interacción es solamente una demostración local."
                    );

                    return;
                }


                const card =
                    button.closest(
                        ".idea-card"
                    );


                if (!card) {
                    return;
                }


                let countElement =
                    card.querySelector(
                        ".support-count"
                    );


                if (!countElement) {

                    const bottom =
                        card.querySelector(
                            ".idea-bottom"
                        );

                    if (bottom) {

                        const supportSpan =
                            document.createElement(
                                "span"
                            );

                        supportSpan.className =
                            "support-count";

                        supportSpan.textContent =
                            "1";

                        bottom.appendChild(
                            supportSpan
                        );

                        countElement =
                            supportSpan;
                    }

                }


                if (countElement) {

                    const currentCount =
                        Number.parseInt(
                            countElement.textContent,
                            10
                        );

                    if (
                        Number.isFinite(
                            currentCount
                        )
                    ) {

                        countElement.textContent =
                            currentCount + 1;
                    }

                }


                button.classList.add(
                    "supported"
                );

                button.textContent =
                    "IDEA APOYADA";


                showInfoModal(
                    "APOYO REGISTRADO",
                    "Tu apoyo se registró únicamente como una interacción de demostración. No se guardó en una base real."
                );

            }
        );

    });


    /* =====================================================
       MISIONES
    ===================================================== */

    function findMissionById(id) {

        return missions.find(
            (mission) =>
                String(mission.id) ===
                String(id)
        );

    }


    function createMissionModal(mission) {

        if (!mission) {

            showInfoModal(
                "MISIÓN NO ENCONTRADA",
                "No fue posible encontrar la información de esta misión."
            );

            return;
        }


        const modalContent =
            document.getElementById(
                "modalContent"
            );

        const modalTitle =
            document.getElementById(
                "modalTitle"
            );

        const modalDescription =
            document.getElementById(
                "modalDescription"
            );

        const modalEyebrow =
            document.getElementById(
                "modalEyebrow"
            );


        if (
            !modalContent ||
            !modalTitle ||
            !modalDescription ||
            !modalOverlay
        ) {
            return;
        }


        if (modalEyebrow) {

            modalEyebrow.textContent =
                `MISIÓN #${mission.number ?? ""}`;
        }


        modalTitle.textContent =
            mission.title || "Misión";


        modalDescription.textContent =
            mission.objective ||
            mission.description ||
            "";


        let html = "";


        html += `
            <div class="modal-detail-list">
        `;


        if (mission.problem) {

            html += `
                <div class="modal-detail-item">
                    <small>PROBLEMA</small>
                    <strong>
                        ${escapeHTML(
                            mission.problem
                        )}
                    </strong>
                </div>
            `;

        }


        if (mission.status) {

            html += `
                <div class="modal-detail-item">
                    <small>ESTADO</small>
                    <strong>
                        ${escapeHTML(
                            mission.status
                        )}
                    </strong>
                </div>
            `;

        }


        if (mission.participants) {

            html += `
                <div class="modal-detail-item">
                    <small>PARTICIPANTES</small>
                    <strong>
                        ${escapeHTML(
                            mission.participants
                        )}
                    </strong>
                </div>
            `;

        }


        if (mission.location) {

            html += `
                <div class="modal-detail-item">
                    <small>LUGAR</small>
                    <strong>
                        ${escapeHTML(
                            mission.location
                        )}
                    </strong>
                </div>
            `;

        }


        if (mission.date) {

            html += `
                <div class="modal-detail-item">
                    <small>FECHA</small>
                    <strong>
                        ${escapeHTML(
                            mission.date
                        )}
                    </strong>
                </div>
            `;

        }


        if (mission.result) {

            html += `
                <div class="modal-detail-item">
                    <small>RESULTADO</small>
                    <strong>
                        ${escapeHTML(
                            mission.result
                        )}
                    </strong>
                </div>
            `;

        }


        if (mission.goal) {

            html += `
                <div class="modal-detail-item">
                    <small>META</small>
                    <strong>
                        ${escapeHTML(
                            mission.goal
                        )}
                    </strong>
                </div>
            `;

        }


        if (mission.team) {

            html += `
                <div class="modal-detail-item">
                    <small>EQUIPO</small>
                    <strong>
                        ${escapeHTML(
                            mission.team
                        )}
                    </strong>
                </div>
            `;

        }


        html += `
            </div>
        `;


        if (
            Array.isArray(
                mission.steps
            ) &&
            mission.steps.length
        ) {

            html += `
                <div class="modal-steps">

                    <span class="eyebrow dark-eyebrow">
                        PASOS DE LA MISIÓN
                    </span>
            `;


            mission.steps.forEach(
                (step, index) => {

                    html += `
                        <div class="modal-step">
                            <span>
                                ${String(
                                    index + 1
                                ).padStart(2, "0")}
                            </span>

                            <div>
                                ${escapeHTML(
                                    step
                                )}
                            </div>
                        </div>
                    `;

                }
            );


            html += `
                </div>
            `;

        }


        modalContent.innerHTML =
            html;


        modalOverlay.classList.add(
            "active"
        );

        modalOverlay.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";
    }


    const missionButtons =
        document.querySelectorAll(
            "[data-mission-id]"
        );


    missionButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const missionId =
                    button.dataset.missionId;

                const mission =
                    findMissionById(
                        missionId
                    );

                createMissionModal(
                    mission
                );

            }
        );

    });


    /* =====================================================
       MAPA INTERACTIVO
    ===================================================== */

    const mapSpaces =
        document.querySelectorAll(
            ".map-space"
        );


    mapSpaces.forEach((space) => {

        space.addEventListener(
            "click",
            () => {

                const title =
                    space.textContent
                        .trim()
                        .replace(/\s+/g, " ")
                        .toUpperCase();


                const descriptions = {

                    "BIBLIOTECA":
                        "Lugar que puede concentrar iniciativas relacionadas con lectura, aprendizaje y estudio.",

                    "ÁREA VERDE":
                        "Espacio donde podrían desarrollarse propuestas relacionadas con ambiente y sostenibilidad.",

                    "PATIO":
                        "Zona que puede convertirse en escenario para actividades de convivencia y participación.",

                    "ZONA DEPORTIVA":
                        "Espacio para iniciativas relacionadas con deporte, actividad física y trabajo en equipo.",

                    "ESPACIO COMUNITARIO":
                        "Lugar pensado para fortalecer la integración y convivencia entre estudiantes.",

                    "ZONA TECNOLÓGICA":
                        "Espacio asociado a propuestas de tecnología, creatividad e innovación."
                };


                const description =
                    descriptions[title] ||
                    "Este espacio forma parte de la visualización de impacto del proyecto.";


                showInfoModal(
                    title,
                    `${description} Esta información es de demostración.`
                );

            }
        );

    });


    /* =====================================================
       ANIMACIONES AL HACER SCROLL
    ===================================================== */

    const animatedElements =
        document.querySelectorAll(
            `
            .feature-card,
            .talent-card,
            .idea-card,
            .mission-card,
            .testimonial-card,
            .participant-card,
            .impact-stat,
            .chart-card,
            .image-placeholder-card,
            .hero-image-card,
            .hero-floating-card,
            .wall-card,
            .large-photo-card,
            .proposal-image-card,
            .impact-photo-card
            `
        );


    animatedElements.forEach(
        (element, index) => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(18px)";

            element.style.transition =
                `
                opacity 0.65s ease,
                transform 0.65s ease
                `;

            element.style.transitionDelay =
                `${Math.min(index * 0.035, 0.25)}s`;
        }
    );


    if ("IntersectionObserver" in window) {

        const animationObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.style.opacity =
                                    "1";

                                entry.target.style.transform =
                                    "translateY(0)";

                                observer.unobserve(
                                    entry.target
                                );
                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        animatedElements.forEach(
            (element) => {

                animationObserver.observe(
                    element
                );

            }
        );

    } else {

        animatedElements.forEach(
            (element) => {

                element.style.opacity =
                    "1";

                element.style.transform =
                    "translateY(0)";

            }
        );

    }


    console.log(
        "Tu Talento Puede Cambiar el Colegio — plataforma cargada correctamente."
    );

});