import { Grid, useTheme } from "@mui/material"
import React from "react"
import CheckoutNavigation from "./CheckoutNavigation"

const CheckoutPortal = () => {
  const theme = useTheme()

  // sx prop
  const sx = {
    stepContainer: {
      width: "40rem",
      height: "25rem",
      backgroundColor: theme.palette.primary.main,
    },
  }
  return (
    <Grid item container direction="column" alignItems="flex-end" xs={6}>
      <CheckoutNavigation />
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        sx={sx.stepContainer}
      ></Grid>
    </Grid>
  )
}

export default CheckoutPortal
