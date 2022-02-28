import { CreateLogin } from "./Mutation/CreateLogin"
import { CreateResetPassword } from "./Mutation/CreateResetPassword"
import { CreateResetPasswordRequest } from "./Mutation/CreateResetPasswordRequest"
import { CreateUser } from "./Mutation/CreateUser"
import { UpdateUser } from "./Mutation/UpdateUser"
import { UpdateUserPassword } from "./Mutation/UpdateUserPassword"

const Mutation = {
    createLogin: CreateLogin,
    createUser: CreateUser,
    updateUser: UpdateUser,
    updateUserPassword: UpdateUserPassword,
    createResetPasswordRequest: CreateResetPasswordRequest,
    createResetPassword: CreateResetPassword,
}

export default Mutation
