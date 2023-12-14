import { FormEvent, useEffect, useState } from "react"
import { FormInput } from "./model"
import { validateAnoNascimento, validateEmail, validateLogin, validateNome, validateSenha } from "./Cadastro.validate"
import { User } from "../../common/model/user"
import api from "../../common/config/api"
import { StatusError } from "../../common/error/statusError"
import { Form } from "./components/Form"
import { Modal } from "./components/Modal"
import { useDispatch, useSelector } from "react-redux"
import { setStatusCode } from "../../context/redux/statusCode"
import { getUsers, resetUser } from "../../context/redux/usersStore"
import { store } from "../../context/store"

export const Cadastro = () => {
    let formInput: FormInput[] = [
        { nome: "id", label: "hidden", error: "", tipo: "number" },
        { nome: "nome", label: "Nome", tipo: "text", error: "Nome deve ter mais de 5 caracteres" },
        { nome: "senha", label: "Senha", tipo: "password", error: "Senha deve ter mais de 8 caracteres" },
        { nome: "confSenha", label: "Confirmar Senha", tipo: "password", error: "Senhas devem ser iguais" },
        { nome: "login", label: "Login", tipo: "text", error: "Login deve ter mais de 5 caracteres" },
        { nome: "email", label: "Email", tipo: "email", error: "Email Inválido" },
        { nome: "anoNascimento", label: "Ano de Nascimento", tipo: "number", error: "Ano Inválido" }
    ]

    //
    const [errorFields, setErrorField] = useState<any>({})

    //
    const user = useSelector((state: any) => state.userStore.user)
    const dispatch = useDispatch<typeof store.dispatch>()

    //
    useEffect(() => {
        dispatch(getUsers())
    }, []);

    const handleForm = async (e: FormEvent<HTMLFormElement>) => {
        //
        e.preventDefault()

        //
        let id = isNaN(Number(user["id"])) ? 0 : Number(user["id"])
        let nome = user["nome"] ?? ""
        let senha = user["senha"] ?? ""
        let confSenha = user["confSenha"] ?? ""
        let login = user["login"] ?? ""
        let email = user["email"] ?? ""
        let anoNascimento = user["anoNascimento"] ?? 0

        //
        let errors: any = {
            nome: false,
            senha: false,
            login: false,
            email: false,
            anoNascimento: false
        }

        let hasError: boolean = false

        //
        if (!validateNome(nome)) errors.nome = true
        if (!validateSenha(senha)) errors.senha = true
        if (senha !== confSenha) errors.confSenha = true
        if (!validateLogin(login)) errors.login = true
        if (!validateEmail(email)) errors.email = true
        if (!validateAnoNascimento(anoNascimento)) errors.anoNascimento = true

        //
        for (let error in errors) {
            let result: boolean = errors[error]

            //
            if (!result) continue

            //
            hasError = true
        }

        //
        setErrorField(errors)

        //
        if (hasError) return

        //
        let sendUser: User = {
            id: id <= 0 ? 0 : id,
            nome: nome,
            senha: senha,
            login: login,
            email: email,
            anoNascimento: anoNascimento
        }

        //
        let statusError: StatusError | undefined

        try {
            if (id === 0) {
                await api.createUser(sendUser)
            } else {
                await api.updateUser(sendUser)
            }
        } catch (err) {
            statusError = err instanceof StatusError ? err : new StatusError("", 500)
        }

        if (!statusError) {
            //
            dispatch(setStatusCode(200))

            //
            dispatch(resetUser())

            return
        }

        dispatch(setStatusCode(statusError.code))
    }

    return <>
        <Form inputs={formInput} errorFields={errorFields} handleForm={handleForm} />
        <div className="w-[500px] p-3 mt-[20px] flex flex-row justify-between bg-[#181818] shadow-[0px_0px_5px_-0.5px] shadow-[#707070]">
            <button className="w-[48%] ml-1 p-1 bg-orange-600 hover:bg-orange-700 text-[#ffdcdc] hover:text-[#ffffff]" onClick={async () => {
                //
                let modal: any = document.getElementById("modal")

                //
                dispatch(getUsers())
                dispatch(setStatusCode(0))

                //
                modal.showModal()
            }}> Listar </button>
            <button className="w-[48%] mr-1 p-1 bg-red-600 hover:bg-red-700 text-[#ffdcdc] hover:text-[#ffffff]" onClick={() => {
                //
                dispatch(resetUser())

                //
                setErrorField({})

                //
                dispatch(setStatusCode(0))
            }}> Resetar </button>
        </div>
        <Modal id="modal" />
    </>
}