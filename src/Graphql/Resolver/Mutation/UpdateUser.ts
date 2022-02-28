import _ from "lodash"
import { Context } from "../../../Util/Context"
import { UpdateUserDetailInterface } from "../../../Interface"
import { UserRole } from "../../../Role"
import { HasAccess } from "../../../Service/Access"
import { Verify } from "../../../Service/Token"

export const UpdateUser = async (_: any, args: UpdateUserDetailInterface, ctx: Context) => {
    const token = Verify(ctx.token)
    HasAccess(UserRole.updateUser, token)

    const data = _.omit(args, "id")

    const existUser = await ctx.prisma.user.findFirst({
        where: {
            id: {
                not: args.id,
            },
            email: args.email,
        },
    })

    if (existUser) {
        throw new Error("This email account is being used by another account.")
    }

    const user = await ctx.prisma.user
        .update({
            data: data,
            where: {
                id: args.id,
            },
        })
        .catch((err) => {
            throw new Error(err)
        })

    return user
}
