import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer/index";

// Función para guardar el estado en localStorage
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (error) {
    console.error("Error guardando en localStorage", error);
  }
};

// Función para cargar el estado desde localStorage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error("Error cargando desde localStorage", error);
    return undefined;
  }
};

// Cargar el estado inicial desde localStorage
const persistedState = loadStateFromLocalStorage();

export const store = createStore(
  rootReducer,
  persistedState, // Usamos el estado persistido
  composeWithDevTools(applyMiddleware(thunk))
);

// Suscribirse a cambios en el store y guardar en localStorage
store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});
