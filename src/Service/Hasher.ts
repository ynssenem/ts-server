import { default as bcrypt } from "bcryptjs"

const salt = 10

export const Hash = async (s: string) => bcrypt.hash(s, salt)
export const Compare = async (s: string, hash: string) => bcrypt.compare(s, hash)
