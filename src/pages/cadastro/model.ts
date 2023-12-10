import { HTMLInputTypeAttribute } from "react"

/**
 * FormInput
 * 
 * @interface FormInput
 */
export interface FormInput {
    nome: string
    label: string
    tipo: HTMLInputTypeAttribute
    error: string
}