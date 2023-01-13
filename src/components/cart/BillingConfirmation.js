import { Grid, Typography, useTheme } from "@mui/material"
import React, { useMemo } from "react"

const BillingConfirmation = ({
  detailForBilling,
  billingDetails: { name, email, phone },
  detailSlot,
  locationForBilling,
  billingLocation: { street, zip, city, state },
  locationSlot,
}) => {
  const theme = useTheme()

  // sx prop
  const sx = {
    wrapper: {
      margin: "1rem 2rem",
    },
    heading: {
      color: theme.palette.secondary.main,
      fontSize: "1.5rem",
    },
    values: {
      fontSize: "1.25rem",
    },
  }

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
    [
      name,
      email,
      phone,
      detailForBilling,
      detailSlot,
      street,
      city,
      state,
      zip,
      locationForBilling,
      locationSlot,
    ]
  )

  return (
    <Grid item container justifyContent="flex-end">
      {fields.map(field =>
        !field.hidden ? (
          <Grid item key={field.title} sx={sx.wrapper}>
            <Typography variant="h4" sx={sx.heading}>
              {field.title}
            </Typography>
            <Typography variant="h3" sx={sx.values}>
              {Object.keys(field.values).map(value => (
                <span key={value}>
                  {field.values[value]}
                  <br />
                </span>
              ))}
            </Typography>
          </Grid>
        ) : null
      )}
    </Grid>
  )
}

export default BillingConfirmation
