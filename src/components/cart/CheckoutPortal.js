import { Grid, useTheme } from "@mui/material"
import React, { useMemo, useState } from "react"
import CheckoutNavigation from "./CheckoutNavigation"
import Details from "../settings/Details"

const CheckoutPortal = ({ user }) => {
  const theme = useTheme()
  const [detailValues, setDetailValues] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [detailSlot, setDetailSlot] = useState(0)
  const [errors, setErrors] = useState({})
  const steps = useMemo(
    () => [
      {
        title: "Contact Info",
        component: (
          <Details
            user={user}
            values={detailValues}
            setValues={setDetailValues}
            slot={detailSlot}
            setSlot={setDetailSlot}
            errors={errors}
            setErrors={setErrors}
            checkout
          />
        ),
      },
      { title: "Address", component: null },
      { title: "Shipping", component: null },
      { title: "Payment", component: null },
      { title: "Confirmation", component: null },
      { title: `Thanks ${user.name}!`, component: null },
    ],
    [user, detailSlot, detailValues, errors]
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
      >
        {steps[selectedStep].component}
      </Grid>
    </Grid>
  )
}

export default CheckoutPortal
