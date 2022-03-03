import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios'

import demoDB from '../db-demo/demo.json'

//css
import '../estilos/inicio.css'

const Inicio = () => {
	// Cargar datos demo a la DB
	useEffect(() => {
		const subir = async () => {
			const res = await axios.get('http://localhost:4000/api/productos/stock')
			if (res.data.length === 0) {
				for (const pos in demoDB) {
					await axios.post('http://localhost:4000/api/productos/agregar', {
						nombre: demoDB[pos].nombre,
						descripcion: demoDB[pos].descripcion,
						categoria: demoDB[pos].categoria,
						precio: demoDB[pos].precio,
						cantidad: demoDB[pos].cantidad
					})
				}
				obtener()
			}
		}
		subir()	
	}, [])
	
	// Inicio
	const [listaMusica, setListaMusica] = useState([])
	const [listaTecnologia, setListaTecnologia] = useState([])
	const [listaDeportes, setListaDeportes] = useState([])

	const obtener = async () =>{
		const resM = await axios.get('http://localhost:4000/api/productos/stock/categoria?buscar=Música')
		setListaMusica(resM.data)
		
		const resT = await axios.get('http://localhost:4000/api/productos/stock/categoria?buscar=Tecno')
		setListaTecnologia(resT.data)

		const resD = await axios.get('http://localhost:4000/api/productos/stock/categoria?buscar=Deporte')
		setListaDeportes(resD.data)
	}

	useEffect(()=>{
		obtener()
	}, [])
	
	const [vistaModal, setVistaModal] = useState(null)
	const [producto, setProducto] = useState(null)
	//Abre modal
	const modal = (productoObt) => {
		setVistaModal(true)
		setProducto(productoObt)
	}

	//Cierra vista modal
	const productoRef = useRef()
	useEffect(()=>{
		const ventana = e => {
			if(productoRef.current && !productoRef.current.contains(e.target)){
				setVistaModal(false)
			}
		}
		const esc = e => {
			if(e.key === 'Escape'){
				setVistaModal(false)	
			}
		}
		document.addEventListener('mousedown', ventana)
		document.addEventListener('keydown', esc)
		
		return () => {
			document.removeEventListener('mousedown', ventana)
			document.removeEventListener('keydown', esc)			
		}
	})

	const [estilo1, setEstilo1] = useState()
	const [estilo2, setEstilo2] = useState()
	const [estilo3, setEstilo3] = useState()

	const [estiloBtn1I, setEstiloBtn1I] = useState({opacity: '0'})
	const [estiloBtn1D, setEstiloBtn1D] = useState({opacity: '1'})
	const [estiloBtn2I, setEstiloBtn2I] = useState({opacity: '0'})
	const [estiloBtn2D, setEstiloBtn2D] = useState({opacity: '1'})
	const [estiloBtn3I, setEstiloBtn3I] = useState({opacity: '0'})
	const [estiloBtn3D, setEstiloBtn3D] = useState({opacity: '1'})

	const der1 = () =>{
		setEstilo1({transform: 'translateX(-432%)'})
		setEstiloBtn1D({opacity: '0'})
		setEstiloBtn1I({opacity: '1'})
	}
	const izq1 = () =>{
		setEstilo1({transform: 'translateX(0%)'})
		setEstiloBtn1I({opacity: '0'})
		setEstiloBtn1D({opacity: '1'})
	}

	const der2 = () =>{
		setEstilo2({transform: 'translateX(-432%)'})
		setEstiloBtn2D({opacity: '0'})
		setEstiloBtn2I({opacity: '1'})
	}
	const izq2 = () =>{
		setEstilo2({transform: 'translateX(0%)'})
		setEstiloBtn2I({opacity: '0'})
		setEstiloBtn2D({opacity: '1'})
	}

	const der3 = () =>{
		setEstilo3({transform: 'translateX(-432%)'})
		setEstiloBtn3D({opacity: '0'})
		setEstiloBtn3I({opacity: '1'})
	}
	const izq3 = () =>{
		setEstilo3({transform: 'translateX(0%)'})
		setEstiloBtn3I({opacity: '0'})
		setEstiloBtn3D({opacity: '1'})
	}

	return (
		<div className='Inicio'>
			<div className='inicio-cont'>
				{vistaModal &&
					<div className='vm-inicio'>
						<div className='cont' ref={productoRef}>
							<div className='producto'>
								<div className='cabecera'>
									<p className='titulo'>{producto.nombre}</p>
									<div className='btn-cerrar' onClick={() => setVistaModal(false)}>x</div>									
								</div>
								<div className='descripcion'>
									<p>{producto.descripcion}</p>
								</div>
								<div className='pie'>	
									<p className='precio'>${producto.precio}</p>
									<div className='categoria-cont'><p className='categoria'>{producto.categoria}</p></div>
									{producto.cantidad !== 0 ? 
										<p className='cantidad'>Disponibles: {producto.cantidad}</p>
										:
										<p className='cantidad'><i>Producto no disponible</i></p>
									}
								</div>							
							</div>
						</div>
					</div>
				}
				<div className='seccion'> 
					<p className='categoria-titulo'>Música</p>
					<div className='productos-stock'>
						<div className='btn-stock' onClick={izq1} style={estiloBtn1I}> {'<'} </div>
						<div className='stock-cont'>
						{listaMusica.length !== 0 &&
							listaMusica.slice(0, 8).map((item,index) => (
								<div className='tarjeta-producto' 
									key={index}
									onClick={() => modal(item)}
									style={estilo1}
								>
									<div className='titulo'>							
										<h3>{item.nombre}</h3>
									</div>
									<div className='desc'>
										<p>{item.descripcion}</p>								
									</div>
									<div className='pie'>										
										<div className='precio'>
											${item.precio}
										</div>
										<div className='categoria'>
											<p>{item.categoria}</p>
										</div>
										<div className='cantidad'>
											{item.cantidad !== 0 ?
												<p>Disponibles: {item.cantidad}</p>
												:
												<p><i>Producto no disponible</i></p>
											}
										</div>
									</div>
								</div>
						))}
						</div>
						<div className='btn-stock' onClick={der1} style={estiloBtn1D}> {'>'} </div>
					</div>
				</div>
				<div className='seccion'> 
					<p className='categoria-titulo'>Tecnología</p>
					<div className='productos-stock'>
						{<div className='btn-stock' onClick={izq2} style={estiloBtn2I}> {'<'} </div>}
						<div className='stock-cont'>
						{listaTecnologia.length !== 0 &&
							listaTecnologia.slice(0, 8).map((item,index) => (
								<div className='tarjeta-producto' 
									key={index}
									onClick={() => modal(item)}
									style={estilo2}
								>
									<div className='titulo'>							
										<h3>{item.nombre}</h3>
									</div>
									<div className='desc'>
										<p>{item.descripcion}</p>								
									</div>
									<div className='pie'>
										<div className='precio'>
											${item.precio}
										</div>
										<div className='categoria'>
											<p>{item.categoria}</p>
										</div>
										<div className='cantidad'>
											{item.cantidad !== 0 ?
												<p>Disponibles: {item.cantidad}</p>
												:
												<p><i>Producto no disponible</i></p>
											}
										</div>
									</div>
								</div>
						))}
						</div>	
						<div className='btn-stock' onClick={der2} style={estiloBtn2D}> {'>'} </div>
					</div>
				</div>
				<div className='seccion'> 
					<p className='categoria-titulo'>Deportes</p>
					<div className='productos-stock'>
						{<div className='btn-stock' onClick={izq3} style={estiloBtn3I}> {'<'} </div>}
						<div className='stock-cont'>
						{listaDeportes.length !== 0 &&
							listaDeportes.slice(0, 8).map((item,index) => (
								<div className='tarjeta-producto' 
									key={index}
									onClick={() => modal(item)}
									style={estilo3}
								>
									<div className='titulo'>							
										<h3>{item.nombre}</h3>
									</div>
									<div className='desc'>
										<p>{item.descripcion}</p>								
									</div>
									<div className='pie'>
										<div className='precio'>
											${item.precio}
										</div>
										<div className='categoria'>
											<p>{item.categoria}</p>
										</div>
										<div className='cantidad'>
											{item.cantidad !== 0 ?
												<p>Disponibles: {item.cantidad}</p>
												:
												<p><i>Producto no disponible</i></p>
											}
										</div>
									</div>
								</div>
						))}
						</div>	
							<div className='btn-stock' onClick={der3} style={estiloBtn3D}> {'>'} </div>
						</div>
					</div>
			</div>
		</div>
	)
}

export default Inicio