import { Context } from "../../../Util/Context"
import { AuthInterface, TokenInterface } from "../../../Interface"
import { Compare } from "../../../Service/Hasher"
import { Sign } from "../../../Service/Token"

export const CreateLogin = async (_: any, { email, password }: AuthInterface, ctx: Context) => {
    if (ctx.token) {
        throw new Error("Your Authority is Restricted")
    }

    const user = await ctx.prisma.user.findFirst({
        where: {
            email: email,
        },
    })

    if (!user) {
        throw new Error("User not found")
    }

    if (user.status != "ACTIVE") {
        throw new Error(`Your account status is not eligible (${user.status})`)
    }

    const comparePassword = await Compare(password, user.password)

    if (!comparePassword) {
        throw new Error("The password is incorrect or there is no such user.")
    }

    return {
        user,
        token: Sign(<TokenInterface>{
            id: user.id,
            email: user.email,
            role: user.role,
            status: user.status,
        }),
    }
}
