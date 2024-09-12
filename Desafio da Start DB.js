class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: "savana", tamanho: 10, animais: [{ especie: "macaco", quantidade: 3 }] },
            { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
            { numero: 3, bioma: "savana e rio", tamanho: 7, animais: [{ especie: "gazela", quantidade: 1 }] },
            { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
            { numero: 5, bioma: "savana", tamanho: 9, animais: [{ especie: "leao", quantidade: 1 }] }
        ];

        this.animais = {
            leao: { tamanho: 3, biomas: ["savana"], carnivoro: true },
            leopardo: { tamanho: 2, biomas: ["savana"], carnivoro: true },
            crocodilo: { tamanho: 3, biomas: ["rio"], carnivoro: true },
            macaco: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
            gazela: { tamanho: 2, biomas: ["savana"], carnivoro: false },
            hipopotamo: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {
        animal = animal.toLowerCase();
        if (!this.animais[animal]) {
            return "Animal inválido";
        }

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return "Quantidade inválida";
        }

        const caracteristicas = this.animais[animal];
        const tamanhoNecessario = caracteristicas.tamanho * quantidade;
        const carnivoro = caracteristicas.carnivoro;
        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            const biomaAdequado = caracteristicas.biomas.some(b => recinto.bioma.includes(b));
            const espacoTotal = recinto.tamanho;
            const espacoOcupado = recinto.animais.reduce((total, a) => total + this.animais[a.especie].tamanho * a.quantidade, 0);
            const espacoExtra = recinto.animais.length > 0 ? 1 : 0;
            const espacoLivre = espacoTotal - espacoOcupado - espacoExtra;

            if (!biomaAdequado) continue;
            if (espacoLivre < tamanhoNecessario) continue;
            if (carnivoro && recinto.animais.some(a => this.animais[a.especie].carnivoro && a.especie !== animal)) continue;
            if (recinto.animais.some(a => this.animais[a.especie].carnivoro && a.especie !== animal)) continue;
            if (animal === "hipopotamo" && recinto.bioma !== "savana e rio" && recinto.animais.length > 0) continue;
            if (animal === "macaco" && recinto.animais.length === 0) continue;
            if (recinto.animais.some(a => a.especie === "macaco") && espacoLivre === tamanhoNecessario + espacoExtra) continue;

            recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - tamanhoNecessario} total: ${espacoTotal})`);
        }

        recintosViaveis.sort((a, b) => parseInt(a.match(/\d+/)) - parseInt(b.match(/\d+/)));

        return recintosViaveis.length ? recintosViaveis : "Não há recinto viável";
    }
}

//export { RecintosZoo as RecintosZoo };
