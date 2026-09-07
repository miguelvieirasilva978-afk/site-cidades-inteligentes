// 1. Lógica da Barra de Pesquisa em Tempo Real
document.getElementById('inputPesquisa').addEventListener('input', function(e) {
    const termo = e.target.value.toLowerCase().trim();
    const secoes = document.querySelectorAll('.searchable');

    secoes.forEach(secao => {
        const texto = secao.innerText.toLowerCase();
        if (texto.includes(termo)) {
            secao.style.display = 'block';
        } else {
            secao.style.display = 'none';
        }
    });
});

// 2. Lógica da Troca de Abas
function abrirAba(evt, idAba) {
    const conteudos = document.querySelectorAll('.tab-content');
    conteudos.forEach(c => c.classList.remove('active'));

    const botoes = document.querySelectorAll('.tab-btn');
    botoes.forEach(b => b.classList.remove('active'));

    document.getElementById(idAba).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// 3. Lógica do Mapa Mental
function mostrarInfoMapa(titulo, descricao) {
    const box = document.getElementById('infoMapa');
    box.innerHTML = `<strong>${titulo}:</strong> ${descricao}`;
}

// 4. Lógica do Quiz / Modal
const perguntas = [
    "Sua cidade possui aplicativo público funcional para solicitar serviços?",
    "O transporte público conta com rastreamento GPS em tempo real?",
    "Existem semáforos inteligentes ou monitoramento de tráfego por IA?",
    "Há coleta seletiva organizada na maior parte da cidade?",
    "A cidade conta com sensores de monitoramento de enchentes?",
    "Existem pontos de Wi-Fi público gratuito nas principais praças?",
    "A iluminação pública utiliza tecnologia LED automatizada?",
    "A prefeitura permite emitir alvarás 100% online sem burocracia?"
];

let respostas = new Array(perguntas.length).fill(0);

const modal = document.getElementById('quizModal');
const btnAbrirHeader = document.getElementById('btnAbrirQuizHeader');
const btnAbrirHero = document.getElementById('btnAbrirQuizHero');
const btnFechar = document.getElementById('btnFecharModal');
const perguntasContainer = document.getElementById('perguntasContainer');
const resultadoDiv = document.getElementById('resultado');

btnAbrirHeader.addEventListener('click', () => modal.classList.remove('hidden'));
btnAbrirHero.addEventListener('click', () => modal.classList.remove('hidden'));
btnFechar.addEventListener('click', () => modal.classList.add('hidden'));

function carregarPerguntas() {
    perguntasContainer.innerHTML = '';
    perguntas.forEach((pergunta, index) => {
        const card = document.createElement('div');
        card.className = 'card-pergunta';
        card.innerHTML = `
            <p>${index + 1}. ${pergunta}</p>
            <div class="btn-opcao-group">
                <button type="button" class="btn-opcao" onclick="selecionarOpcao(${index}, 1, this)">Sim</button>
                <button type="button" class="btn-opcao" onclick="selecionarOpcao(${index}, -1, this)">Não</button>
            </div>
        `;
        perguntasContainer.appendChild(card);
    });
}

window.selecionarOpcao = function(index, valor, elemento) {
    const pai = elemento.parentElement;
    pai.querySelectorAll('.btn-opcao').forEach(b => b.classList.remove('sim-ativo', 'nao-ativo'));
    
    if (valor === 1) elemento.classList.add('sim-ativo');
    else elemento.classList.add('nao-ativo');
    
    respostas[index] = valor;
    calcularResultado();
};

function calcularResultado() {
    const nomeCidade = document.getElementById('nomeCidade').value.trim();
    const respondidas = respostas.filter(r => r !== 0).length;
    
    if (respondidas < perguntas.length || !nomeCidade) {
        resultadoDiv.classList.add('hidden');
        return;
    }

    const pontos = respostas.filter(r => r === 1).length;
    resultadoDiv.classList.remove('hidden');

    let diagnostico = "";
    if (pontos >= 7) {
        diagnostico = `A cidade de <strong>${nomeCidade}</strong> atingiu a marca de <strong>${pontos}/8 pontos</strong>! Padrão avançado de Smart City.`;
    } else if (pontos >= 4) {
        diagnostico = `A cidade de <strong>${nomeCidade}</strong> somou <strong>${pontos}/8 pontos</strong>. Está em um bom caminho de modernização.`;
    } else {
        diagnostico = `A cidade de <strong>${nomeCidade}</strong> obteve <strong>${pontos}/8 pontos</strong>. Ainda se encontra no estágio inicial de transição digital.`;
    }

    resultadoDiv.innerHTML = `<h3>Diagnóstico de ${nomeCidade}</h3><p>${diagnostico}</p>`;
}

document.getElementById('nomeCidade').addEventListener('input', calcularResultado);
carregarPerguntas();
