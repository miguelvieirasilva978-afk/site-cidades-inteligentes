document.addEventListener('DOMContentLoaded', () => {

    // 1. CORREÇÃO DOS BOTÕES DAS ABAS PRINCIPAIS
    const navTabs = document.querySelectorAll('.nav-tab');
    const sitePages = document.querySelectorAll('.site-page');

    navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = tab.getAttribute('data-target');

            navTabs.forEach(t => t.classList.remove('active'));
            sitePages.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.classList.add('active');
            }
        });
    });

    // 2. CORREÇÃO DOS SUB-FILTROS DE SINGAPURA
    const subFilterBtns = document.querySelectorAll('.btn-subfilter');
    const singapuraBoxes = document.querySelectorAll('.singapura-box');

    subFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const subId = btn.getAttribute('data-sub');

            subFilterBtns.forEach(b => b.classList.remove('active'));
            singapuraBoxes.forEach(box => box.classList.add('hidden'));

            btn.classList.add('active');
            const targetBox = document.getElementById(`sub-${subId}`);
            if (targetBox) {
                targetBox.classList.remove('hidden');
            }
        });
    });

    // 3. ABAS INTERNAS DE TECNOLOGIAS
    const innerTabs = document.querySelectorAll('.inner-tab-btn');
    const innerContents = document.querySelectorAll('.inner-tab-content');

    innerTabs.forEach(btn => {
        btn.addEventListener('click', () => {
            const innerId = btn.getAttribute('data-inner');

            innerTabs.forEach(t => t.classList.remove('active'));
            innerContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(innerId).classList.add('active');
        });
    });

    // 4. PESQUISA TURBINADA
    const inputPesquisa = document.getElementById('inputPesquisa');
    inputPesquisa.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase().trim();

        if (termo === '') {
            // Restaura para a aba ativa no momento
            const activeNav = document.querySelector('.nav-tab.active');
            const activeTarget = activeNav ? activeNav.getAttribute('data-target') : 'tab-inicio';
            sitePages.forEach(p => p.classList.remove('active'));
            document.getElementById(activeTarget).classList.add('active');
            return;
        }

        // Se estiver pesquisando, exibe as abas que contêm o termo
        sitePages.forEach(secao => {
            const texto = secao.innerText.toLowerCase();
            if (texto.includes(termo)) {
                secao.classList.add('active');
            } else {
                secao.classList.remove('active');
            }
        });
    });

    // 5. MAPA MENTAL
    const mapaDados = {
        tec: {
            titulo: 'Tecnologia & Conectividade',
            desc: 'Sensores IoT espalhados por Singapura, infraestrutura 5G e processamento de Big Data.',
            img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
        },
        sus: {
            titulo: 'Sustentabilidade & Água (NEWater)',
            desc: 'Tecnologia de reutilização de água e os Supertrees que geram energia limpa.',
            img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80'
        },
        mob: {
            titulo: 'Mobilidade Inteligente (MRT & ERP)',
            desc: 'Pedágio urbano dinâmico e integração completa com trens de alta frequência.',
            img: 'https://images.unsplash.com/photo-1509017174183-0b7e0278f1ec?auto=format&fit=crop&w=800&q=80'
        }
    };

    document.querySelectorAll('.branch-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const chave = btn.getAttribute('data-mapa');
            const dado = mapaDados[chave];
            if (dado) {
                document.getElementById('mapaTitulo').innerText = dado.titulo;
                document.getElementById('mapaDescricao').innerText = dado.desc;
                const img = document.getElementById('mapaImagem');
                img.src = dado.img;
                img.classList.remove('hidden');
            }
        });
    });

    // 6. ENQUETE
    document.querySelectorAll('.btn-voto').forEach(btn => {
        btn.addEventListener('click', () => {
            const voto = btn.getAttribute('data-voto');
            const res = document.getElementById('resultadoEnquete');
            res.classList.remove('hidden');
            res.innerHTML = `<strong>Voto Confirmado!</strong> Você escolheu: <em>${voto}</em>.`;
        });
    });

    carregarQuiz();
});

// 7. QUIZ COM CONFIRMAÇÃO VISUAL DA RESPOSTA DADA
const perguntasQuiz = [
    "Sua cidade possui aplicativo público centralizado de serviços?",
    "O transporte público tem GPS monitorável em tempo real?",
    "Existem semáforos orientados por Inteligência Artificial?",
    "A cidade conta com coleta seletiva e reciclagem ampla?",
    "Há sensores para prevenção de enchentes ou desastres?",
    "A iluminação pública é feita por LEDs automatizados?"
];

let respostasQuiz = new Array(perguntasQuiz.length).fill(0);

function carregarQuiz() {
    const container = document.getElementById('listaPerguntas');
    if (!container) return;
    container.innerHTML = '';

    perguntasQuiz.forEach((pergunta, index) => {
        const div = document.createElement('div');
        div.className = 'card-pergunta';
        div.id = `card-pergunta-${index}`;
        div.innerHTML = `
            <p style="margin: 0 0 6px;"><strong>${index + 1}.</strong> ${pergunta}</p>
            <div class="btn-group">
                <button type="button" class="btn-ans" onclick="marcarResposta(${index}, 1, this)">Sim</button>
                <button type="button" class="btn-ans" onclick="marcarResposta(${index}, -1, this)">Não</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function marcarResposta(indexPergunta, valor, elemento) {
    const cardPai = document.getElementById(`card-pergunta-${indexPergunta}`);
    const btnGroup = elemento.parentElement;
    
    // Marca o cartão como respondido (ativa a borda verde e a etiqueta ✓)
    cardPai.classList.add('respondida');

    // Remove estilos anteriores dos botões
    btnGroup.querySelectorAll('.btn-ans').forEach(btn => {
        btn.classList.remove('selected-sim', 'selected-nao');
    });

    // Aplica destaque no botão escolhido
    if (valor === 1) {
        elemento.classList.add('selected-sim');
    } else {
        elemento.classList.add('selected-nao');
    }

    respostasQuiz[indexPergunta] = valor;
    calcularScore();
}

function calcularScore() {
    const nomeCidade = document.getElementById('nomeCidade').value.trim();
    const resultadoDiv = document.getElementById('resultadoQuiz');
    const respondidas = respostasQuiz.filter(r => r !== 0).length;

    if (respondidas < perguntasQuiz.length || !nomeCidade) {
        resultadoDiv.classList.add('hidden');
        return;
    }

    const pontos = respostasQuiz.filter(r => r === 1).length;
    resultadoDiv.classList.remove('hidden');
    resultadoDiv.innerHTML = `
        <h4>Pontuação de Maturidade para ${nomeCidade}:</h4>
        <p>Sua cidade atinge <strong>${pontos} de ${perguntasQuiz.length}</strong> critérios de uma Smart City.</p>
    `;
}

document.getElementById('nomeCidade')?.addEventListener('input', calcularScore);
