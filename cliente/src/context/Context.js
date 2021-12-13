import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const estadoInicial = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
  listaProductos: [],
  buscarProducto: null
};

export const Context = createContext(estadoInicial);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, estadoInicial);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value = {{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        listaProductos: state.listaProductos,
        buscarProducto: state.buscarProducto,
        dispatch
      }}
    >
      {children}
    </Context.Provider>
  );
};