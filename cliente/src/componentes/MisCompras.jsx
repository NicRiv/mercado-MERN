import React, {useContext, useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {Context} from '../context/Context'

//css
import '../estilos/miscompras.css'

const MisCompras = () => {
	const {user} = useContext(Context)
	const [vistaModal, setVistaModal] = useState(false)
	const [productoComprado, setProductoComprado] = useState([])

	const [lista, setLista] = useState([])
	useEffect(()=>{
		const obtener = async () =>{
			// for(let i = 0; i < user.misCompras.length; i++){
			for(let i = user.misCompras.length - 1; i >= 0; i--){				
				if(user.misCompras[i] !== '---'){
					const res = await axios.get(`http://localhost:4000/api/productos/stock/${user.misCompras[i]}`)
					setLista(lista => [...lista, res.data])
				} else{
					setLista(lista => [...lista, '---'])
				}
			}
		}
		obtener()
	}, [user])

	//Abre ventana de producto comprado
	const abrirProducto = (compra) => {
		setVistaModal(true)
		setProductoComprado(compra)
	}

	//Cerrar modal del producto
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

	return (
		<div className='MisCompras'>
			Últimas compras
			{lista.length === 0 ?
				<p>No hay compras</p>
				:
				lista.map((compras, index) =>(
					<div key={index}>
						{compras === '---' ? <div className='separador'/>
							:
							<div className='compra-producto'
								onClick={() => abrirProducto(compras)}
							>	
								<b>{compras.nombre}</b>
								<p>${compras.precio}</p>
							</div>
						}	
					</div>
			))}	
			{vistaModal &&
					<div className='vm-inicio'>
						<div className='cont' ref={productoRef}>
							<div className='producto'>
								<div className='cabecera'>
									<p className='titulo'>{productoComprado.nombre}</p>
									<div className='btn-cerrar' onClick={() => setVistaModal(false)}>x</div>									
								</div>
								<div className='descripcion'>
									<p>{productoComprado.descripcion}</p>
								</div>
								<div className='pie'>	
									<p className='precio'>${productoComprado.precio}</p>
									<div className='categoria-cont'><p className='categoria'>{productoComprado.categoria}</p></div>
								</div>							
							</div>
						</div>
					</div>
				}
		</div>
	)
}

export default MisCompras