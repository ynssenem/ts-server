import express from "express"
import cors from "cors"

// Node
import { readFileSync } from "fs"
import { join } from "path"

// Apollo && Prisma
import { ApolloServer, gql } from "apollo-server-express"
import Resolvers from "./Graphql/Resolver"
import { Ctx } from "./Util/Context"

// Conf
import { Api } from "./Router"

const Main = async () => {
    const App = express()
    const port: Number = 3000

    App.use(cors())

    App.get("/", (_, res) => {
        res.json({
            project: "🥳 Server is running",
        })
    })
    App.use("/api", Api)

    const typeDefs = gql(readFileSync(join(__dirname, "/Graphql/Schema/schema.graphql")).toString())
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: Resolvers,
        context({ req }) {
            const token = req.headers.authorization || ""
            return { token, ...Ctx }
        },
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({ app: App, path: "/graphql" })

    App.listen(port, () => {
        console.info(`Server running`)
    })
}

Main().catch((ctx) => console.error(ctx))
