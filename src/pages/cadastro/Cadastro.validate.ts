//
export const validateNome = (nome: string): boolean => {
    //
    let tempNome: string = nome

    //
    if (tempNome === "" || tempNome.length < 5) return false

    //
    return true
}

//
export const validateLogin = (login: string): boolean => {
    //
    let tempLogin: string = login

    //
    if (tempLogin === "" || tempLogin.length < 5) return false

    //
    return true
}

//
export const validateSenha = (senha: string): boolean => {
    //
    let tempSenha: string = senha

    //
    if (tempSenha === "" || tempSenha.length < 8) return false

    //
    return true
}

//
export const validateEmail = (email: string): boolean => {
    //
    let tempEmail: string = email

    //
    var regx: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    //
    if (tempEmail === "" || !regx.test(tempEmail)) return false

    //
    return true
}

//
export const validateAnoNascimento = (ano: number): boolean => {
    //
    let tempAno: number = Number(ano)

    //
    if (tempAno <= 1900 || isNaN(tempAno) || tempAno >= 2020) return false

    //
    return true
}