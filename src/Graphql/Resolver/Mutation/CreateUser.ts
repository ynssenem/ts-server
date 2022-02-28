import { Context } from "../../../Util/Context"
import { AuthInterface, TokenInterface } from "../../../Interface"
import { Hash } from "../../../Service/Hasher"
import { Sign } from "../../../Service/Token"

export const CreateUser = async (
    _parent: any,
    { email, password }: AuthInterface,
    ctx: Context
) => {
    const user = await ctx.prisma.user.findFirst({
        where: {
            email: email,
        },
    })

    if (user) {
        throw new Error("User available")
    }

    if (password.length < 8) {
        throw new Error("Password length min 8 characters")
    }

    const passwordHash = (await Hash(password)).toString()

    const createUser = await ctx.prisma.user.create({
        data: {
            email: email,
            password: passwordHash,
            status: "ACTIVE",
            role: "USER",
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
            updateAt: new Date().toISOString(),
            accessRole: [],
        },
    })

    return {
        user: createUser,
        token: Sign(<TokenInterface>{
            id: createUser.id,
            email: createUser.email,
            role: createUser.role,
            status: createUser.status,
            accessRole: createUser.accessRole,
        }).toString(),
    }
}
