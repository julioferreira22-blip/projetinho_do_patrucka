const express = require("express") 
const app = express() 
app.use(express.json()) 
const port = 3000 
const db = require("./bd") 


app.get("/aula", async (req, res) => { 
    try {
        const resultado = await db.pool.query("SELECT * FROM aula") 
        res.status(200).json(resultado[0])
    } catch (erro) {
        res.status(500).json({ erro: erro.message })
    }
})


app.delete("/aula/:id", async (req, res) => {
    try {
        const id = req.params.id
        const resultado = await db.pool.query("DELETE FROM aula WHERE id = ?", [id]) 

      
        if (resultado[0].affectedRows === 0) {
            return res.status(404).json({ mensagem: "Aula não encontrada." })
        }

        res.status(200).json({ mensagem: "Aula deletada com sucesso!" })
    } catch (erro) {
 
        if (erro.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(400).json({ erro: "Não é possível apagar esta aula pois ela já tem horários cadastrados." })
        }
        res.status(500).json({ erro: erro.message })
    }
})


app.post("/horario", async (req, res) => {
    try {
        const { dia, hora, aula_id } = req.body

        await db.pool.query(
            "INSERT INTO horario (dia, hora, aula_id) VALUES (?, ?, ?)",
            [dia, hora, aula_id]
        )

        res.status(201).json({ mensagem: "Horário cadastrado com sucesso!" })
    } catch (erro) {
      
        if (erro.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({ erro: "Erro: A aula informada não existe!" })
        }

        res.status(500).json({ erro: erro.message }) 
    }
})


app.get("/horario/:dia", async (req, res) => {
    try {
        const dia = req.params.dia
        const resultado = await db.pool.query("SELECT * FROM horario WHERE dia = ?", [dia]) 

        res.status(200).json(resultado[0]) 
    } catch (erro) {
        res.status(500).json({ erro: erro.message }) 
    }
})


app.delete("/horario/:id", async (req, res) => {
    try {
        const id = req.params.id
        const resultado = await db.pool.query("DELETE FROM horario WHERE id = ?", [id]) 

        if (resultado[0].affectedRows === 0) {
            return res.status(404).json({ mensagem: "Horário não encontrado." })
        }

        res.status(200).json({ mensagem: "Horário deletado com sucesso!" })
    } catch (erro) {
        res.status(500).json({ erro: erro.message }) 
    }
})

app.listen(port, () => { 
    console.log("API rodando na porta " + port) 
})