import { Context } from "../../../Util/Context"
import { CreateResetPasswordInteface } from "../../../Interface/User"
import { Hash } from "../../../Service/Hasher"

export const CreateResetPassword = async (
    _: any,
    { userId, password, code }: CreateResetPasswordInteface,
    ctx: Context
) => {
    const verifyCode = await ctx.prisma.verifyCode.findFirst({
        where: {
            code: code,
            userId: userId,
            type: "PASSWORD",
        },
    })

    if (!verifyCode) {
        throw new Error("Not found verify code")
    }

    const atNow = new Date()

    if (atNow > verifyCode.expiresIn) {
        throw new Error("You missed the time")
    }

    const user = await ctx.prisma.user.findUnique({
        where: {
            id: verifyCode.userId,
        },
    })

    if (!user) {
        throw new Error("Not found user")
    }

    const newPassword = Hash(password)

    ctx.prisma.user.update({
        data: {
            password: (await newPassword).toString(),
        },
        where: {
            id: verifyCode.userId,
        },
    })

    user.password = (await newPassword).toString()

    return user
}
