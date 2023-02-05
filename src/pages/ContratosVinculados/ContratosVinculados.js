import './ContratosVinculados.css'
import Logo from "../../assets/img/logo.png"
import Lupa from "../../assets/img/lupa.png"
import {useAuth} from '../../context/auth/auth.context'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function ContratosVinculados() {
    const {whoAmi,setContratoSelecionado} = useAuth()
    const navigate = useNavigate()
    const [contrato,setContrato] = useState([])
    const [error,setError] = useState('')
    
    
    const handleClick = () => {
        console.log(contrato)
        if(contrato.length > 1) {
            setError('Somente um Contrato deverá ser selecionado')
            return;
        }
        if(contrato.length === 0) {
            setError('Ao menos um Contrato deverá ser selecionado')
            return;
        }
        setContratoSelecionado(contrato[0])
        navigate('/dados-nota-fiscal')
    }

    return (
        <div className="container flex flex-col mt-7 ml-12">
            <div className="flex flex-col bg-slate-100 p-7 rounded-md larguraDaPagina">
                <div className="flex flex-row items-center container-filho">
                    <img className="w-40 h-24" alt="logo Vflows" src={Logo}></img>
                    <h3 className="flex flex-row-reverse font-semibold text-xl text-right">PAGAMENTO DE FORNECEDOR</h3>
                </div>
                <div className="borderr flex flex-row p-4 mt-5 header">
                    <div className="">
                        <h3 className="pb-2"><strong>Razão Social:</strong> {whoAmi()?.name}</h3>
                        <h3 className="pb-2"><strong>Nome Fantasia:</strong> {whoAmi()?.businessName}</h3>
                    </div>
                    <div>
                        <h3><strong>CNPJ:</strong>{whoAmi().cnpj}</h3>
                    </div>
                </div>
                <div className="borderr flex flex-col p-0.5 mt-5 text-center">
                    <h3 className="p-2">Contratos Vinculados</h3>
                </div>
                    <table class="table-auto mt-5">
                        <thead>
                            <tr>
                                <th>Nome do Contrato</th>
                                <th>Código do contrato</th>
                                <th>Retenção Técnica</th>
                                <th>Detalhes</th>
                            </tr>
                        </thead>
                        <tbody >
                            {whoAmi()?.listContracts?.map((contract,key) => (
                                <tr key={key} className="bg-zinc-200">
                                    <td className="alterado ">
                                        <input type="checkbox" onClick={() => setContrato(old => {
                                            if(old.find(c => c.id === contract.id)) {
                                                return old.filter(c => c.id !== contract.id)
                                            }
                                            return [...old, contract]
                                        })}/>
                                        {contract.name}
                                    </td>
                                    <td>{contract.code}</td>
                                    <td className="bg-sky-600">{contract.percent}</td>
                                    <td><button className="w-12 h-8 bg-sky-600 rounded"><img className="w-5 h-5 centro" alt="lupa" src={Lupa}></img></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                <div className="flex flex-row-reverse b-16 div-bot">
                    <button onClick={() => handleClick()} className="flex flex-row-reverse bg-green-500 mt-6 p-0.5 px-20 text-zinc-50 ml-3" type="button">Próximo</button>
                    <button onClick={() => navigate('/')} className="flex flex-row-reverse bg-amber-400 mt-6 p-0.5 px-20 text-zinc-50 ml-3" type="button">Anterior</button>
                    {error && <span className="text-red-800 text-xs ml-2">{error}</span>}
                </div>
                <footer className="">
                    <img className="w-40 h-24" alt="logo Vflows" src={Logo}></img>
                    <div className="centro">
                        <p className="text-center ">&copy;2022-2022 Construido Patrimônios</p>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default ContratosVinculados;
