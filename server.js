const express = require('express');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Função para conectar ao banco de dados
async function connectDB() {
  return await open({
    filename: './database.db',
    driver: sqlite3.Database,
  });
}

// Rota para obter todos os atendimentos
app.get('/atendimentos', async (req, res) => {
  try {
    const db = await connectDB();
    const atendimentos = await db.all('SELECT * FROM atendimentos');
    await db.close();
    res.json(atendimentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para obter um atendimento por ID
app.get('/atendimentos/:id', async (req, res) => {
  try {
    const db = await connectDB();
    const atendimento = await db.get('SELECT * FROM atendimentos WHERE id = ?', req.params.id);
    await db.close();
    if (atendimento) {
      res.json(atendimento);
    } else {
      res.status(404).json({ error: 'Atendimento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para criar um novo atendimento
app.post('/atendimentos', async (req, res) => {
  try {
    const { tipo_atendimento, localizacao, descricao, prioridade, nome_paciente, data_registro, hora_registro } = req.body;
    const db = await connectDB();
    const result = await db.run(
      'INSERT INTO atendimentos (tipo_atendimento, localizacao, descricao, prioridade, nome_paciente, data_registro, hora_registro) VALUES (?, ?, ?, ?, ?, ?, ?)',
      tipo_atendimento, localizacao, descricao, prioridade, nome_paciente, data_registro, hora_registro
    );
    await db.close();
    res.status(201).json({ id: result.lastID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar o status de um atendimento
app.put('/atendimentos/:id', async (req, res) => {
  try {
    const { status_resolucao } = req.body;
    const db = await connectDB();
    await db.run('UPDATE atendimentos SET status_resolucao = ? WHERE id = ?', status_resolucao, req.params.id);
    await db.close();
    res.json({ message: 'Atendimento atualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para deletar um atendimento
app.delete('/atendimentos/:id', async (req, res) => {
  try {
    const db = await connectDB();
    await db.run('DELETE FROM atendimentos WHERE id = ?', req.params.id);
    await db.close();
    res.json({ message: 'Atendimento deletado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inicializar o banco de dados ao iniciar o servidor
async function initDB() {
  const db = await connectDB();
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
  // Inserir dados iniciais se vazio
  const checagem = await db.get('SELECT COUNT(*) AS total FROM atendimentos');
  if (checagem.total === 0) {
    await db.exec(`
      INSERT INTO atendimentos (tipo_atendimento, localizacao, descricao, prioridade, nome_paciente, data_registro, hora_registro) VALUES 
      ('Medicação', 'Rua das Flores, 123, Bairro das Margaridas', 'Paciente tomou medicação corretamente', 'Alta', 'Dona Maria', '16/03/2026', '10:30'),
      ('Alimentação', 'Avenida C', 'Preparação da alimentação e dieta recomendada', 'Média', 'Antonio', '16/03/2026', '22:15'),
      ('Monitoramento', 'Rua das Camélias, 52', 'Verificação de pressão arterial, temperatura e sinais vitais', 'Média', 'Julia Martins', '13/03/2026', '10:00'),
      ('Mobilidade', 'Hospital JP2, Bairro D', 'Perna Quebrada', 'Alta', 'Maria Oliveira', '14/03/2026', '14:30'),
      ('Acompanhamento', 'Rua T, 146, Jardim Imbarie', 'Conversa, companhia e estímulo emocional', 'Baixa', 'Dona Fofoca', '16/03/2026', '10:00')
    `);
  }
  await db.close();
  console.log('Banco de dados inicializado');
}

app.listen(PORT, async () => {
  await initDB();
  console.log(`Servidor rodando na porta ${PORT}`);
});