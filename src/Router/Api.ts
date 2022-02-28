import express from "express"

const Router = express.Router()

Router.get("/", (_, res) => {
    res.json({
        project: "Is Running",
    })
})

export default Router
