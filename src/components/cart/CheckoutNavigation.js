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
    back: {
      visibility:
        selectedStep === 0 || selectedStep === steps.length - 1
          ? "hidden"
          : "visible",
    },
    forward: {
      visibility: selectedStep >= steps.length - 2 ? "hidden" : "visible",
    },
    forwardButton: {
      "&:disabled": {
        opacity: 0.5,
      },
    },
  }

  return (
    <Grid
      item
      container
      justifyContent="center"
      alignItems="center"
      sx={sx.navbar}
    >
      <Grid item sx={sx.back}>
        <Button onClick={() => setSelectedStep(selectedStep - 1)}>
          <Typography variant="h5">&lt;</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="h5">
          {steps[selectedStep].title.toUpperCase()}
        </Typography>
      </Grid>
      <Grid item sx={sx.forward}>
        <Button
          disabled={steps[selectedStep].error}
          sx={sx.forwardButton}
          onClick={() => setSelectedStep(selectedStep + 1)}
        >
          <Typography variant="h5">&gt;</Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default CheckoutNavigation
