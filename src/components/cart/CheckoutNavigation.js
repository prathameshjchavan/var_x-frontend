import { Grid, useTheme } from "@mui/material"
import React from "react"

const CheckoutNavigation = () => {
  const theme = useTheme()

  // sx prop
  const sx = {
    navbar: {
      backgroundColor: theme.palette.secondary.main,
      width: "40rem",
      height: "5rem",
    },
  }

  return <Grid item container sx={sx.navbar}></Grid>
}

export default CheckoutNavigation
