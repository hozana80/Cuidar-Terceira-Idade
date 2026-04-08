//Importações
const express = require(`express`)
const { criarBanco } = require(`./database`)

const app = express()
app.use(express.json())

app.get(`/`, (req, res) => {
  res.send(`
<body>
<h1> Cuidar Terceira Idade </h1>
<h2> Gestão de Atendimentos de Idosos </h2>
<p> Endpoint que leva aos iniciantes cadastrados: /atendimentos </p>
</body>
  `)
})

app.get("/atendimentos", async (req, res) => {

  const db = await criarBanco()

  const listaAtendimentos = await db.all(`SELECT * FROM atendimentos`)

  res.json(listaAtendimentos)
})

//Rota Específica

app.get("/atendimentos/:id", async (req, res) => {
  const { id } = req.params

  const db = await criarBanco()
  const atendimentoEspecifico = await db.get(`SELECT * FROM atendimentos WHERE id = ?`, [id])
  res.json(atendimentoEspecifico)
})

// Rota novos registros 
app.post("/atendimentos", async (req, res) => {
  const { tipo_atendimento, localizacao, descricao, prioridade, nome_paciente, data_registro, hora_registro } = req.body
  const db = await criarBanco()
  await db.run(
    `INSERT INTO atendimentos(tipo_atendimento, localizacao, descricao, prioridade, nome_paciente, data_registro, hora_registro) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [tipo_atendimento, localizacao, descricao, prioridade, nome_paciente, data_registro, hora_registro])

  res.send(`Atendimento novo registrado: ${tipo_atendimento} registrado na data ${data_registro} por ${nome_paciente}`)
})

// Rota de atualização

app.put("/atendimentos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, prioridade, status_resolucao } = req.body;
    
    // Abre a coneção com o banco de dados
    const db = await criarBanco();

     await db.run(
      `UPDATE atendimentos 
      SET descricao = ?, prioridade = ?, status_resolucao = ? 
      WHERE id = ?`,
      [descricao, prioridade, status_resolucao, id]
    )
    res.send (`o atendimento de id ${id} foi atualizado com sucesso!`)

    if (!result || result.changes === 0) {
      return res.status(404).json({ erro: `Atendimento com id ${id} não encontrado` })
    }

    res.json({ message: `Atendimento ${id} atualizado com sucesso` })
    
  } catch (err) {
    console.error("Erro em PUT /atendimentos/:id", err)
    res.status(500).json({ erro: err.message })
  }
})

app.delete("/atendimentos/:id", async (req, res) => {
  try {
    const { id } = req.params
    const db = await criarBanco()
    const result = await db.run(`DELETE FROM atendimentos WHERE id = ?`, [id])

    if (!result || result.changes === 0) {
      return res.status(404).json({ erro: `Atendimento com id ${id} não encontrado` })
    }

    res.send(`O atendimento de ${id} foi removido com sucesso`)
  } catch (err) {
    console.error("Erro em DELETE /atendimentos/:id", err)
    res.status(500).json({ erro: err.message })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
