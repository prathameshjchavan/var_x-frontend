import { Button, Grid, Typography } from "@mui/material"
import React from "react"
import shippingIcon from "../../images/Shipping.svg"

const Shipping = ({
  shippingOptions,
  selectedShipping,
  setSelectedShipping,
}) => {
  // sx prop
  const sx = {
    button: {},
  }

  return (
    <Grid item container direction="column" alignItems="center">
      <Grid item>
        <img src={shippingIcon} alt="shipping" />
      </Grid>
      <Grid item container>
        {shippingOptions.map(option => (
          <Grid item key={option.label}>
            <Button sx={sx.button}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h5" sx={sx.label}>
                    {option.label}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" sx={sx.price}>
                    ${option.price.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default Shipping
