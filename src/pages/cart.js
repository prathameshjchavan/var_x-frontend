import { Grid, Typography } from "@mui/material"
import React, { useContext } from "react"
import Layout from "../components/ui/layout"
import { UserContext } from "../contexts"
import CheckoutPortal from "../components/cart/CheckoutPortal"
import CartItems from "../components/cart/CartItems"

const Account = () => {
  const { user } = useContext(UserContext)

  return (
    <Layout>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h1">{user.name}'s Cart</Typography>
        </Grid>
        <Grid item container>
          <CartItems />
          <CheckoutPortal />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Account
