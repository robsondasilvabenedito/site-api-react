import { useDispatch, useSelector } from "react-redux"
import { deleteUser, getUser } from "../../../context/redux/usersStore"
import { User } from "../../../common/model/user"

interface ModalProps {
    id: string
}

export const Modal = (props: ModalProps) => {
    const id = props.id

    //
    const users: User[] = useSelector((state: any) => state.userStore.users)

    //
    const status = useSelector((state: any) => state.userStore.error)
    const dispatch = useDispatch<any>()

    return <>
        <dialog id={id} className="backdrop:bg-[#53414188]">
            <div className="w-[600px] p-3 flex flex-col bg-[#181818] shadow-[0px_0px_5px_-0.5px] shadow-[#707070]">
                <div className="max-h-[60vh] overflow-scroll">
                    {users.map((user, index) => {
                        return <div className="flex flex-row mt-[5px] justify-between" key={`${user.nome}-${index}`}>
                            <div className="p-1">
                                {user.nome}
                            </div>
                            <div>
                                <button className="w-[100px] mr-1 p-1 bg-orange-600 hover:bg-orange-700 text-[#ffdcdc] hover:text-[#ffffff]" onClick={
                                    async () => {
                                        //
                                        dispatch(getUser(user.id!))
                                    }
                                }> Editar </button>
                                <button className="w-[100px] mr-1 p-1 bg-red-600 hover:bg-red-700 text-[#ffdcdc] hover:text-[#ffffff]" onClick={
                                    async () => {
                                        //
                                        dispatch(deleteUser(user.id!))
                                    }
                                }> Excluir </button>
                            </div>
                        </div>
                    })}
                </div>
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
                        case 500:
                            return <>
                                <label className="text-left p-1 text-red-600 shadow-sm animate-pulse"> Erro </label>
                            </>
                        default:
                            return <>
                            </>
                    }
                })()}
                <button className="m-1 mt-[15px] p-1 bg-green-900 hover:bg-green-950 text-[#ffdcdc] hover:text-[#ffffff]" onClick={() => {
                    let modal: any = document.getElementById("modal")

                    //
                    modal.close()
                }}>
                    VOLTAR
                </button>
            </div>
        </dialog>
    </>
}