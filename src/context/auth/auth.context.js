import { useContext,createContext ,useState} from 'react'

const Auth = createContext(null)

const AuthContext = ({children}) => {
    const [user,setUser] = useState({})
    // REFATORAR DEPOIS PARA UM OUTRO CONTEXT -> PASSAR DENTRO DO CONTEXTO DE AUTH
    const [contratoSelecionado,setContratoSelecionado] = useState({})

    const whoAmi = () => {
        return user;
    }

    const handleChangeUser = (newUser) => {
        setUser(newUser)
    }

    return <Auth.Provider value={{whoAmi,handleChangeUser,setContratoSelecionado,contratoSelecionado}}>{children}</Auth.Provider>
}

function useAuth() {
    return useContext(Auth)
}

export {AuthContext,useAuth}
