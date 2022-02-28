import { CodeType } from "@prisma/client"

export interface CreateVerifyCodeInterface {
    userId: number
    type: CodeType
}
