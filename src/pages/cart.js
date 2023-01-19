import { Grid, Typography, useTheme } from "@mui/material"
import React, { useContext } from "react"
import Layout from "../components/ui/layout"
import { UserContext } from "../contexts"
import CheckoutPortal from "../components/cart/CheckoutPortal"
import CartItems from "../components/cart/CartItems"

const Account = () => {
  const { user } = useContext(UserContext)
  const theme = useTheme()

  // sx prop
  const sx = {
    name: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "3.5rem",
      },
    },
    cartContainer: {
      minHeight: "70vh",
    },
  }

  return (
    <Layout>
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={sx.cartContainer}
      >
        <Grid item>
          <Typography variant="h1" sx={sx.name} align="center">
            {user.name}'s Cart
          </Typography>
        </Grid>
        <Grid item container>
          <CartItems />
          <CheckoutPortal user={user} />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Account
