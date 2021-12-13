const mongoose = require('mongoose')

const URI = process.env.MONGODB_URI ? 
		process.env.MONGODB_URI : 'mongodb://localhost/db-prueba'

mongoose.connect(URI, {
	useNewUrlParser: true
})

const conexion = mongoose.connection
conexion.once('error', (err) => console.log(err))
conexion.once('open', () => console.log('BD conectada'))