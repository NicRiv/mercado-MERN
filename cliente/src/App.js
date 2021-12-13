import React, {useContext} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Context} from './context/Context'
//estilo
import './estilos/app.css'
//Componentes
import Navbar from './componentes/Navbar'
import Inicio from './componentes/Inicio'
import InicioUsuario from './componentes/InicioUsuario'
import Acceder from './componentes/Acceder'
import Registrarse from './componentes/Registrarse'
import InicioRed from './componentes/InicioRed'
import MisCompras from './componentes/MisCompras'
import Configuracion from './componentes/Configuracion'
import BusquedaSesion from './componentes/BusquedaSesion'
import Busqueda from './componentes/Busqueda'

const App = () => {
  const {user} = useContext(Context)

  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <Routes>
          {user ?
              (<>
                  <Route path='/' element={<InicioRed/>} />
                  <Route path='/sesion' element={<InicioUsuario/>} />
                  <Route path='/miscompras' element={<MisCompras/>} />
                  <Route path='/configuracion' element={<Configuracion/>} />
                  <Route path='/sesion/busqueda' element={<BusquedaSesion/>} />
                </>) 
            : (<>
                <Route path='/' element={<Inicio/>} />
                <Route path='/login' element={<Acceder/>}/>
                <Route path='/registrarse' element={<Registrarse/>}/>
                <Route path='/busqueda' element={<Busqueda/>} />
              </>)
          }
          <Route path='*' element={<p>Esta pagina no existe</p>} />
        </Routes>
      </Router>    
    </div>
  )
}

export default App