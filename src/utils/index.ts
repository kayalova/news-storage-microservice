import bcrypt from 'bcrypt'

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