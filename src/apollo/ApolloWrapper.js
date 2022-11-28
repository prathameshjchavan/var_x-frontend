import { ApolloClient } from "@apollo/client"
import client from "."

const ApolloWrapper = ({ children }) => {
  return <ApolloClient client={client}>{children}</ApolloClient>
}

export default ApolloWrapper
