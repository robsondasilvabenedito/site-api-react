/**
 * ValidateError
 * 
 * @class ValidateError
 */
export class StatusError extends Error {
    code: number

    //
    constructor(message: string, code: number){
        super(message)

        // InstanceOf funcionar
        Object.setPrototypeOf(this, StatusError.prototype);

        this.code = code

        this.name = "ValidateError"
    }
}