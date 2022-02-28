import { CodeType, Role, Status } from "@prisma/client"

export interface UpdateUserDetailInterface {
    id: number
    email?: string
    status?: Status
    role?: Role
    accessRole?: string[]
}

export interface CreateResetPasswordRequestInterface {
    email: string
    type: CodeType
}

export interface CreateResetPasswordInteface {
    userId: number
    password: string
    code: string
}
