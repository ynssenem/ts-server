import { Me } from "./Query/Me"
import { User } from "./Query/User"
import { Users } from "./Query/Users"

const Query = {
    time: () => {
        return new Date().toISOString()
    },
    me: Me,
    user: User,
    users: Users,
}

export default Query
