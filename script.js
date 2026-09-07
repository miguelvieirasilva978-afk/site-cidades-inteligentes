document.addEventListener('DOMContentLoaded', () => {

    // 1. Troca de Abas Principais do Site (Navegação Real)
    const navTabs = document.querySelectorAll('.nav-tab');
    const sitePages = document.querySelectorAll('.site-page');

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');

            navTabs.forEach(t => t.classList.remove('active'));
            sitePages.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // 2. Troca de Abas Internas (Tecnologias)
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

    // 3. Pesquisa Global
    const inputPesquisa = document.getElementById('inputPesquisa');
    inputPesquisa.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase().trim();
        document.querySelectorAll('.searchable').forEach(secao => {
            const texto = secao.innerText.toLowerCase();
            if (termo === '') {
                // Se a busca for limpa, restaura a navegação normal por aba
                const activeTabId = document.querySelector('.nav-tab.active').getAttribute('data-target');
                secao.style.display = (secao.id === activeTabId) ? 'block' : 'none';
            } else {
                secao.style.display = texto.includes(termo) ? 'block' : 'none';
            }
        });
    });

    carregarQuiz();
});

// 4. Troca de Sub-Conteúdos de Singapura
function mostrarConteudoSingapura(secao) {
    document.querySelectorAll('.btn-subfilter').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.singapura-box').forEach(box => box.classList.add('hidden'));

    event.target.classList.add('active');
    document.getElementById(`singapura-${secao}`).classList.remove('hidden');
}

// 5. Atualização do Mapa Mental
function carregarMapa(titulo, descricao, imgUrl) {
    document.getElementById('mapaTitulo').innerText = titulo;
    document.getElementById('mapaDescricao').innerText = descricao;
    
    const img = document.getElementById('mapaImagem');
    img.src = imgUrl;
    img.classList.remove('hidden');
}

// 6. Questionário com Animação nos Botões
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
    container.innerHTML = '';

    perguntasQuiz.forEach((pergunta, index) => {
        const div = document.createElement('div');
        div.className = 'card-pergunta';
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
    const pai = elemento.parentElement;
    
    // Remove animações/classes anteriores daquela pergunta
    pai.querySelectorAll('.btn-ans').forEach(btn => {
        btn.classList.remove('selected-sim', 'selected-nao');
    });

    // Aplica a animação e o estado selecionado
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
        <p>Sua cidade atinge <strong>${pontos} de ${perguntasQuiz.length}</strong> critérios avaliados.</p>
    `;
}

document.getElementById('nomeCidade').addEventListener('input', calcularScore);

// 7. Enquete
function votar(opcao) {
    const box = document.getElementById('resultadoEnquete');
    box.classList.remove('hidden');
    box.innerHTML = `<strong>Voto Confirmado!</strong> Você indicou: <em>${opcao}</em> como prioridade.`;
}
