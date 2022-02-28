import Jwt from "jsonwebtoken"
import { env } from "process"
import { TokenInterface } from "../Interface/Token"

const authSecretKey = env.AUTH_SECRET_KEY ?? "prisma_E22AE62/34EBDDF7.57EB4E4069F*789A32"
const authExpiresIn = env.AUTH_EXPIRES_IN ?? "2 days"

export const Sign = (payload: Object) =>
    Jwt.sign(payload, authSecretKey, {
        expiresIn: authExpiresIn,
    })

export const Verify = (token: string | undefined) => {
    if (!token) {
        throw new Error("Authentication Required")
    }

    token = token.replace("Bearer ", "")

    const verify = Jwt.verify(token, authSecretKey)

    if (!verify || typeof verify === "string") {
        throw new Error("Your Authority is Restricted")
    }
    const result: TokenInterface = {
        id: verify.id,
        email: verify.email,
        role: verify.role,
        status: verify.status,
        accessRole: verify.accessRole,
    }
    return result
}
