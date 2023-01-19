import { Button, Grid, Typography, useTheme } from "@mui/material"
import { styled } from "@mui/material/styles"
import React from "react"
import shippingIcon from "../../images/Shipping.svg"

const Shipping = ({
  shippingOptions,
  selectedShipping,
  setSelectedShipping,
}) => {
  const theme = useTheme()

  // sx prop
  const sx = {
    container: {
      height: "100%",
    },
    button: {
      backgroundColor: theme.palette.secondary.main,
      borderRadius: "15px",
      height: "10rem",
      width: "10rem",
      "&:hover": {
        backgroundColor: theme.palette.secondary.light,
      },
      [theme.breakpoints.down("sm")]: {
        height: "6rem",
        width: "6rem",
      },
    },
    label: {
      fontSize: "1.5rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.9rem",
      },
    },
    price: {
      color: "#fff",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.25rem",
      },
    },
    selectedButton: {
      backgroundColor: "#fff",
      "&:hover": {
        backgroundColor: "#fff",
      },
    },
    selectedLabel: {
      color: theme.palette.secondary.main,
    },
    selectedPrice: {
      color: theme.palette.secondary.main,
    },
  }

  // functions
  const getSx = (label, element) => {
    let elSx = sx[element.toLowerCase()]

    if (label === selectedShipping) {
      elSx = { ...elSx, ...sx[`selected${element}`] }
    }

    return elSx
  }

  // styled components
  const Icon = styled("img")(() => ({
    marginTop: "-2rem",
    marginBottom: "1rem",
  }))

  return (
    <Grid
      item
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={sx.container}
    >
      <Grid item>
        <Icon src={shippingIcon} alt="shipping" />
      </Grid>
      <Grid item container justifyContent="space-around">
        {shippingOptions.map(({ label, price }) => (
          <Grid item key={label}>
            <Button
              sx={getSx(label, "Button")}
              onClick={() => setSelectedShipping(label)}
            >
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h5" sx={getSx(label, "Label")}>
                    {label}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" sx={getSx(label, "Price")}>
                    ${price.toFixed(2)}
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
