import { useContext,createContext ,useState} from 'react'

const Contrato = createContext(null)

const ContratoContext = ({children}) => {
    const [contratoSelecionado,setContratoSelecionado] = useState({})

    return <Contrato.Provider value={{setContratoSelecionado,contratoSelecionado}}>{children}</Contrato.Provider>
}

function useContrato() {
    return useContext(Contrato)
}

export {ContratoContext,useContrato}
