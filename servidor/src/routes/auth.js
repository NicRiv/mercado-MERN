const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

//Registro
router.post('/registrar', async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(10)
		const hashedPass = await bcrypt.hash(req.body.password, salt)
		const nuevoUsuario = new User({
			nombre: req.body.nombre,
			username: req.body.username,
			email: req.body.email,
			password: hashedPass,
			misCompras: req.body.misCompras
		})
		const usuario = await nuevoUsuario.save()

		res.status(200).json(usuario)
	} catch(err) {
		res.status(500).json(err)
	}
})

//login
router.post('/login', async (req, res) => {
	try{
		const usuario = await User.findOne({
			username: req.body.username
		})
		!usuario && res.status(400).json('No existe usuario')

		const validated = await bcrypt.compare(req.body.password, usuario.password)
		!validated && res.status(400).json('La contraseña no coincide')

		const {password, ...otros} = usuario._doc

		res.status(200).json(otros)
	} catch(err) {
		res.status(500).json(err)
	}
})

// //prueba
router.get('/usuario/:id/datos', async (req, res) => {
	try{
		const usuario = await User.findById(req.params.id)
		const { password, ...otros } = usuario._doc;
    	res.status(200).json(otros)
	} catch(err) {
		res.status(500).json(err)
	}
})

//Actualizar usuario (misCosas) , Falta el middleware para cancelar ruta
router.put('/usuario/:id', async (req, res) => {
	if(req.body.userId === req.params.id){
		try{
			const updateUsuario = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body
			})
			res.status(200).json(updateUsuario)
		} catch(err) {
			res.status(500).json(err)
		}
	} else {
		res.status(401).json('no hay autorizacion')
	}
})

module.exports = router