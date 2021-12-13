const router = require('express').Router()
const Producto = require('../models/Producto')


//Publicar producto
router.post('/agregar', async (req, res) => {
	try{
		const nuevoProducto = new Producto({
			nombre: req.body.nombre,
			descripcion: req.body.descripcion,
			categoria: req.body.categoria,
			precio: req.body.precio,
			cantidad: req.body.cantidad
		})
		const producto = await nuevoProducto.save()

		res.status(200).json(producto)
	} catch(err){
		res.status(500).json(err)
	}
})

router.get('/stock', async (req, res) => {
	if(req.query.buscar){
		try{
			const producto = await Producto.find({nombre: {$regex: '.*'+req.query.buscar+'.*', $options:'i'}})
			res.status(200).json(producto)
		} catch(err) {
			res.status(500).json(err)
		}
	} else{
		try{
			const producto = await Producto.find()
			res.status(200).json(producto)
		} catch(err) {
			res.status(500).json(err)
		}	
	}
})

//Obtener producto por categoria
router.get('/stock/categoria', async (req, res) => {
	if(req.query.buscar){
		try{
			const producto = await Producto.find({categoria: {$regex: '.*'+req.query.buscar+'.*', $options:'i'}})
			res.status(200).json(producto)
		} catch(err) {
			res.status(500).json(err)
		}
	}
})

//Obtener producto por id
router.get('/stock/:id', async (req, res) => {
	try{
		const producto = await Producto.findById(req.params.id)
		res.status(200).json(producto)
	} catch(err) {
		res.status(500).json(err)
	}
})

router.put('/stock/:id', async (req, res) => {
	try{
		const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, {
			$set: req.body
		})
		res.status(200).json(productoActualizado)
	} catch(err) {
		res.status(500).json(err)		
	}
})

module.exports = router