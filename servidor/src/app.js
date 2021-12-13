const express = require('express')
const cors = require('cors')
const app = express()

//configuracion
app.set('port', process.env.PORT || 4000)

//middleware
app.use(cors())
app.use(express.json())

//routes
app.use('/api/auth', require('./routes/auth')) //Para sesion de usuario
app.use('/api/productos', require('./routes/productos')) //Store de productos

module.exports = app