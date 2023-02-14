import Logo from "../../assets/img/logo.png"
import Input from "../../components/Form/input"
import { Form } from '@unform/web'
import { useState, useRef } from 'react'
import { validatorCNPJ } from '../../helper/validator.cnpj.js'
import * as Yup from 'yup'
import { CONSTANTS } from '../../constants'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth/auth.context'

function Login() {
    const formRef = useRef()
    const navigate = useNavigate()
    const { handleChangeUser } = useAuth()
    const [error, setError] = useState('')


    function handleSubmit(data, { reset }) {
        const { cnpj } = data;
        try {
            Yup.object().shape({
                cnpj: Yup.string().test('test-invalid-cnpj', 'CNPJ inválido', (cnpj) => {
                    return validatorCNPJ(cnpj);
                }).required('CNPJ é um campo obrigatório')
            }).validateSync({
                cnpj
            }, { abortEarly: false })

            if (!CONSTANTS.VALID_CNPJ.some(validCnpj => validCnpj === cnpj)) {
                setError('CNPJ sem contratos ativos.')
                return;
            }

            const user = CONSTANTS.USERS.find(user => user.cnpj === cnpj)

            handleChangeUser(user)
            navigate('/contratos-vinculados')
            reset()
            formRef.current.setErrors({})


        } catch (e) {
            const validationErrors = {}

            if (e instanceof Yup.ValidationError) {
                e.inner.forEach(error => {
                    validationErrors[error.path] = error.message
                })

                formRef.current.setErrors(validationErrors)
            }
        }
    }

    return (
        <div className="drop-shadow-md hover:drop-shadow-xl container h-screen w-screen mx-auto flex items-center justify-center">
            <div className="w-6/12 h-3/6 flex justify-center items-center flex-col bg-slate-100 shadow-md shadow-gray-600  rounded-md">
                <div className="flex flex-row items-center m-0 justify-center">
                    <img className="w-40 h-24" alt="logo Vflows" src={Logo}></img>
                </div>
                <div className="flex justify-center">
                    <h3 className="font-semibold text-xl pt-7 pb-3">PAGAMENTO DE FORNECEDOR</h3>
                </div>
                <Form ref={formRef} onSubmit={handleSubmit} className="flex flex-col justify-center items-center border border-black-500 p-5 w-3/5 h-64" >
                    <Input name="cnpj" mask="99.999.999/9999-99" />
                    <button type="submit" className="flex drop-shadow-2xl flex-row bg-green-500 mt-6 p-0.5 px-20 text-zinc-50 justify-center">Acessar</button>
                    {!!error ? <span className="text-red-800 text-xs ml-2">{error}</span> : null}
                </Form>
            </div>
        </div>
    )
}

export default Login;
