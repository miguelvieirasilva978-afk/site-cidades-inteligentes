// Lista de Perguntas do Quiz
const perguntas = [
    "Sua cidade possui aplicativo público funcional para solicitar serviços e fazer denúncias urbanas?",
    "O transporte público conta com rastreamento GPS em tempo real disponível para os cidadãos?",
    "Existem semáforos inteligentes ou monitoramento de tráfego integrado por câmeras/IA?",
    "Há coleta seletiva organizada e abrangente na maior parte da cidade?",
    "A cidade conta com sensores digitais de monitoramento de enchentes ou riscos climáticos?",
    "Existem pontos de Wi-Fi público gratuito nas principais praças ou estações?",
    "A iluminação pública utiliza tecnologia LED automatizada?",
    "A prefeitura permite emitir certidões e alvarás 100% online sem burocracia presencial?"
];

// Estado das Respostas (0 para não respondido, 1 para Sim, -1 para Não)
let respostas = new Array(perguntas.length).fill(0);

// Elementos da Interface
const modal = document.getElementById('quizModal');
const btnAbrirHeader = document.getElementById('btnAbrirQuizHeader');
const btnAbrirHero = document.getElementById('btnAbrirQuizHero');
const btnFechar = document.getElementById('btnFecharModal');
const perguntasContainer = document.getElementById('perguntasContainer');
const resultadoDiv = document.getElementById('resultado');

// Funções para Abrir e Fechar Modal
function abrirModal() {
    modal.classList.remove('hidden');
}

function fecharModal() {
    modal.classList.add('hidden');
}

btnAbrirHeader.addEventListener('click', abrirModal);
btnAbrirHero.addEventListener('click', abrirModal);
btnFechar.addEventListener('click', fecharModal);

// Renderizar Perguntas com Botões Animados de Sim e Não
function carregarPerguntas() {
    perguntasContainer.innerHTML = '';
    
    perguntas.forEach((pergunta, index) => {
        const card = document.createElement('div');
        card.className = 'card-pergunta';
        
        card.innerHTML = `
            <p>${index + 1}. ${pergunta}</p>
            <div class="btn-opcao-group">
                <button type="button" class="btn-opcao btn-sim" onclick="selecionarOpcao(${index}, 1, this)">Sim</button>
                <button type="button" class="btn-opcao btn-nao" onclick="selecionarOpcao(${index}, -1, this)">Não</button>
            </div>
        `;
        
        perguntasContainer.appendChild(card);
    });
}

// Função ao clicar em Sim ou Não
window.selecionarOpcao = function(index, valor, elemento) {
    const pai = elemento.parentElement;
    const botoes = pai.querySelectorAll('.btn-opcao');
    
    // Reseta classes do grupo
    botoes.forEach(b => b.classList.remove('sim-ativo', 'nao-ativo'));
    
    if (valor === 1) {
        elemento.classList.add('sim-ativo');
    } else {
        elemento.classList.add('nao-ativo');
    }
    
    respostas[index] = valor;
    calcularResultado();
};

// Função de Cálculo Automático do Diagnóstico
function calcularResultado() {
    const nomeCidade = document.getElementById('nomeCidade').value.trim();
    const respondidas = respostas.filter(r => r !== 0).length;
    
    // Só calcula o resultado completo se responder todas as perguntas e informar o nome
    if (respondidas < perguntas.length || !nomeCidade) {
        resultadoDiv.classList.add('hidden');
        return;
    }

    const pontos = respostas.filter(r => r === 1).length;
    resultadoDiv.classList.remove('hidden');

    let diagnostico = "";

    if (pontos >= 7) {
        diagnostico = `A cidade de <strong>${nomeCidade}</strong> atingiu a impressionante marca de <strong>${pontos}/8 pontos</strong>! Ela apresenta padrões internacionais avançados de Smart City, destacando-se na integração tecnológica, inovação contínua e qualidade de vida para os cidadãos.`;
    } else if (pontos >= 4) {
        diagnostico = `A cidade de <strong>${nomeCidade}</strong> somou <strong>${pontos}/8 pontos</strong>. Ela já percorreu um caminho importante de modernização urbana, mas ainda precisa evoluir em pontos cruciais (como maior presença de sensores digitais ou automação avançada) para alcançar o nível de cidades como Singapura ou Barcelona.`;
    } else {
        diagnostico = `A cidade de <strong>${nomeCidade}</strong> obteve <strong>${pontos}/8 pontos</strong>. Ela ainda se encontra em estágios iniciais de transição digital. Faltam investimentos em infraestrutura inteligente, desburocratização e tecnologias focadas na sustentabilidade.`;
    }

    resultadoDiv.innerHTML = `
        <h3>Diagnóstico de ${nomeCidade}</h3>
        <p>${diagnostico}</p>
    `;
}

// Atualiza o resultado em tempo real caso a pessoa digite o nome depois de ter marcado as opções
document.getElementById('nomeCidade').addEventListener('input', calcularResultado);

// Inicializa a lista de perguntas
carregarPerguntas();
