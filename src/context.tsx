import React, { createContext, useReducer } from 'react'
const initialState = {
  token: ''
}

interface IState {
  token: String
}

interface IAction {
  type: String
  payload: String
}

const reducer = (state: IState, action: IAction) => {
  switch(action.type) {
    case 'SET_TOKEN':
      return { ...state, token: action.payload }
    case 'REMOVE_TOKEN':
      return { ...state, token: '' }
    default:
      return state
  }
}



export const AppContext = createContext<{state: IState, dispatch: React.Dispatch<IAction>}>({
  state: initialState,
  dispatch:() => null
})


export const AppProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const token = localStorage.getItem('token') || ''
    return { token }
  })

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
