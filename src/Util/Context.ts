import { PrismaClient } from "@prisma/client"

const Prisma = new PrismaClient()

export interface Context {
    prisma: PrismaClient
    redis?: any
    token?: string
}

export const Ctx: Context = {
    prisma: Prisma,
}
