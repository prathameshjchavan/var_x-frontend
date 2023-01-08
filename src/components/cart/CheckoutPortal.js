import { Grid, useTheme } from "@mui/material"
import React, { useMemo, useState } from "react"
import CheckoutNavigation from "./CheckoutNavigation"
import Details from "../settings/Details"
import Location from "../settings/Location"
import Shipping from "./Shipping"

const CheckoutPortal = ({ user }) => {
  const theme = useTheme()
  const [detailValues, setDetailValues] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [detailSlot, setDetailSlot] = useState(0)
  const [detailBilling, setDetailBilling] = useState(false)
  const [locationValues, setLocationValues] = useState({
    street: "",
    zip: "",
    city: "",
    state: "",
  })
  const [locationSlot, setLocationSlot] = useState(0)
  const [locationBilling, setLocationBilling] = useState(false)
  const [errors, setErrors] = useState({})
  const [selectedShipping, setSelectedShipping] = useState(null)
  const shippingOptions = useMemo(
    () => [
      {
        label: "FREE SHIPPING",
        price: 0,
      },
      {
        label: "2-DAY SHIPPING",
        price: 9.99,
      },
      {
        label: "OVERNIGHT SHIPPING",
        price: 29.99,
      },
    ],
    []
  )
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
            billing={detailBilling}
            setBilling={setDetailBilling}
            checkout
          />
        ),
      },
      {
        title: "Address",
        component: (
          <Location
            user={user}
            values={locationValues}
            setValues={setLocationValues}
            slot={locationSlot}
            setSlot={setLocationSlot}
            errors={errors}
            setErrors={setErrors}
            billing={locationBilling}
            setBilling={setLocationBilling}
            checkout
          />
        ),
      },
      {
        title: "Shipping",
        component: (
          <Shipping
            shippingOptions={shippingOptions}
            selectedShipping={selectedShipping}
            setSelectedShipping={setSelectedShipping}
          />
        ),
      },
      { title: "Payment", component: null },
      { title: "Confirmation", component: null },
      { title: `Thanks ${user.name}!`, component: null },
    ],
    [
      user,
      detailSlot,
      detailValues,
      errors,
      detailBilling,
      locationSlot,
      locationValues,
      locationBilling,
    ]
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
