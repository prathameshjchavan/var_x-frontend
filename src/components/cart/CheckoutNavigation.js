import { Grid, Button, useTheme, Typography } from "@mui/material"
import React from "react"

const CheckoutNavigation = ({ steps, selectedStep, setSelectedStep }) => {
  const theme = useTheme()

  // sx prop
  const sx = {
    navbar: {
      backgroundColor: theme.palette.secondary.main,
      width: "40rem",
      height: "5rem",
    },
  }

  return (
    <Grid item container sx={sx.navbar}>
      <Grid item>
        <Button>
          <Typography variant="h5">&lt;</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="h5">
          {steps[selectedStep].title.toUpperCase()}
        </Typography>
      </Grid>
      <Grid item>
        <Button>
          <Typography variant="h5">&gt;</Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default CheckoutNavigation
