/* =========================================
   SMART CITY SINGAPURA
   JAVASCRIPT
========================================= */


/* =========================================
   NAVEGAÇÃO ENTRE ABAS
========================================= */

const navButtons = document.querySelectorAll("[data-tab]");
const tabSections = document.querySelectorAll(".tab-section");


function openTab(tabId) {

    tabSections.forEach(section => {

        section.classList.remove("active");

    });


    navButtons.forEach(button => {

        button.classList.remove("active");

    });


    const selectedSection =
        document.getElementById(tabId);

    if (selectedSection) {

        selectedSection.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    document
        .querySelectorAll(`[data-tab="${tabId}"]`)
        .forEach(button => {

            button.classList.add("active");

        });


    const navigation =
        document.getElementById("navigation");

    navigation.classList.remove("open");
}


navButtons.forEach(button => {

    button.addEventListener("click", () => {

        openTab(button.dataset.tab);

    });

});


/* =========================================
   BOTÕES DO HERO
========================================= */

document
    .querySelectorAll("[data-scroll-tab]")
    .forEach(button => {

        button.addEventListener("click", () => {

            openTab(button.dataset.scrollTab);

        });

    });


/* =========================================
   MENU MOBILE
========================================= */

const mobileMenu =
    document.getElementById("mobileMenu");

const navigation =
    document.getElementById("navigation");


mobileMenu.addEventListener("click", () => {

    navigation.classList.toggle("open");

});


/* =========================================
   FILTROS DE SINGAPURA
========================================= */

const filterButtons =
    document.querySelectorAll(".filter-button");

const infoCards =
    document.querySelectorAll(".info-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(item => {

            item.classList.remove("active");

        });


        button.classList.add("active");


        const filter =
            button.dataset.filter;


        infoCards.forEach(card => {

            if (
                filter === "todos" ||
                card.dataset.category === filter
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


/* =========================================
   MAPA MENTAL
========================================= */

const mindNodes =
    document.querySelectorAll(".mind-node");

const mindInfo =
    document.getElementById("mindInfo");


const mindData = {

    tecnologia: {

        title: "Tecnologia",

        text:
            "Tecnologia é uma das bases de uma Smart City. Sensores, Internet das Coisas, plataformas digitais e análise de dados podem ajudar a cidade a compreender o que está acontecendo em tempo real."

    },


    sustentabilidade: {

        title: "Sustentabilidade",

        text:
            "Sustentabilidade envolve o uso eficiente dos recursos naturais, gestão da água, energia limpa, redução de resíduos e planejamento urbano ambientalmente responsável."

    },


    mobilidade: {

        title: "Mobilidade",

        text:
            "Sistemas inteligentes podem utilizar dados de transporte, GPS, sensores e plataformas digitais para melhorar o deslocamento das pessoas e administrar o trânsito."

    },


    agricultura: {

        title: "Agricultura vertical",

        text:
            "Em uma cidade com território limitado, a agricultura vertical permite utilizar edifícios e ambientes controlados para produzir alimentos em áreas urbanas."

    },


    sociedade: {

        title: "Sociedade",

        text:
            "Uma Smart City não deve ser apenas tecnológica. Participação social, inclusão, cultura, segurança e qualidade de vida são fundamentais para que a inovação beneficie a população."

    }

};


mindNodes.forEach(node => {

    node.addEventListener("click", () => {

        mindNodes.forEach(item => {

            item.classList.remove("active");

        });


        node.classList.add("active");


        const data =
            mindData[node.dataset.node];


        if (!data) return;


        mindInfo.innerHTML = `

            <span>🧠 ${data.title.toUpperCase()}</span>

            <h3>${data.title}</h3>

            <p>${data.text}</p>

        `;

    });

});


/* =========================================
   QUIZ
========================================= */

const quizCards =
    document.querySelectorAll(".quiz-card");

const quizProgress =
    document.getElementById("quizProgress");

const quizProgressText =
    document.getElementById("quizProgressText");

const scoreText =
    document.getElementById("scoreText");

const scoreMessage =
    document.getElementById("scoreMessage");


const correctAnswers = [
    true,
    true,
    true,
    true,
    false
];


let userAnswers =
    new Array(correctAnswers.length).fill(null);


quizCards.forEach((card, index) => {

    const options =
        card.querySelectorAll(".quiz-options button");


    options.forEach(button => {

        button.addEventListener("click", () => {

            const answer =
                button.dataset.answer === "true";


            userAnswers[index] = answer;


            options.forEach(option => {

                option.classList.remove(
                    "selected-yes",
                    "selected-no"
                );

            });


            if (answer) {

                button.classList.add(
                    "selected-yes"
                );

            } else {

                button.classList.add(
                    "selected-no"
                );

            }


            card.classList.add("answered");


            updateQuizProgress();

            checkQuizComplete();

        });

    });

});


function updateQuizProgress() {

    const answered =
        userAnswers.filter(
            answer => answer !== null
        ).length;


    const percentage =
        (answered / correctAnswers.length) * 100;


    quizProgress.style.width =
        `${percentage}%`;


    quizProgressText.textContent =
        `${answered} / ${correctAnswers.length}`;

}


function checkQuizComplete() {

    const complete =
        userAnswers.every(
            answer => answer !== null
        );


    if (!complete) {

        scoreMessage.textContent =
            "Responda todas as perguntas para descobrir seu resultado.";

        return;

    }


    let score = 0;


    userAnswers.forEach((answer, index) => {

        if (
            answer === correctAnswers[index]
        ) {

            score++;

        }

    });


    scoreText.textContent =
        `${score}/${correctAnswers.length}`;


    let message;


    if (score === 5) {

        message =
            "🏆 Excelente! Você domina o conceito de Smart Cities.";

    } else if (score >= 4) {

        message =
            "👏 Muito bom! Você conhece bem o tema.";

    } else if (score >= 3) {

        message =
            "👍 Bom trabalho! Você já conhece os principais conceitos.";

    } else {

        message =
            "📚 Continue estudando! O mapa mental pode ajudar.";

    }


    scoreMessage.textContent =
        message;

}


document
    .getElementById("restartQuiz")
    .addEventListener("click", () => {

        userAnswers =
            new Array(correctAnswers.length).fill(null);


        quizCards.forEach(card => {

            card.classList.remove("answered");


            card
                .querySelectorAll(".quiz-options button")
                .forEach(button => {

                    button.classList.remove(
                        "selected-yes",
                        "selected-no"
                    );

                });

        });


        updateQuizProgress();


        scoreText.textContent =
            "0/5";


        scoreMessage.textContent =
            "Responda todas as perguntas para descobrir seu resultado.";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


/* =========================================
   ENQUETE
========================================= */

const pollButtons =
    document.querySelectorAll("[data-poll]");

const pollFeedback =
    document.getElementById("pollFeedback");


pollButtons.forEach(button => {

    button.addEventListener("click", () => {

        pollButtons.forEach(item => {

            item.classList.remove("selected");

        });


        button.classList.add("selected");


        const choice =
            button.dataset.poll;


        pollFeedback.textContent =
            `✓ Voto registrado: ${choice}`;


        pollFeedback.classList.add("show");

    });

});


/* =========================================
   PESQUISA INTELIGENTE
========================================= */

const searchInput =
    document.getElementById("searchInput");

const searchResults =
    document.getElementById("searchResults");


const searchData = [

    {
        title: "Agricultura vertical",
        description: "Plano 30 por 30 e produção de alimentos",
        tab: "singapura",
        category: "agricultura"
    },

    {
        title: "PIB e economia",
        description: "Economia, comércio e dados de Singapura",
        tab: "singapura",
        category: "economia"
    },

    {
        title: "IoT",
        description: "Internet das Coisas e sensores urbanos",
        tab: "tecnologias",
        category: "todos"
    },

    {
        title: "NEWater",
        description: "Tecnologia de reciclagem de água",
        tab: "singapura",
        category: "curiosidades"
    },

    {
        title: "Supertrees",
        description: "Arquitetura, vegetação e sustentabilidade",
        tab: "singapura",
        category: "curiosidades"
    },

    {
        title: "Chiclete",
        description: "Curiosidade sobre as regras de Singapura",
        tab: "singapura",
        category: "curiosidades"
    },

    {
        title: "Smart Grid",
        description: "Redes elétricas inteligentes",
        tab: "tecnologias",
        category: "todos"
    },

    {
        title: "Mobilidade",
        description: "ERP, GPS e transporte inteligente",
        tab: "tecnologias",
        category: "todos"
    },

    {
        title: "Virtual Singapore",
        description: "Modelagem e planejamento urbano digital",
        tab: "singapura",
        category: "economia"
    },

    {
        title: "Hawker Centres",
        description: "Cultura e alimentação em Singapura",
        tab: "singapura",
        category: "cultura"
    }

];


searchInput.addEventListener("input", () => {

    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    if (!query) {

        searchResults.classList.remove("active");

        searchResults.innerHTML = "";

        return;

    }


    const results =
        searchData.filter(item =>

            `${item.title} ${item.description}`
                .toLowerCase()
                .includes(query)

        );


    if (results.length === 0) {

        searchResults.innerHTML = `

            <div class="search-result">

                <strong>Nenhum resultado</strong>

                <small>
                    Tente outro termo.
                </small>

            </div>

        `;

        searchResults.classList.add("active");

        return;

    }


    searchResults.innerHTML =
        results
            .slice(0, 6)
            .map(item => `

                <div
                    class="search-result"
                    data-search-tab="${item.tab}"
                    data-search-category="${item.category}"
                >

                    <strong>
                        ${item.title}
                    </strong>

                    <small>
                        ${item.description}
                    </small>

                </div>

            `)
            .join("");


    searchResults.classList.add("active");


    document
        .querySelectorAll(".search-result[data-search-tab]")
        .forEach(result => {

            result.addEventListener("click", () => {

                openTab(
                    result.dataset.searchTab
                );


                const category =
                    result.dataset.searchCategory;


                if (
                    category &&
                    category !== "todos"
                ) {

                    filterButtons.forEach(button => {

                        button.classList.remove("active");

                        if (
                            button.dataset.filter === category
                        ) {

                            button.classList.add("active");

                        }

                    });


                    infoCards.forEach(card => {

                        card.classList.toggle(
                            "hidden",
                            card.dataset.category !== category
                        );

                    });

                }


                searchInput.value = "";

                searchResults.classList.remove(
                    "active"
                );

            });

        });

});


/* =========================================
   FECHAR PESQUISA AO CLICAR FORA
========================================= */

document.addEventListener("click", event => {

    if (
        !event.target.closest(
            ".search-container"
        )
    ) {

        searchResults.classList.remove(
            "active"
        );

    }

});


/* =========================================
   TECLADO
========================================= */

document.addEventListener("keydown", event => {

    if (
        event.key === "/" &&
        document.activeElement !== searchInput
    ) {

        event.preventDefault();

        searchInput.focus();

    }

});


/* =========================================
   INICIALIZAÇÃO
========================================= */

updateQuizProgress();
