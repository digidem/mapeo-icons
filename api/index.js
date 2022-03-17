require('dotenv').config()

const express = require('express')
const search = require('./lib/iconSearch')
const generate = require('./lib/generateMapeoIcon')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/search', async function (req, res) {
  const { s = 'tree', l = 'pt' } = req.query
  const data = await search(s, l)
  res.json(data)
})

app.get('/generate', async function (req, res) {
  const { image, color } = req.query
  const data = await generate(image, `#${color}`)
  res.json([
    {
      svg: data,
    },
  ])
})

export default {
  path: '/api',
  handler: app,
}
