import React, {useRef, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {Context} from '../context/Context'
//css
import '../estilos/acceder.css'

const Acceder = () => {
	const navigate = useNavigate()
	const usuarioRef = useRef()
	const contraseñaRef = useRef()
	const {dispatch} = useContext(Context)

	const onSubmit = async (e) =>{
		e.preventDefault()
		dispatch({type: 'LOGIN_START'})
		try {
			const res = await axios.post('http://localhost:4000/api/auth/login', {
				username: usuarioRef.current.value,
				password: contraseñaRef.current.value
			})
			dispatch({
				type: 'LOGIN_SUCCESS',
				payload: res.data
			})
			// console.log(res)
			navigate('/sesion')
		} catch(err) {
			dispatch({type: 'LOGIN_FAILURE'})
		}
	}

	return (
		<div className='Acceder'>
			<div className='acceder-cont'>
				<h3>Iniciar sesión</h3>
				<form onSubmit={onSubmit}
					className='form'
				>
					<input type="text" 
						className='usuario'
						placeholder='Usuario'
						ref={usuarioRef}
					/>
					<input type="password" 
						className='contraseña'
						placeholder='Contraseña'
						ref={contraseñaRef}
					/>
					<button type='submit'
						className='btn-entrar'
					>
						Entrar
					</button>
				</form>
				<div className='divisor' />
				<Link to='/registrarse' className='btn-crear-cuenta'>Crear una cuenta</Link>
			</div>
		</div>
	)
}

export default Acceder