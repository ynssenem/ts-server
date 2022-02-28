import { Context } from "../../../Util/Context"
import { Verify } from "../../../Service/Token"

export const Me = (_par: any, _args: any, ctx: Context) => {
    const { id } = Verify(ctx.token)

    const user = ctx.prisma.user.findUnique({
        where: {
            id: id,
        },
    })

    if (!user) {
        throw new Error("Not found user")
    }

    return user
}
