import React from "react"
import { ThemeProvider } from "@mui/material/styles"
import ApolloWrapper from "../../apollo/ApolloWrapper"
import { UserWrapper, FeedbackWrapper, CartWrapper } from "../../contexts"
import theme from "./theme"

const rootWrapper = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloWrapper>
        <UserWrapper>
          <FeedbackWrapper>
            <CartWrapper>{element}</CartWrapper>
          </FeedbackWrapper>
        </UserWrapper>
      </ApolloWrapper>
    </ThemeProvider>
  )
}

export default rootWrapper
