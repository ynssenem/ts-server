import fs from "fs"
import _ from "lodash"

const readHtml = (filename: string) => {
    return fs.readFileSync(__dirname + filename, { encoding: "utf8", flag: "r" })
}

export const ResetPasswordTemplate = (title: string, code: string) => {
    let template = readHtml("/dist/ResetPassword.html")

    template = template.replace("${{title}}", title)

    const codes = code.split("")

    _.forEach(codes, (replace, key) => {
        template = template.replace("${{code_" + key + "}}", replace)
    })

    return template
}
