import React, {useContext, useState} from 'react'
import axios from 'axios'
import {Context} from '../context/Context'

//css
import '../estilos/configuracion.css'

const Configuracion = () => {
	const {dispatch, user} = useContext(Context)

	const [nombre, setNombre] = useState(user.nombre)
	const [email, setEmail] = useState(user.email)
	const [error, setError] = useState(false)
	const [mensaje, setMensaje] = useState(false)

	const guardarCambios = async e => {
		e.preventDefault()
		setError(false)
		try{
			const res = await axios.put(`http://localhost:4000/api/auth/usuario/${user._id}`, {
				userId: user._id,
				nombre: nombre,
				email: email
			})
			res.data && setMensaje(true)
			const usuarioActualizado = await axios.get(`http://localhost:4000/api/auth/usuario/${user._id}/datos`)
			dispatch({
				type: 'ACT_CONFIG',
				config: usuarioActualizado.data 
			})
		} catch(err){		
			setError(true)
		}
	}

	return (
		<div className='Configuracion'>
			Configuración de la cuenta
			{mensaje && <div className='cambios-guardados'>CAMBIOS GUARDADOS</div>}
			<form onSubmit={guardarCambios}>
				<div className='seccion-nombre-cont'>
					<p className='seccion-titulo'>Cambiar Nombre</p>
					<div className='seccion-nombre'>
						<input type="text" 
							className='nombre'
							name='nombre'
							placeholder='Nombre'
							onChange={e => setNombre(e.target.value)}
						/>						
						<p>| {user.nombre}</p>
					</div>
				</div>
				<div className='seccion-email-cont'>
					<p className='seccion-titulo'>Cambiar email</p>
					<div className='seccion-email'>
						<input type="text" 
							className='email'
							name='email'
							placeholder='Email'
							onChange={e => setEmail(e.target.value)}
						/>						
						<p>| {user.email}</p>
					</div>
				</div>				
				<div>
					<button type='submit'
						className='btn-guardar'
					>
						Guardar cambios
					</button>
					{error && <p><i>Hubo un error</i></p>}
				</div>
			</form>
		</div>
	)
}

export default Configuracion