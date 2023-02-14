import { useContext,createContext ,useState} from 'react'

const Auth = createContext(null)

const AuthContext = ({children}) => {
    const [user,setUser] = useState({})

    const whoAmi = () => {
        return user;
    }

    const handleChangeUser = (newUser) => {
        setUser(newUser)
    }

    return <Auth.Provider value={{whoAmi,handleChangeUser}}>{children}</Auth.Provider>
}

function useAuth() {
    return useContext(Auth)
}

export {AuthContext,useAuth}
