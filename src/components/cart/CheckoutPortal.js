import { Grid, useTheme } from "@mui/material"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import CheckoutNavigation from "./CheckoutNavigation"
import Details from "../settings/Details"
import Location from "../settings/Location"
import Shipping from "./Shipping"
import Payments from "../settings/Payments"
import Confirmation from "./Confirmation"
import validate from "../ui/validate"

const CheckoutPortal = ({ user }) => {
  const theme = useTheme()
  const [detailValues, setDetailValues] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [detailSlot, setDetailSlot] = useState(0)
  const [detailForBilling, setDetailForBilling] = useState(false)
  const [locationValues, setLocationValues] = useState({
    street: "",
    zip: "",
    city: "",
    state: "",
  })
  const [billingLocation, setBillingLocation] = useState({
    street: "",
    zip: "",
    city: "",
    state: "",
  })
  const [locationSlot, setLocationSlot] = useState(0)
  const [locationForBilling, setLocationForBilling] = useState(false)
  const [billingSlot, setBillingSlot] = useState(0)
  const [saveCard, setSaveCard] = useState(false)
  const [errors, setErrors] = useState({})
  const [selectedShipping, setSelectedShipping] = useState(null)
  const [selectedStep, setSelectedStep] = useState(0)

  // funtions
  const errorHelper = useCallback(values => {
    const valid = validate(values)

    return Object.keys(valid).some(value => !valid[value])
  }, [])

  // Shipping Options
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

  // Steps
  let steps = useMemo(
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
            billing={detailForBilling}
            setBilling={setDetailForBilling}
            checkout
          />
        ),
        error: errorHelper(detailValues),
      },
      {
        title: "Billing Info",
        component: (
          <Details
            user={user}
            values={billingDetails}
            setValues={setBillingDetails}
            errors={errors}
            setErrors={setErrors}
            checkout
            noSlots
          />
        ),
        error: errorHelper(billingDetails),
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
            billing={locationForBilling}
            setBilling={setLocationForBilling}
            checkout
          />
        ),
        error: errorHelper(locationValues),
      },
      {
        title: "Billing Address",
        component: (
          <Location
            user={user}
            values={billingLocation}
            setValues={setBillingLocation}
            errors={errors}
            setErrors={setErrors}
            checkout
            noSlots
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
        error: selectedShipping === null,
      },
      {
        title: "Payment",
        component: (
          <Payments
            slot={billingSlot}
            setSlot={setBillingSlot}
            user={user}
            saveCard={saveCard}
            setSaveCard={setSaveCard}
            checkout
          />
        ),
        error: false,
      },
      {
        title: "Confirmation",
        component: (
          <Confirmation
            detailValues={detailValues}
            billingDetails={billingDetails}
            detailForBilling={detailForBilling}
            locationValues={locationValues}
            billingLocation={billingLocation}
            locationForBilling={locationForBilling}
            shippingOptions={shippingOptions}
            selectedShipping={selectedShipping}
          />
        ),
      },
      { title: `Thanks ${user.name}!`, component: null },
    ],
    [
      user,
      detailSlot,
      detailValues,
      errors,
      detailForBilling,
      locationSlot,
      locationValues,
      locationForBilling,
      selectedShipping,
      shippingOptions,
      billingSlot,
      saveCard,
      errorHelper,
      billingDetails,
      billingLocation,
    ]
  )

  if (detailForBilling !== false) {
    steps = steps.filter(step => step.title !== "Billing Info")
  }

  if (locationForBilling !== false) {
    steps = steps.filter(step => step.title !== "Billing Address")
  }

  // sx prop
  const sx = {
    stepContainer: {
      width: "40rem",
      height: "25rem",
      backgroundColor: theme.palette.primary.main,
    },
  }

  // useEffects
  useEffect(() => {
    setErrors({})
  }, [detailSlot, locationSlot, selectedStep])

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
