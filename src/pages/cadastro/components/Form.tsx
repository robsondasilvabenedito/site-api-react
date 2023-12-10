import { ChangeEvent, FormEvent } from "react"
import { FormInput } from "../model"
import { useDispatch, useSelector } from "react-redux"
import { setUserField } from "../../../context/redux/usersStore"

interface FromProps {
    inputs: FormInput[],
    errorFields: any
    handleForm: (e: FormEvent<HTMLFormElement>) => {}
}

export const Form = (props: FromProps) => {
    const formInput = props.inputs
    const errorFields = props.errorFields

    //
    const user = useSelector((state: any) => state.userStore.user)
    const status = useSelector((state: any) => state.statusCode.code)

    //
    const dispatch = useDispatch()

    //
    const handleForm = props.handleForm

    //
    return <>
        <form className="w-[500px] p-3 flex flex-col bg-[#181818] shadow-[0px_0px_5px_-0.5px] shadow-[#707070]" onSubmit={handleForm}>
            <label className="text-[25px] font-bold my-1"> Formulário de Usuário </label>
            {formInput.map((input) => {
                const value: string | number = user[input.nome] ?? ""
                const hasError: boolean = errorFields[input.nome] ?? false
                const updateForm = (e: ChangeEvent<HTMLInputElement>) => {
                    dispatch(setUserField({ field: input.nome, value: e.target.value }))
                }

                //
                if (input.tipo === "password") return <div key={input.nome} className="flex flex-col">
                    <label className="text-left p-1 mb-[1px] mt-[5px] font-semibold" htmlFor={input.nome}> {input.label} </label>
                    <input id={input.nome} name={input.nome} className="mb-[1px] p-1 focus:outline-none m-1 focus:ring-green-600 focus:ring-1" type={input.tipo} value={value} onChange={updateForm} />
                    <label className={`text-left p-1 text-red-600 shadow-sm animate-pulse ${hasError ? "" : "hidden"}`}> {input.error} </label>
                </div>

                if (input.label === "hidden") return <div key={input.nome} className="flex flex-col">
                    <input id={input.nome} name={input.nome} className="hidden" type={input.tipo} value={value} onChange={updateForm} />
                </div>

                //
                return <div key={input.nome} className="flex flex-col">
                    <label className="text-left p-1 mb-[1px] mt-[5px] font-semibold" htmlFor={input.nome}> {input.label} </label>
                    <input id={input.nome} name={input.nome} className="mb-[1px] p-1 focus:outline-none m-1 focus:ring-green-600 focus:ring-1" type={input.tipo} value={value} onChange={updateForm} />
                    <label className={`text-left p-1 text-red-600 shadow-sm animate-pulse ${hasError ? "" : "hidden"}`}> {input.error} </label>
                </div>
            })}
            {(() => {
                switch (status) {
                    case 200:
                        return <>
                            <label className="text-left p-1 text-green-600 shadow-sm animate-pulse"> Sucesso </label>
                        </>
                    case 409:
                        return <>
                            <label className="text-left p-1 text-red-600 shadow-sm animate-pulse"> Email já Cadastrado </label>
                        </>
                    case 410:
                        return <>
                            <label className="text-left p-1 text-red-600 shadow-sm animate-pulse"> Usuário Deletado </label>
                        </>
                    case 500:
                        return <>
                            <label className="text-left p-1 text-red-600 shadow-sm animate-pulse"> Erro </label>
                        </>
                    default:
                        return <>
                        </>
                }
            })()}
            <input className="m-1 mt-[15px] p-1 bg-green-900 hover:bg-green-950 text-[#ffdcdc] hover:text-[#ffffff]" type="submit" value={"ENVIAR"} />
        </form>
    </>
}