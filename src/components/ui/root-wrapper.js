import React from "react"
import { ThemeProvider } from "@mui/material/styles"
import ApolloWrapper from "../../apollo/ApolloWrapper"
import theme from "./theme"

const rootWrapper = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloWrapper>{element}</ApolloWrapper>
    </ThemeProvider>
  )
}

export default rootWrapper
