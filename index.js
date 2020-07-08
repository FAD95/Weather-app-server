const express = require('express')
const router = express.Router()
const cors = require('cors')
const app = express()
const port = 8080
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./src/API/index.js')

require('dotenv').config()

// Aqui estamos configurando express para usar body-parser como middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.use(express.static(path.join(__dirname, 'public'))) // esta linea que hace?


app.get('/', (req, res) => {
  //esto es para manejar la peticion en localhost:/
  res.sendFile(path.join(__dirname, 'public', 'index.html')) //responde con un archivo
})

app.post('/', (req, res) => {  
  let data = req.body  
  api(data)
    .then((e) => {
      res.json(e)
      res.end()
    })
    .catch(handleFatalError)
})

app.use('/', router)
app.listen(port, () => {
  console.log(`Server on:  http://localhost:${port}`)
})

function handleFatalError(err) {
  console.error(err.message)
  console.error(err.stack)
}
