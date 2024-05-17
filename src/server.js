import express from 'express'

const app = express()

const hostname = 'localhost'
const port = 8017

app.get('/', function (req, res) {
  res.send('<h1> Hello TAKIFY </h1>')
})

app.listen(port, hostname, () => {
  console.log(`Hello TAKIFY, I'm running server at ${hostname}:${port}/`)
})