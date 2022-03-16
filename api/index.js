const express = require('express')
const { search } = require('./lib/search')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/search', async function (req, res) {
  const { s = 'tree', c = 'black' } = req.query
  const data = await search(s, c)
  res.json(data)
})

export default {
  path: '/api',
  handler: app,
}
