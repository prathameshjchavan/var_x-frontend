import { Grid, useTheme } from "@mui/material"
import React, { useMemo, useState } from "react"
import CheckoutNavigation from "./CheckoutNavigation"

const CheckoutPortal = ({ user }) => {
  const theme = useTheme()
  const steps = useMemo(
    () => [
      { title: "Contact Info" },
      { title: "Address" },
      { title: "Shipping" },
      { title: "Payment" },
      { title: "Confirmation" },
      { title: `Thanks ${user.name}!` },
    ],
    [user]
  )
  const [selectedStep, setSelectedStep] = useState(0)

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
      <CheckoutNavigation
        steps={steps}
        selectedStep={selectedStep}
        setSelectedStep={setSelectedStep}
      />
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
