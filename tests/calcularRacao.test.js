const calcularRacao = require("../src/calcularRacao");
const fs = require("fs");

// Teste positivo com valores lidos de um arquivo JSON
describe("Teste positivo - calcular_racao_cao (dados de JSON)", () => {
    const dadosValidos = JSON.parse(fs.readFileSync("dados.json"));

    test.each(dadosValidos)(
        "Para porte $porte e peso $peso, deve retornar $resultado",
        ({ porte, peso, resultado }) => {
            expect(calcularRacao(porte, peso)).toBe(resultado);
        }
    );
});

// Teste negativo com valores lidos de uma lista
describe("Teste negativo - calcular_racao_cao (valores inválidos de uma lista)", () => {
    const valoresInvalidos = [
        { porte: "X", peso: 10 },  // Porte inválido
        { porte: "P", peso: -5 },  // Peso negativo
        { porte: "M", peso: 0 },   // Peso zero
        { porte: "G", peso: 150 }  // Peso maior que 100kg
    ];

    test.each(valoresInvalidos)(
        "Deve lançar erro para porte $porte e peso $peso",
        ({ porte, peso }) => {
            expect(() => calcularRacao(porte, peso)).toThrow();
        }
    );
});
