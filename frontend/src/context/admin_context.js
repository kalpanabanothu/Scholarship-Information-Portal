import { createContext, useEffect, useReducer } from "react";
import AdminReducer from "./admin_reducer";

const INITIAL_STATE = {
    isAdmin : false,
} 

export const AdminContext = createContext(INITIAL_STATE);

export const AdminContextProvider = ({children}) => {
    const [state, dispatcher] = useReducer(AdminReducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.currentUser))
    },[state.currentUser]);
    return( 
        <AdminContext.Provider value={{isAdmin: state.isAdmin, dispatcher}}>
            {children}
        </AdminContext.Provider>
    );
}