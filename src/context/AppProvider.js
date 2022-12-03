// create app context and provider
import React, { createContext, useReducer, useState } from 'react'
import AppContext from './AppContext'
import initialState from './initialState'
import reducer from './reducer'

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
