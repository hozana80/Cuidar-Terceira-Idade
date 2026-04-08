const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

// Criando uma função assíncrona
const criarBanco = async () => {
const db = await open({
filename: "./database.db",
driver: sqlite3.Database,
});

// Criando a tabela de atendimentos
await db.exec(`
CREATE TABLE IF NOT EXISTS atendimentos(
id INTEGER PRIMARY KEY AUTOINCREMENT,
tipo_atendimento TEXT,
localizacao TEXT,
descricao TEXT,
prioridade TEXT,
nome_paciente TEXT,
data_registro TEXT,
hora_registro TEXT,
status_resolucao TEXT DEFAULT 'Pendente'
)
`);

console.log(
"Banco de dados configurado: A tabela de atendimentos está pronta!",
);

const checagem = await db.get(`SELECT COUNT(*) AS total FROM atendimentos`);


if (checagem.total === 0) {
await db.exec(`
INSERT INTO atendimentos (tipo_atendimento, localizacao, descricao, prioridade, nome_paciente, data_registro, 
hora_registro) VALUES 
("Medicação", "Rua das Flores, 123, Bairro das Margaridas", "Paciente tomou medicação corretamente", "Alta", "Dona Maria", "16/03/2026", "10:30"),
("Alimentação", "Avenida C", "Preparação da alimentação e dieta recomendada", "Média", "Antonio","16/03/2026", "22:15"),
("Monitoramento ", "Rua das Camélias, 52", "Verificação de pressão arterial, temperatura e sinais vitais", "Média", "Julia Martins", "13/03/2026", "10:00"),
("Mobilidade", "Hospital JP2, Bairro D","Perna Quebrada", "Alta", "Maria Oliveira","14/03/2026", "14:30"),
("Acompanhamento", "Rua T, 146, Jardim Imbarie", "Conversa, companhia e estímulo emocional", "Baixa", "Dona Fofoca", "16/03/2026", "10:00")
`);
} else { 

  console.log(`Banco pronto com ${checagem.total} atendimentos!`);
}

//=============================
//Select - R do CRUD - READ
//=============================

const todosOsAtendimentos = await db.all(
`SELECT * FROM atendimentos`);
console.table(todosOsAtendimentos);

// Exemplo de SELECT específico

const chamadosDonaMaria = await db.all(
    `SELECT * FROM atendimentos WHERE nome_paciente = "Dona Maria"`);

console.table(chamadosDonaMaria);


//UPDATE 

await db.run(`
UPDATE atendimentos 
SET status_resolucao = "Em analise"
WHERE data_registro = "16/03/2026"
`);

console.log("Todos as reclamações do dia 16/03/2026 tiveram uma atualização");

await db.run(`
UPDATE atendimentos
SET status_resolucao = "Resolvido"
WHERE tipo_atendimento = "Alimentação"
`);

console.log("Paciente alimentado corretamente"); 

await db.run(`DELETE FROM atendimentos WHERE id = 2`);


//Relatório/SELECT final
//console.log("Relatório Atualizado(FINAL)");

const resultadoFinal = await db.all(`SELECT * FROM atendimentos`);

console.table(resultadoFinal);

return db;  // retorna o banco ( entregando)a chave do banco para alguém)
};

// Chamando a função para criar o banco de dados
module.exports = { criarBanco };
