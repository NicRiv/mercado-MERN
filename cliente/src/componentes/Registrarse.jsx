import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
//css
import '../estilos/registrarse.css'

const Registrarse = () => {
	const navigate = useNavigate()
	const [nombre, setNombre] = useState('')
	const [usuario, setUsuario] = useState('')
	const [email, setEmail] = useState('')
	const [contraseña, setContraseña] = useState('')
	const [error, setError] = useState(false)

	const onSubmit = async (e) =>{
		e.preventDefault()
		setError(false)
		try{
			const res = await axios.post('http://localhost:4000/api/auth/registrar', {
				nombre: nombre,
				username: usuario,
				email: email,
				password: contraseña
			})

			res.data && navigate('/login')
		} catch(err){		
			setError(true)
		}
	}

	return (
		<div className='Registrarse'>
			<div className='regis-cont'>
				<h3>Crear una cuenta</h3>
				<form onSubmit={onSubmit} className='form'>
					<input type="text" 
						className='nombre'
						name='nombre'
						placeholder='Nombre'
						required
						onChange={e => setNombre(e.target.value)}
					/>
					<input type="text" 
						className='usuario'
						name='usuario'
						placeholder='Usuario'
						required
						onChange={e => setUsuario(e.target.value)}
					/>
					<input type="text" 
						className='email'
						name='email'
						placeholder='Email'
						required
						onChange={e => setEmail(e.target.value)}
					/>
					<input type="password" 
						className='contraseña'
						placeholder='Contraseña'
						name='contraseña'
						required
						onChange={e => setContraseña(e.target.value)}
					/>
					<button type='submit'
						className='btn-registrarse'
					>
						Registrarse
					</button>
					{error && <p><i>Hubo un error</i></p>}
				</form>
			</div>
		</div>
	)
}

export default Registrarse