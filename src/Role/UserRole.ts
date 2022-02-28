const UserRole = {
    getDetails: {
        accessRole: "",
        role: [],
    },

    createUser: {
        accessRole: "",
        role: ["EDITOR", "ADMIN"],
    },

    updateUserPassword: {
        accessRole: "UserRole: Update Password",
        role: ["EDITOR", "ADMIN"],
    },

    updateUser: {
        accessRole: "UserRole: Update User",
        role: ["EDITOR", "ADMIN"],
    },

    deleteUser: {
        accessRole: "UserRole: Delete User",
        role: ["ADMIN"],
    },
}

export default UserRole
