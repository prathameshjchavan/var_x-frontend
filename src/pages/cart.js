import { Grid, Typography, useTheme, useMediaQuery } from "@mui/material"
import React, { useContext } from "react"
import Layout from "../components/ui/layout"
import { UserContext } from "../contexts"
import CheckoutPortal from "../components/cart/CheckoutPortal"
import CartItems from "../components/cart/CartItems"

const Account = () => {
  const { user } = useContext(UserContext)
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
  const matchesXS = useMediaQuery("(max-width: 500px)")
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"))

  const items = <CartItems />
  const checkout = <CheckoutPortal user={user} />

  // sx prop
  const sx = {
    name: {
      fontSize: matchesXS ? "3rem" : matchesSM ? "3.5rem" : undefined,
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
          {matchesMD ? checkout : items}
          {matchesMD ? items : checkout}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Account
