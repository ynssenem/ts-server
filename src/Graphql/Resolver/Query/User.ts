import { Context } from "../../../Util/Context"
import { UserRole } from "../../../Role"
import { HasAccess } from "../../../Service/Access"
import { Verify } from "../../../Service/Token"

export const User = (_par: any, args: { id: number }, ctx: Context) => {
    const token = Verify(ctx.token)
    HasAccess(UserRole.getDetails, token)

    const user = ctx.prisma.user.findUnique({
        where: {
            id: args.id,
        },
    })

    if (!user) {
        throw new Error("Not found user")
    }

    return user
}
