import { Context } from "../../../Util/Context"
import { CreateResetPasswordRequestInterface } from "../../../Interface"
import { ResetPasswordTemplate } from "../../../Mjml"
import sendMail from "../../../Service/Mail"

export const CreateResetPasswordRequest = async (
    _: any,
    { email, type }: CreateResetPasswordRequestInterface,
    ctx: Context
) => {
    const user = await ctx.prisma.user.findUnique({
        where: {
            email: email,
        },
    })

    if (!user) {
        throw new Error("Not found user")
    }

    const checkVerifyCodes = await ctx.prisma.verifyCode.findMany({
        select: {
            id: true,
        },
        where: {
            userId: user.id,
            type: type,
        },
    })

    if (checkVerifyCodes) {
        await checkVerifyCodes.forEach((code) => {
            const deleteVerify = ctx.prisma.verifyCode.delete({
                where: {
                    id: code.id,
                },
            })

            deleteVerify.catch((err) => {
                throw new Error(err)
            })
        })
    }

    const expiresInDate = new Date()
    expiresInDate.setMinutes(expiresInDate.getMinutes() + 3)

    const generateCode = (Math.floor(Math.random() * 999998) + 100000).toString().slice(0, 6)

    const verifyCode = await ctx.prisma.verifyCode.create({
        data: {
            userId: user.id,
            type: type,
            code: generateCode,
            createdAt: new Date(),
            expiresIn: expiresInDate,
        },
    })

    if (!verifyCode) {
        throw new Error("Something went wrong")
    }

    const resetPasswordTemplate = ResetPasswordTemplate("Reset Password", generateCode)

    sendMail(user.email, "Reset Password", resetPasswordTemplate)

    return verifyCode
}
