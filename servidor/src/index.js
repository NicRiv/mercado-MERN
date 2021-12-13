require('dotenv').config()

const app = require('./app')
require('./baseDeDatos') //ejecutar en consola 'mongod'

const inicio = async () => {
	await app.listen(app.get('port'))
	console.log(`Escuchando en puerto: ${app.get('port')}`)
}

inicio()