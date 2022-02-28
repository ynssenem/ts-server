import Query from "./Query"
import Mutation from "./Mutation"
import { DateTimeResolver } from "graphql-scalars"

const Resolvers = {
    DateTime: DateTimeResolver,
    Query,
    Mutation,
}

export default Resolvers
