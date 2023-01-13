import { Grid } from "@mui/material"
import React, { useMemo } from "react"

const BillingConfirmation = ({
  detailForBilling,
  billingDetails: { name, email, phone },
  detailSlot,
  locationForBilling,
  billingLocation: { street, zip, city, state },
  locationSlot,
}) => {
  const fields = useMemo(
    () => [
      {
        title: "Billing Info",
        values: { name, email, phone },
        hidden: detailForBilling === detailSlot,
      },
      {
        title: "Billing Address",
        values: { address1: street, address2: `${city}, ${state} ${zip}` },
        hidden: locationForBilling === locationSlot,
      },
    ],
    []
  )

  return <Grid>BillingConfirmation</Grid>
}

export default BillingConfirmation
