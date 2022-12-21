import bcrypt from 'bcrypt'
import { ValidationError } from 'express-validator'

export function formatDateToClickhouse(date: string) {
    const msDelimeter = date.indexOf('.')
    return date.replace('T', ' ').substring(0, msDelimeter)
}

export async function hash(data: any) {
    return bcrypt.hash(data, 10);
}

export async function compareHashed(compared: any, hashed: any) {
    return bcrypt.compare(compared, hashed)
}

export function expressValidatorErrorToObject(errList: Array<ValidationError>): Object {
    const errorMap: { [key: string]: string } = {}

    for (const error of errList) {
        errorMap[error.param] = error.msg
    }

    return errorMap
}