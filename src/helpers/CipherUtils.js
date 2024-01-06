import bcrypt from 'bcryptjs'

export const encrypt = (input) => { return bcrypt.hashSync(input) }
export const decrypt = (input, target) => { return bcrypt.compareSync(input, target)}