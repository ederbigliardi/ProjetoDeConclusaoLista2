// src/calcularRacao.js

function calcular_racao_cao(porte, peso) {
    if (peso <= 0 || peso > 100) {
        throw new Error("Peso inválido. O peso deve ser maior que 0 e menor ou igual a 100kg.");
    }
    if (['P', 'M', 'G'].indexOf(porte) === -1) {
        throw new Error("Porte inválido. Deve ser P, M ou G.");
    }

    let quantidadeRacao;
    switch (porte) {
        case 'P':
            quantidadeRacao = peso * 10; // 10g por kg
            break;
        case 'M':
            quantidadeRacao = peso * 20; // 20g por kg
            break;
        case 'G':
            quantidadeRacao = peso * 30; // 30g por kg
            break;
    }
    return quantidadeRacao;
}

module.exports = calcular_racao_cao;
