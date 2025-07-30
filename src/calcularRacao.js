function calcularRacao(porte, peso) {
    // Validação do porte
    if (!['P', 'M', 'G'].includes(porte)) {
        throw new Error("Porte inválido. Deve ser P, M ou G.");
    }

    // Validação do peso
    if (typeof peso !== 'number' || isNaN(peso)) {
        throw new Error("Peso deve ser um número válido.");
    }

    if (peso <= 0) {
        throw new Error("Peso deve ser maior que zero.");
    }

    if (peso > 100) {
        throw new Error("Peso deve ser menor ou igual a 100kg.");
    }

    // Cálculo da ração
    const multiplicadores = { 'P': 10, 'M': 20, 'G': 30 };
    return peso * multiplicadores[porte];
}

module.exports = calcularRacao;
