import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

export async function getQuestions() {
  const [rows] = await pool.query("SELECT * FROM Questions")
  return rows
}

export async function createQuestions(type, difficulty, question, correct_answer, incorrect_answers) {
  const [result] = await pool.query(`
  INSERT INTO Questions (type, difficulty, question, correct_answer, incorrect_answers)
  VALUES (?, ?, ?, ?, ?)
  `, [type, difficulty, question, correct_answer, incorrect_answers])
  const id = result.insertId
  return id
}