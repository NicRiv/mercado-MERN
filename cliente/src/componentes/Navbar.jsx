import React, {useContext, useState, useEffect, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {Context} from '../context/Context'
//css
import '../estilos/navbar.css'

const Navbar = () => {
	const navigate = useNavigate()
	const {user, listaProductos, dispatch} = useContext(Context)
	const [notificacionCompra, setNotificacionCompra] = useState(0)

	//Abre menu modal del usuario
	const [menu, setMenu] = useState(false)	
	const abrirMenu = () => {
		setMenu(!menu)
		//se realizo compra y pasa notificacion a Mis Compras
		if(notificacionCompra === 1) setNotificacionCompra(2)
	}

	//Cierra menu modal del usuario
	const menuUsuarioRef = useRef()
	const btnMenuUsuarioRef = useRef()
	useEffect(()=>{
		const ventana = e => {
			if(menuUsuarioRef.current && !menuUsuarioRef.current.contains(e.target)){
				if(!btnMenuUsuarioRef.current.contains(e.target)){
					setMenu(false)
				}
			}
		}
		const esc = e => {
			if(e.key === 'Escape'){
				setMenu(false)	
			}			
		}
		document.addEventListener('mousedown', ventana)
		document.addEventListener('keydown', esc)
		
		return () => {
			document.removeEventListener('mousedown', ventana)
			document.removeEventListener('keydown', esc)
		}
	})

	//Clic en Mis Compras
	const clicMisCompras = () => {
		setMenu(false)
		if(notificacionCompra === 2) setNotificacionCompra(0)
	}

	//Cerrar sesion
	const cerrarSesion = () =>{
		setMenu(false)
		dispatch({type: 'LOGOUT'})
		navigate('/login')
	} 
	
	//---CARRITO
	//Sacar producto de la lista para comprar
	const eliminarProducto = id => {
		dispatch({
			type: 'SACAR_CAR',
			idObj: id
		})
	}

	// Obtener productos
	const [productosCarrito, setProductosCarrito] = useState([])
	useEffect(() => {
		setProductosCarrito([])
		const obtener = async () => {
			for(const i in listaProductos){
				const res = await axios.get(`http://localhost:4000/api/productos/stock/${listaProductos[i]}`)
				setProductosCarrito(productosCarrito => [...productosCarrito, res.data])
			}
		}
		obtener()
	}, [listaProductos])

	//Ventana del Carrito
	const [carritoModal, setCarritoModal] = useState(false)
	const abrirCarrito = () => {
		setCarritoModal(true)
	}

	//Cerrar ventana del carrito
	const carritoRef = useRef()
	useEffect(()=>{
		const ventana = e => {
			if(carritoRef.current && !carritoRef.current.contains(e.target)){
				setCarritoModal(false)
			}
		}
		const esc = e => {
			if(e.key === 'Escape'){
				setCarritoModal(false)	
			}
		}
		document.addEventListener('mousedown', ventana)
		document.addEventListener('keydown', esc)
		
		return () => {
			document.removeEventListener('mousedown', ventana)
			document.removeEventListener('keydown', esc)
		}
	})

	//Calcula importe de los productos agregados
	let importe = 0	
	for(const i in productosCarrito){
		importe += productosCarrito[i].precio
	}

	//Comprar lista de productos
	const [compraRealizada, setCompraRealizada] = useState(false)
	const comprar = async () => {
		await axios.put(`http://localhost:4000/api/auth/usuario/${user._id}`, {
			//No agrego todos los datos porq en mongoose puse: $set
			userId: user._id,
			// misCompras: productosCarrito //sin historial de compras; se resetea en cada compra
			// misCompras: [...user.misCompras, ...listaProductos, 'fecha: ' + new Date()] // con historial de compras
			misCompras: [...user.misCompras, '---', ...listaProductos] // con historial de compras
		})

		const usuarioActualizado = await axios.get(`http://localhost:4000/api/auth/usuario/${user._id}/datos`)
		await dispatch({
			type: 'COMPRAR',
			compra: usuarioActualizado.data
		})

		//actualizar cantidad de los productos en BD
		for(const i in productosCarrito){
			await axios.put(`http://localhost:4000/api/productos/stock/${productosCarrito[i]._id}`, {
				cantidad: productosCarrito[i].cantidad - 1
			})
		}

		setProductosCarrito([]) //Limpia el carrito de los productos cargados
		setNotificacionCompra(1) //Envia msg de notificacion
		setCarritoModal(false) //Cierra ventana de carrito
		setCompraRealizada(true) //Abre cartel de compra realizada
	}

	//Cerrar cartel de compra realizada
	useEffect(()=>{
		const ventana = () => {
			setCompraRealizada(false)
		}
		const esc = e => {
			if(e.key === 'Escape'){
				setCompraRealizada(false)	
			}
		}
		document.addEventListener('mousedown', ventana)
		document.addEventListener('keydown', esc)
		
		return () => {
			document.removeEventListener('mousedown', ventana)
			document.removeEventListener('keydown', esc)
		}
	})

	const [busqueda, setBusqueda] = useState()
	const buscar = async e => {
		e.preventDefault()
		if(busqueda && busqueda.trim() !== ''){
			dispatch({
					type: 'BUSCAR',
					busca: busqueda
			})
			if(user){
				navigate('/sesion/busqueda')				
			} else {
				navigate('/busqueda')
			}			
		}
	}

	return (
		<div className='Navbar'>
			<div className='logo-cont'>
				{user ? 
					<Link to='/sesion' className='logo'>Mercado</Link>
					:
					<Link to='/' className='logo'>Mercado</Link>
				}
			</div>
			<div className='buscar-cont'>
				<form onSubmit={buscar}
					className='buscar-form'
				>
					<input type="search"
						className='buscar'
						name='buscar'
						placeholder='Buscar...'
						onChange={e => setBusqueda(e.target.value)}
					/>
				</form>			
			</div>
			<div className='sesion-cont'>
				{user ? 
					(<>
						<div className='btn-carrito' onClick={abrirCarrito} style={{cursor: 'pointer'}}>
							<div className='btn-carrito-cont'>							
								<i className="fas fa-cart-arrow-down" />
								<p>Carrito</p>
								{listaProductos.length !== 0 ? 
									<div className='notificacion'/>
									:
									<div className='notificacion-inactiva'/>
								}
							</div>
						</div>
						{
							carritoModal && (<>
								<div className='carrito-modal'>
									<div className='cm-ventana' ref={carritoRef}>
										<div className='cabecera'>
											<p>Productos seleccionados</p>
											<div className='btn-cm-cerrar' 
												onClick={() => setCarritoModal(false)}>x</div>
										</div>
										<div className='cuerpo'>
											{listaProductos.length === 0 ?
												<p><i>No hay productos agregados</i></p>
												:
												productosCarrito.length !== 0 &&
													productosCarrito.map(producto => (
														<div className='l-producto' 
															key={producto._id}>
															<div className='l-p-info'>
																<b>{producto.nombre}</b>
																<p>${producto.precio}</p>
															</div>
															<div>
																<div className='eliminar-producto'
																	onClick={() => eliminarProducto(producto._id)}
																>
																	Eliminar
																</div>
															</div>
														</div>
													))
											}
										</div>
										<div className='pie'>
											<p>Importe total: ${importe}</p>
											<div className='btn-comprar' 
												onClick={comprar}>Comprar</div>
										</div>
									</div>
								</div>
							</>)
						}
						{compraRealizada &&
							<div className='compra-realizada'>
								<div className='cr-contenido'>
									<b>Compra realizada</b>
								</div>
							</div>
						}
						<div onClick={abrirMenu} style={{cursor: 'pointer'}}>
							<div className='btn-usuario' ref={btnMenuUsuarioRef}>							
								<p>{user.nombre}</p>
								{notificacionCompra === 1 ? 
									<div className='notificacion'/>
									:
									<div className='notificacion-inactiva'/>
								}
							</div>
						</div>
						{
							menu && (<>
								<div className='menu' ref={menuUsuarioRef}>
									<div className='menu-cont' ref={menuUsuarioRef}>
										<Link to='/sesion' onClick={() => setMenu(false)}>
											<div className='fila-menu'>										
												<div className='fila-menu-int'>
													<div className='icono'><i className="fas fa-store-alt"/></div>
													<p>Inicio</p>
												</div>
											</div>
										</Link>
										<Link to='/miscompras' onClick={clicMisCompras}>
											<div className='fila-menu'>
												<div className='fila-menu-int'>
													<div className='icono'><i className="fas fa-shopping-bag"/></div>
													<p>Mis compras</p>
													{notificacionCompra === 2 ? 
														<div className='notificacion'/>
														:
														<div className='notificacion-inactiva'/>
													}
												</div>
											</div>									
										</Link>
										<Link to='/configuracion' onClick={() => setMenu(false)}>
											<div className='fila-menu'>
												<div className='fila-menu-int'>
													<div className='icono'><i className="fas fa-cog"/></div>
													<p>Configuracion</p>
												</div>
											</div>
										</Link>
										<div className='fila-menu' onClick={cerrarSesion}>
											<div className='fila-menu-int'>
												<div className='icono'><i className="fas fa-door-open"/></div>
												<p>Salir</p>	
											</div>
										</div>
									</div>
								</div>
							</>)
						}
					</>)
					:
					<Link to='/login' className='acceder'>
						<div className='btn-acceder'>
							<p>Acceder</p>
						</div>
					</Link>
				}
			</div>	
		</div>
	)
}

export default Navbar