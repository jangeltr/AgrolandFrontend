import { createContext, useState } from "react"
import React from "react"
import { User } from "../Common/UserType"

type Data = {
    user?: User | null
}

interface MyContextType {
    data: Data
    updateData: (newData: Data)=> void
}

const inicioEstado: Data = {
    user: null,
}

//Este es el que tenemos que consumir
export const MyContext = createContext<MyContextType | undefined>(undefined);

//Este es el que nos provee de acceso al contexto en toda la aplicacion App.tsx
export const MyContextProvider = (props: {children: React.ReactNode}) => {
    const [data, setData] = useState(inicioEstado)

    const updateData=(newData: Data)=>{
        setData(newData)
    }

    const contextValue: MyContextType = {
        data,
        updateData, 
    }

    return (
        <MyContext.Provider value={contextValue}>
            {props.children}
        </MyContext.Provider>
    );
}