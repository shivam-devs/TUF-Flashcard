import express from 'express'

import { getQuestions, createQuestions } from './database.js'

const app = express()

app.use(express.json())

app.get("api/questions", async (req, res) => {
  const notes = await getQuestions()
  res.send(notes)
})

app.post("/questions", async (req, res) => {
  const { type, difficulty, question, correct_answer, incorrect_answers } = req.body
  const note_id = await createQuestions(type, difficulty, question, correct_answer, incorrect_answers)
  res.status(200).send({'msg':'created !'})
})


app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke 💩')
})

app.listen(8080, () => {
  console.log('Server is running on port 8080')
})