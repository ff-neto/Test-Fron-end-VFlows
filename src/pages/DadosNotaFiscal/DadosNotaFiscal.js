import './DadosNotaFiscal.css'
import Logo from "../../assets/img/logo.png"
import Lixeira from "../../assets/img/lixeira.png"
import {useAuth} from '../../context/auth/auth.context'
import { Form } from '@unform/web'
import { useField } from '@unform/core'
import InputMask from '../../components/Form/input'
import Input from '../../components/Form/simple-input'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useRef,useEffect } from 'react'


function ContratosVinculados() {
    const {whoAmi,contratoSelecionado} = useAuth()
    const [retencaoImposto,setRetencaoImposto] = useState(false)
    const [retencaoTecnica,setRetencaoTecnica] = useState(false)
    const navigate = useNavigate()
    const formRef = useRef()
    // const valor = formRef.current.getFieldValue('valor');
    // const percentual = formRef.current.getFieldValue('percentual');


    function handleSubmit(data,{reset}) {

        const validationNumber = Yup.number().nullable().transform((_,originalValue) => originalValue !== '' ? Number(originalValue) : null)
        
        try {
            Yup.object().shape({
               numeroNota: validationNumber.required('Número da Nota Obrigatório'),
               dataEmissao: Yup.string().required('Data de Emissão Obrigatório'),
               dataVencimento: Yup.string().required('Data de Vencimento Obrigatório'),
               valor: validationNumber.required('Valor Obrigatório'),
               ...retencaoImposto && {
                issqn: validationNumber.moreThan(0,'"ISSQN” deve ser maior que zero').required('"ISSQN" Obrigatório'),
                irrf: validationNumber.moreThan(0,'“IRRF” deve ser maior que zero”').required('“IRRF” Obrigatório'),
                csll:  validationNumber.moreThan(0,'“CSL” deve ser maior que zero”').required('“CSL” Obrigatório'),
                cofins:  validationNumber.moreThan(0,'“COFINS” deve ser maior que zero”').required('“COFINS” Obrigatório'),
                inss:  validationNumber.moreThan(0,'“INSS” deve ser maior que zero”').required('“INSS” Obrigatório'),
                pis:  validationNumber.moreThan(0,'“PIS” deve ser maior que zero”').required('“PIS” Obrigatório'),
             },
                ...retencaoTecnica && {

                }
            }).validateSync(data,{abortEarly: false})

        } catch (e) {
            const validationErrors = {}

            if(e instanceof Yup.ValidationError) { 
                e.inner.forEach(error => {
                    validationErrors[error.path] = error.message
                })

                formRef.current.setErrors(validationErrors)
            }
        }
    }
    return (
        <div className="container flex flex-col mt-7 ml-12">
            <div className="flex flex-col bg-slate-100 p-7 rounded-md larguraDaPagina">
                <div className="flex flex-row items-center container-filho">
                    <img className="w-40 h-24" alt="logo Vflows" src={Logo}></img>
                    <h3 className="flex flex-row-reverse font-semibold text-xl text-right">PAGAMENTO DE FORNECEDOR</h3>
                </div>
                <div className="borderr flex flex-row p-4 mt-5 header">
                    <div>
                        <h3 className="pb-2"><strong>Razão Social:</strong> {whoAmi().name}</h3>
                        <h3 className="pb-2"><strong>Nome Fantasia:</strong> {whoAmi().businessName}</h3>
                    </div>
                    <div>
                        <h3><strong>CNPJ:</strong>{whoAmi().cnpj}</h3>
                    </div>
                </div>
                <div className="borderr flex flex-col p-0.5 mt-5 text-center">
                    <h3 className="font-semibold p-2">Dados da Nota Fiscal</h3>
                </div>
                <div className="borderr flex flex-col p-0.5 mt-5">
                    <div className="flex flex-row ">
                        <p className="font-semibold p-2">Código de contrato: 11002200-01</p>
                        <p className="p-2 flex-row centro">Título do segundo contrato de exemplo</p>
                    </div>
                    <Form  ref={formRef} className="pt-3 m-2" onSubmit={handleSubmit}>
                        <div className="container-filho">
                            <div className="flex flex-col">
                                <Input label="Número da Nota" className="flex flex-row w-64" type="number"  name="numeroNota"/>
                            </div>
                            <div className="flex flex-col">
                                <InputMask mask="99/99/9999" label="Data de Emissão" className="flex flex-row w-64"  name="dataEmissao"/>
                            </div>
                            <div className="flex flex-col">
                                <InputMask mask="99/99/9999" label="Data de Vencimento" className="flex flex-row w-64"  name="dataVencimento"/>
                            </div>
                            <div className="flex flex-col">
                                <Input label="Valor" className="flex flex-row w-64" type="number" id="valor" name="valor"/>
                            </div>
                        </div>
                        <div className="flex flex-row pl-2 pt-7">
                            <input onClick={() => setRetencaoImposto(!retencaoImposto)} className="flex flex-row w-4" type="checkbox" id="retencaoDeImposto" name="retencaoDeImposto"/>
                            <label for="retencaoDeImposto" className="flex flex-col pl-2">Retenção de imposto</label>
                        </div>
                        {retencaoImposto && (
                            <fieldset className="borderr m-2 p-6">
                            <legend>Dados</legend>
                            <div className="container-filho">
                                <div className="flex flex-col">
                                    <label for="dataEmissao" className="flex flex-col">ISSQN</label>
                                    <Input className="flex flex-row w-36" type="number" id="issqn" name="issqn"/>
                                </div>
                                <div className="flex flex-col">
                                    <label for="dataEmissao" className="flex flex-col">IRRF</label>
                                    <Input className="flex flex-row w-36" type="number" id="irrf" name="irrf"/>
                                </div>
                                <div className="flex flex-col">
                                    <label for="dataEmissao" className="flex flex-col">CSLL</label>
                                    <Input className="flex flex-row w-36" type="number" id="csll" name="csll"/>
                                </div>
                                <div className="flex flex-col">
                                    <label for="dataEmissao" className="flex flex-col">COFINS</label>
                                    <Input className="flex flex-row w-36" type="number" id="cofins" name="cofins"/>
                                </div>
                                <div className="flex flex-col">
                                    <label for="dataEmissao" className="flex flex-col">INSS</label>
                                    <Input className="flex flex-row w-36" type="number" id="inss" name="inss"/>
                                </div>
                                <div className="flex flex-col">
                                    <label for="dataEmissao" className="flex flex-col">PIS</label>
                                    <Input className="flex flex-row w-36" type="number" id="pis" name="pis"/>
                                </div>
                            </div>
                        </fieldset>
                        )}
                        <div className="flex flex-row pl-2 pt-2">
                            <input onClick={() => setRetencaoTecnica(!retencaoTecnica)} className="flex flex-row w-4" type="checkbox" id="retencaoTecnica" name="retencaoTecnica"/>
                            <label for="retencaoTecnica" className="flex flex-col pl-2">Retenção Técnica</label>
                        </div>
                        {retencaoTecnica && (
                            <fieldset className="borderr m-2 p-6">
                                <legend>Dados</legend>
                                <div className="container-filho">
                                    <div className="flex flex-col">
                                        <label for="valor" className="flex flex-col">Valor</label>
                                        <Input readOnly value={  (contratoSelecionado.percent || 0)} className="flex flex-row w-96 p-1 bg-gray-300 input-container" type="text" id="valor" name="valor-retencao-tecnica"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <label for="percentual" className="flex flex-col">Percentual</label>
                                        <Input readOnly value={(contratoSelecionado.percent || 0)} className="flex flex-row w-96 p-1 bg-gray-300 input-container" type="text" id="percentual" name="percentual"/>
                                    </div>
                                </div>
                            </fieldset>
                        )}
                        <div className="flex justify-self">
                            <button className="flex flex-row bg-neutral-700 mt-6 p-1.5 px-16 text-zinc-50 justify-center" type="button">Anexar Nota Fiscal</button>
                            <button className="flex flex-row bg-red-500 mt-6 p-1.5 px-2 text-zinc-50 justify-center ml-5" type="button"><img className="w-5 h-5" alt="lupa" src={Lixeira}></img></button>
                        </div>
                        <div className="flex flex-row-reverse b-16 div-bot">
                            <button className="flex flex-row-reverse bg-green-500 mt-6 p-0.5 px-20 text-zinc-50 ml-3" type="submit">Próximo</button>
                            <button onClick={() => navigate('/contratos-vinculados')} className="flex flex-row-reverse bg-amber-400 mt-6 p-0.5 px-20 text-zinc-50 ml-3" type="button">Anterior</button>
                        </div>
                    </Form>
                </div>
                <footer className="pt-6">
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
