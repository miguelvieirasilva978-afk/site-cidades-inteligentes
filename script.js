document.addEventListener('DOMContentLoaded', () => {

    // 1. Troca de Abas
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-aba');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 2. Busca Dinâmica e Inteligente
    const inputPesquisa = document.getElementById('inputPesquisa');
    inputPesquisa.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase().trim();
        document.querySelectorAll('.searchable').forEach(secao => {
            const texto = secao.innerText.toLowerCase();
            secao.style.display = texto.includes(termo) ? 'block' : 'none';
        });
    });

});

// 3. Atualização do Mapa Mental
function atualizarMapa(titulo, descricao, imagemUrl) {
    document.getElementById('mapaTitulo').innerText = titulo;
    document.getElementById('mapaTexto').innerText = descricao;
    
    const imgElement = document.getElementById('mapaImagem');
    imgElement.src = imagemUrl;
    imgElement.classList.remove('hidden');
}

// 4. Sistema de Votação
function votar(opcao) {
    const box = document.getElementById('resultadoEnquete');
    box.classList.remove('hidden');
    box.innerHTML = `<strong>Voto registrado!</strong> Sua escolha para prioridade de design/infraestrutura foi: <em>${opcao}</em>.`;
}

// 5. Quiz de Avaliação da Cidade
const perguntas = [
    "Sua cidade possui aplicativo público para serviços?",
    "O transporte público conta com GPS em tempo real?",
    "Existem semáforos inteligentes ou monitoramento por IA?",
    "Há coleta seletiva na maior parte da cidade?",
    "A cidade conta com sensores de enchentes?",
    "Existem pontos de Wi-Fi público gratuito?",
    "A iluminação pública utiliza tecnologia LED automatizada?",
    "A prefeitura permite emitir documentos 100% online?"
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
            <p style="margin: 0 0 8px;">${index + 1}. ${pergunta}</p>
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
    resultadoDiv.innerHTML = `<h3>Resultado para ${nomeCidade}</h3><p>Sua cidade fez <strong>${pontos}/8 pontos</strong> em maturidade para Smart City.</p>`;
}

document.getElementById('nomeCidade').addEventListener('input', calcularResultado);
carregarPerguntas();
