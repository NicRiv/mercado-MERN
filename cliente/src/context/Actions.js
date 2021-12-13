//Sesion
export const LoginStart = userCredentials => ({
  type: 'LOGIN_START'
})

export const LoginSuccess = usuario => ({
  type: 'LOGIN_SUCCESS',
  payload: usuario
})

export const LoginFailure = () => ({
  type: 'LOGIN_FAILURE'
})

export const Logout = () => ({
  type: 'LOGOUT'
})

//Carrito
export const AgregarCarrito = id => ({
  type: 'SUM_CAR',
  sumCar: id
})

export const SacarDelCarrito = id => ({
  type: 'SACAR_CAR',
  idObj: id
})

//Realiza una compra -> se resetea carrito, y se actualiza el user del localstorage
export const ComprarProductos = usuarioActualizado => ({
  type: 'COMPRAR',
  compra: usuarioActualizado
})

export const ActualizarConfiguracion = informacion => ({
  type: 'ACT_CONFIG',
  config: informacion
})

//Buscar Producto
export const BuscarProducto = producto => ({
  type: 'BUSCAR',
  busca: producto
})