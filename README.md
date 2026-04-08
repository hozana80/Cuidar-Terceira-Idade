# 🚀 Cuidar Terceira Idade

## 📌 Sobre o Projeto
A API **Cuidar Terceira Idade** foi criada para registrar e gerenciar problemas de atendimento, como:

- Medicação
- Alimentação
- Monitoramento
- Mobilidade
- Acompanhamento
- Higiene

Essa API
nos permite criar, visualizar, atualizar e deletar ocorrências.


## 🛠️ Tecnologias utilizadas

- Node.js
- Express
- SQLite
- SQLite3
- Postman
- Nodemon

---
## 📦 Instalação
 `npm install`

 ---


 ## ▶️ Como Executar
```bash
npm run dev
```


`http:localhost:3000
`
[Clique Aqui](http:localhost:300)

---


## 🗄️ Banco de Dados
O banco de dados é criado automaticamente
ao iniciar o projeto.

```
database.db
```

## 🧾 Tabela
|Campo             |     Descrição           |
|------------------|-------------------------|
|id                |Identificador único      |
|tipo_atendimento  |Tipo do atendimento         |
|localizacao       |Onde ocorreu             |
|descricao         |Detalhes do atendimento    |
|prioridade        |Baixa, Média ou Alta     |    
|nome_paciente     |Quem foi atendido          |
|data_registro     |Data do registro         |
|hora_registro     |Hora do registro         |
|status_resolucao  |Status (Padrão: Pendente)|


---


## 🔗 Endpoints


### Rota Inicial


##
```http
GET /
```
Retorna uma página HTML simples com informações
da API.

---


```http
GET /Atendimento
```


### Rota para listar todos os incidentes
```

## Rota para buscar um atendimento específico
(ID)
```http
GET /Atendimentos/:id

## Rota para buscar um atendimento específico
EX: /atendimento/1


## Rota para buscar um atendimento específico
### Rota para criar um novo atendimento

```http
POST / atendimentos
```

### Body (JSON)

```json

### BODY (JSON)



 {
        "tipo_atendimento": "Medicação",

        "localizacao": "Rua das Flores, 123, Bairro das Margaridas",

        "descricao": "Paciente tomou medicação corretamente",

        "prioridade": "Alta",

        "nome_paciente": "Dona Maria",

        "data_registro": "16/03/2026",

        "hora_registro": "10:30"
    }
```

### Rota para atualizar

```http
PUT /atendimentos/:id
```
### Body (JSON)
```json
{ 
"descricao": "Paciente tomou medicação corretamente",
"prioridade": "Média",
"status_resoluca": " Em analise"
}
```
### Rota para deletar um atendimento
```http
DELETE /atendimento/:id
```

---

##  🔐Segurança
A API utiliza `?` nas queries SQL:

```sql
WHERE id = ?
```

Isso evita o SQL Injection

----

## Conceitos

- CRUD (Create, Read, Uldate e Delete)
- Rotas com Express
- Metodos/Verbos HTTP(GET, POST, PUT,DELETE)
- Bloco de dados SQLite
- SQL básico
- uso de `req.params` e `req.body`
---

## 🎯 Observaçãoes

- o banco é criado automaticamente
- Dados iniciais são inseridos apenas se estiverer vazio
- A API pode ser testada com o Postman


## 👩‍💻 Projeto educacional
Este projeto foi desenvolvido para fins de aprendizado em back-end com node.js.



< ! -- ## Esses emojis é um padrão em praticamente TODO README:

## 🚀 Nome da API / Projeto
## 📌 Sobre o Projeto
## 🎯 Objetivo
## 🛠️ Tecnologias
## 📦 Instalação
## ▶️ Como Executar
## ⚙️ Configurações
## 🗄️ Banco de Dados
## 🔗 Endpoints
## 🔐 Segurança
## 📚 Conceitos
## 💡 Dicas / Melhorias
##  👩‍💻 Autor

---

## 📖 Descrição
## 🔧 Ferramentas
## 💻 Ambiente
## 📊 Dados
## 🧾 Tabela
## 📡 Requisições
## 📥 Entrada de dados
## 📤 Saída de dados
## 🚫 Bloqueios / proteção
## 🧠 Aprendizado
## 🎓 Educacional
## ⚠️ Atenção
## ❗Importante
## 🤝 Contribuição
## 📄 Licença