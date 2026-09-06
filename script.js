document.getElementById('btnCalcular').addEventListener('click', function() {
    const nomeCidade = document.getElementById('nomeCidade').value.trim();
    
    if (!nomeCidade) {
        alert('Por favor, digite o nome da sua cidade antes de calcular!');
        return;
    }

    let pontuacao = 0;
    const totalPerguntas = 8;

    // Percorre as 8 perguntas e conta os "Sim"
    for (let i = 1; i <= totalPerguntas; i++) {
        const radios = document.getElementsByName('p' + i);
        for (const radio of radios) {
            if (radio.checked && radio.value === 'sim') {
                pontuacao++;
            }
        }
    }

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.classList.remove('hidden');

    let diagnostico = "";
    
    // Algoritmo de decisão baseado no placar
    if (pontuacao >= 7) {
        diagnostico = `A cidade de <strong>${nomeCidade}</strong> atingiu a pontuação máxima de <strong>${pontuacao}/${totalPerguntas}</strong>! Ela apresenta padrões avançados de Smart City, destacando-se em integração digital, governança eficiente e tecnologias focadas na qualidade de vida dos cidadãos.`;
    } else if (pontuacao >= 4) {
        diagnostico = `A cidade de <strong>${nomeCidade}</strong> somou <strong>${pontuacao}/${totalPerguntas} pontos</strong>. Embora faltem alguns pilares cruciais para ser uma Smart City plena (como sensores de gestão ou digitalização completa), a cidade já mostra um grande caminho percorrido em pontos de desenvolvimento e modernização urbana.`;
    } else {
        diagnostico = `A cidade de <strong>${nomeCidade}</strong> obteve <strong>${pontuacao}/${totalPerguntas} pontos</strong>. Ela ainda se encontra nos estágios iniciais de transição. Falta um avanço maior em infraestrutura digital, automação e políticas sustentáveis para alcançar o patamar de cidade inteligente.`;
    }

    resultadoDiv.innerHTML = `
        <h3>Diagnóstico Urbano: ${nomeCidade}</h3>
        <p>${diagnostico}</p>
    `;

    resultadoDiv.scrollIntoView({ behavior: 'smooth' });
});
