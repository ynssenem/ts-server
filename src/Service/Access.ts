import { RoleInterface, TokenInterface } from "../Interface"

export const HasAccess = (role: RoleInterface, user: TokenInterface): void => {
    if (role.accessRole.length > 0 && user.role != "ADMIN") {
        const hasAccessRole = user.accessRole?.find((r) => role.accessRole == r)
        if (!hasAccessRole) {
            throw new Error("You are not authorized, Access is missing")
        }
    }

    if (role.role.length > 0) {
        const hasRole = role.role.find((r: string) => r == user.role)
        if (!hasRole) {
            throw new Error("You are not authorized, Role is missing")
        }
    }
}
