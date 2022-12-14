import {
  Button,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import React, { useMemo } from "react"
import cardIcon from "../../images/card.svg"
import Slots from "./Slots"

const Payments = ({ user, slot, setSlot, saveCard, setSaveCard, checkout }) => {
  const theme = useTheme()
  const matchesVertical = useMediaQuery("(max-width: 1300px)")
  const matchesXS = useMediaQuery("(max-width: 700px)")
  const card = useMemo(() => user.paymentMethods[slot], [user, slot])

  // sx prop
  const sx = {
    paymentContainer: {
      borderLeft: !matchesVertical && !checkout ? "4px solid #fff" : undefined,
      position: "relative",
      height: matchesVertical ? "30rem" : undefined,
    },
    number: {
      color: "#fff",
      marginBottom: "5rem",
    },
    icon: {
      marginBottom: matchesXS ? "1rem" : "3rem",
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
    slotContainer: {
      position: "absolute",
      bottom: "0px",
    },
    switchWrapper: {
      marginRight: "4px",
      "& .MuiTypography-root": {
        color: "#fff",
        fontWeight: "bold",
      },
    },
  }

  return (
    <Grid
      item
      container
      sx={sx.paymentContainer}
      direction="column"
      lg={checkout ? 12 : 6}
      xs={12}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item sx={sx.icon}>
        <img src={cardIcon} alt="payment settings" />
      </Grid>
      <Grid item container justifyContent="center">
        <Grid item>
          <Typography align="center" variant="h3" sx={sx.number}>
            {card.last4
              ? `${card.brand.toUpperCase()} **** **** **** ${card.last4}`
              : "Add A New Card During Checkout"}
          </Typography>
        </Grid>
        {card.last4 && (
          <Grid item>
            <Button variant="contained" sx={sx.removeCard}>
              <Typography variant="h6" sx={sx.removeCardText}>
                remove card
              </Typography>
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid item container justifyContent="space-between" sx={sx.slotContainer}>
        <Slots slot={slot} setSlot={setSlot} noLabel />
        {checkout && (
          <Grid item>
            <FormControlLabel
              sx={sx.switchWrapper}
              label="Save Card For Future Use"
              labelPlacement="start"
              control={
                <Switch
                  checked={saveCard}
                  onChange={() => setSaveCard(!saveCard)}
                  color="secondary"
                />
              }
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default Payments
