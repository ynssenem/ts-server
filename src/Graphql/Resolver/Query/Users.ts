import { Context } from "../../../Util/Context"
import { UserRole } from "../../../Role"
import { HasAccess } from "../../../Service/Access"
import { Verify } from "../../../Service/Token"

export const Users = (_par: any, _args: any, ctx: Context) => {
    const token = Verify(ctx.token)
    HasAccess(UserRole.getDetails, token)

    const users = ctx.prisma.user.findMany()

    if (!users) {
        throw new Error("Not found users")
    }

    return users
}
