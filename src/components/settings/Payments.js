import { Button, Grid, Typography, useTheme } from "@mui/material"
import React, { useMemo } from "react"
import card from "../../images/card.svg"
import Slots from "./Slots"

const Payments = () => {
  const cards = useMemo(() => [{ last4: 1234, brand: "Visa" }], [])
  const theme = useTheme()

  // sx prop
  const sx = {
    paymentContainer: { borderLeft: "4px solid #fff" },
    number: {
      color: "#fff",
      marginBottom: "5rem",
    },
    icon: {
      marginBottom: "3rem",
    },
    removeCard: {
      backgroundColor: "#fff",
      paddingLeft: "5px",
      paddingRight: "5px",
      "&:hover": {
        backgroundColor: "#fff",
      },
      marginLeft: "2rem",
    },
    removeCardText: {
      fontSize: "1rem",
      color: theme.palette.primary.main,
      fontFamily: "Philosopher",
      fontStyle: "italic",
    },
  }

  return (
    <Grid
      item
      container
      sx={sx.paymentContainer}
      direction="column"
      xs={6}
      alignItems="center"
    >
      <Grid item sx={sx.icon}>
        <img src={card} alt="payment settings" />
      </Grid>
      <Grid item container justifyContent="center">
        <Grid item>
          <Typography variant="h3" sx={sx.number}>
            {cards
              ? `${cards[0].brand.toUpperCase()} **** **** **** ${
                  cards[0].last4
                }`
              : "Add A New Card During Checkout"}
          </Typography>
        </Grid>
        {cards && (
          <Grid item>
            <Button variant="contained" sx={sx.removeCard}>
              <Typography variant="h6" sx={sx.removeCardText}>
                remove card
              </Typography>
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid item container>
        <Slots />
      </Grid>
    </Grid>
  )
}

export default Payments
