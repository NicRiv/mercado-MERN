const Reducer = (state, action) => {
  const resultado = [...state.listaProductos]
  let existe = false

  switch(action.type){
    //Sesion
    case 'LOGIN_START':
      return {
        ...state,
        user: null,
        isFetching: true,
        error: false
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        error: false
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isFetching: false,
        error: true
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isFetching: false,
        error: false
      }

    //Carrito
    case 'SUM_CAR':
      for(const i in state.listaProductos){
        if(action.sumCar === state.listaProductos[i]){
          existe = true
        }
      }
      if(existe) {
        console.log('se repite')
      } else {
        resultado.push(action.sumCar)
      }

      return{
        ...state,
        listaProductos: resultado
      }
    case 'SACAR_CAR':
      const posicion = resultado.indexOf(action.idObj)
      resultado.splice(posicion, 1)

      return{
        ...state,
        listaProductos: resultado
      }

    //Comprar
    case 'COMPRAR':
      return{
        ...state,
        user: action.compra,
        listaProductos: []
      }

    //Actualizar configuracion
    case 'ACT_CONFIG':
      return{
        ...state,
        user: action.config
      }

    //Busqueda
    case 'BUSCAR':
      return{
        ...state,
        buscarProducto: action.busca
      }

    //DEFAULT  
    default:
      return state
  }
}

export default Reducer