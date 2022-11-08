import { Button, ButtonGroup, Grid, Typography, useTheme } from "@mui/material"
import cart from "../../images/cart.svg"
import React, { useState } from "react"

const QtyButton = () => {
  const theme = useTheme()
  const [qty, setQty] = useState(1)

  // sx prop
  const sx = {
    buttonGroup: {
      height: "3rem",
      border: `3px solid ${theme.palette.secondary.light}`,
      display: "flex",
      alignItems: "center",
      maxWidth: "fit-content",
    },
    editButtonGroup: {
      borderWidth: "0px 3px",
      borderRadius: 0,
      borderColor: theme.palette.secondary.light,
      borderStyle: "solid",
      height: "105%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    editButtons: {
      height: "1.5rem",
      width: "105%",
      "&:first-of-type": {
        borderBottom: `1px solid ${theme.palette.secondary.light} !important`,
      },
      "&:last-of-type": {
        borderTop: `1px solid ${theme.palette.secondary.light} !important`,
      },
      borderRadius: 0,
    },
    button: { border: "none !important" },
    qtyText: {
      color: "#fff",
    },
  }

  return (
    <Grid item>
      <ButtonGroup variant="outlined" sx={sx.buttonGroup}>
        <Button disableRipple sx={sx.button}>
          <Typography variant="h3" sx={sx.qtyText}>
            {qty}
          </Typography>
        </Button>
        <ButtonGroup sx={sx.editButtonGroup}>
          <Button disableRipple sx={{ ...sx.button, ...sx.editButtons }}>
            <Typography variant="h3" sx={sx.qtyText}>
              +
            </Typography>
          </Button>
          <Button disableRipple sx={{ ...sx.button, ...sx.editButtons }}>
            <Typography
              variant="h3"
              sx={{ ...sx.qtyText, marginTop: "-0.3rem" }}
            >
              -
            </Typography>
          </Button>
        </ButtonGroup>
        <Button disableRipple sx={sx.button}>
          <img src={cart} alt="add to cart" />
        </Button>
      </ButtonGroup>
    </Grid>
  )
}

export default QtyButton
