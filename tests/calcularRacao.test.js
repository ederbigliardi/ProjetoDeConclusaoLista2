const calcularRacao = require("../src/calcularRacao");
const fs = require("fs");
const path = require("path");

// Teste positivo com valores lidos de um arquivo JSON
describe("Teste positivo - calcular_racao_cao (dados de JSON)", () => {
    const dadosValidos = JSON.parse(fs.readFileSync(path.join(__dirname, "dados.json")));

    test.each(dadosValidos)(
        "Para porte $porte e peso $peso, deve retornar $resultado",
        ({ porte, peso, resultado }) => {
            expect(calcularRacao(porte, peso)).toBe(resultado);
        }
    );
});

// Teste negativo com valores lidos de uma lista
describe("Teste negativo - calcular_racao_cao (valores inválidos)", () => {
    // Testes para porte inválido e peso fora da faixa
    describe("Valores inválidos básicos", () => {
        const valoresInvalidos = [
            { porte: "X", peso: 10, desc: "Porte inválido" },
            { porte: "P", peso: -5, desc: "Peso negativo" },
            { porte: "M", peso: 0, desc: "Peso zero" },
            { porte: "G", peso: 150, desc: "Peso maior que 100kg" },
            { porte: 123, peso: 10, desc: "Porte numérico" },
            { porte: null, peso: 10, desc: "Porte nulo" }
        ];

        test.each(valoresInvalidos)(
            "Deve lançar erro para $desc (porte $porte, peso $peso)",
            ({ porte, peso }) => {
                expect(() => calcularRacao(porte, peso)).toThrow();
            }
        );
    });

    // Novos testes para tipos inválidos de peso
    describe("Tipos inválidos de peso", () => {
        test("Deve lançar erro para peso não numérico", () => {
            expect(() => calcularRacao("P", "dez")).toThrow("Peso deve ser um número válido.");
        });

        test("Deve lançar erro para peso como string numérica", () => {
            expect(() => calcularRacao("P", "10")).toThrow("Peso deve ser um número válido.");
        });

        test("Deve lançar erro para peso como booleano", () => {
            expect(() => calcularRacao("P", true)).toThrow("Peso deve ser um número válido.");
        });

        test("Deve lançar erro para peso como array", () => {
            expect(() => calcularRacao("P", [10])).toThrow("Peso deve ser um número válido.");
        });

        test("Deve lançar erro para peso como objeto", () => {
            expect(() => calcularRacao("P", { value: 10 })).toThrow("Peso deve ser um número válido.");
        });

        test("Deve lançar erro para peso como null", () => {
            expect(() => calcularRacao("P", null)).toThrow("Peso deve ser um número válido.");
        });

        test("Deve lançar erro para peso como undefined", () => {
            expect(() => calcularRacao("P", undefined)).toThrow("Peso deve ser um número válido.");
        });
    });
});

// Testes específicos de validação
describe("Testes específicos de validação", () => {
    test("Deve lançar erro para porte vazio", () => {
        expect(() => calcularRacao("", 10)).toThrow();
    });
});

describe("Tipo de retorno", () => {
    test("Deve retornar um número para entradas válidas", () => {
        expect(typeof calcularRacao("P", 5)).toBe("number");
        expect(typeof calcularRacao("M", 10)).toBe("number");
        expect(typeof calcularRacao("G", 20)).toBe("number");
    });
});