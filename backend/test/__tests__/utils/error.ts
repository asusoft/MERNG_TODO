export function createError (data: any): Error {
    return Error(JSON.stringify(data, null, 4))
}
