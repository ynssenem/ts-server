import { Context } from "../../../Util/Context"
import { UserRole } from "../../../Role"
import { HasAccess } from "../../../Service/Access"
import { Hash } from "../../../Service/Hasher"
import { Verify } from "../../../Service/Token"

export const UpdateUserPassword = async (
    _: any,
    { id, password }: { id: number; password: string },
    ctx: Context
) => {
    const token = Verify(ctx.token)
    HasAccess(UserRole.updateUserPassword, token)

    const user = ctx.prisma.user.findUnique({
        where: {
            id: id,
        },
    })

    if (!user) {
        throw new Error("Not found user")
    }

    if (password.length < 8) {
        throw new Error("Password length min 8 characters")
    }

    const newPassword = (await Hash(password)).toString()

    await ctx.prisma.user.update({
        where: {
            id: id,
        },
        data: {
            password: newPassword,
        },
    })

    return user
}
