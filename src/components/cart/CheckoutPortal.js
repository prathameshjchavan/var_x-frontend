import { Grid, useTheme, useMediaQuery } from "@mui/material"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import CheckoutNavigation from "./CheckoutNavigation"
import Details from "../settings/Details"
import Location from "../settings/Location"
import Shipping from "./Shipping"
import Payments from "../settings/Payments"
import Confirmation from "./Confirmation"
import validate from "../ui/validate"
import BillingConfirmation from "./BillingConfirmation"
import Thankyou from "./Thankyou"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PK)

const CheckoutPortal = ({ user }) => {
  const theme = useTheme()
  const matchesXL = useMediaQuery(theme.breakpoints.down("xl"))
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
  const [cardSlot, setCardSlot] = useState(0)
  const [saveCard, setSaveCard] = useState(false)
  const [card, setCard] = useState({ brand: "", last4: "" })
  const [errors, setErrors] = useState({})
  const [cardError, setCardError] = useState(true)
  const [selectedShipping, setSelectedShipping] = useState(null)
  const [selectedStep, setSelectedStep] = useState(0)
  const [order, setOrder] = useState(null)

  // funtions
  const errorHelper = useCallback((values, forBilling, billingValues, slot) => {
    const valid = validate(values)

    // If we have one slot marked as billing...
    if (forBilling !== false && forBilling !== undefined) {
      // Validate billing values
      const billingValid = validate(billingValues)

      // If we are currently on the same slot as marked for billing i.e. billing and shipping are the same...
      if (forBilling === slot) {
        // ...then we just need to validate the one set of values because they are the same
        return Object.keys(billingValid).some(value => !billingValid[value])
      } else {
        // Otherwise, if we are currently on a different slot then, the slot marked for billing, i.e. billing and shipping are different, then we need to validate both the billing values, and the shipping values
        return (
          Object.keys(billingValid).some(value => !billingValid[value]) ||
          Object.keys(valid).some(value => !valid[value])
        )
      }
    } else {
      // If no slots were marked for billing, just validate current slot
      return Object.keys(valid).some(value => !valid[value])
    }
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
  let steps = [
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
          billingValues={billingDetails}
          setBillingValues={setBillingDetails}
          checkout
        />
      ),
      hasActions: true,
      error: errorHelper(
        detailValues,
        detailForBilling,
        billingDetails,
        detailSlot
      ),
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
          selectedStep={selectedStep}
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
          billingValues={billingLocation}
          setBillingValues={setBillingLocation}
          checkout
        />
      ),
      hasActions: true,
      error: errorHelper(
        locationValues,
        locationForBilling,
        billingLocation,
        locationSlot
      ),
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
          selectedStep={selectedStep}
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
      component: null,
      error: cardError,
    },
    {
      title: "Confirmation",
      component: (
        <Confirmation
          user={user}
          detailValues={detailValues}
          billingDetails={billingDetails}
          locationValues={locationValues}
          billingLocation={billingLocation}
          shippingOptions={shippingOptions}
          selectedShipping={selectedShipping}
          selectedStep={selectedStep}
          setSelectedStep={setSelectedStep}
          order={order}
          setOrder={setOrder}
          saveCard={saveCard}
          card={card}
          cardSlot={cardSlot}
        />
      ),
    },
    {
      title: `Thanks ${user.name.split(" ")[0]}!`,
      component: <Thankyou selectedShipping={selectedShipping} order={order} />,
    },
  ]

  if (detailForBilling !== false) {
    steps = steps.filter(step => step.title !== "Billing Info")
  }

  if (locationForBilling !== false) {
    steps = steps.filter(step => step.title !== "Billing Address")
  }

  // sx prop
  const sx = {
    container: {
      [theme.breakpoints.down("xl")]: {
        marginBottom: "5rem",
      },
    },
    stepContainer: {
      width: "40rem",
      height: "25rem",
      backgroundColor: theme.palette.primary.main,
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
  }

  // useEffects
  useEffect(() => {
    setErrors({})
  }, [detailSlot, locationSlot, selectedStep])

  return (
    <Grid
      item
      container
      direction="column"
      sx={sx.container}
      alignItems={matchesXL ? "flex-start" : "flex-end"}
      xl={6}
    >
      <CheckoutNavigation
        steps={steps}
        selectedStep={selectedStep}
        setSelectedStep={setSelectedStep}
        details={detailValues}
        detailSlot={detailSlot}
        location={locationValues}
        locationSlot={locationSlot}
        setErrors={setErrors}
      />
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        sx={sx.stepContainer}
      >
        <Elements stripe={stripePromise}>
          {steps[selectedStep].title !== "Payment" &&
            steps[selectedStep].component}
          <Payments
            slot={cardSlot}
            setSlot={setCardSlot}
            user={user}
            saveCard={saveCard}
            setSaveCard={setSaveCard}
            setCardError={setCardError}
            checkout
            visible={steps[selectedStep].title === "Payment"}
            setCard={setCard}
          />
        </Elements>
      </Grid>
      {steps[selectedStep].title === "Confirmation" && (
        <BillingConfirmation
          detailForBilling={detailForBilling}
          billingDetails={billingDetails}
          detailSlot={detailSlot}
          locationForBilling={locationForBilling}
          billingLocation={billingLocation}
          locationSlot={locationSlot}
        />
      )}
    </Grid>
  )
}

export default CheckoutPortal
