import { Button, Grid, Typography, useTheme } from "@mui/material"
import React, { useCallback } from "react"

const Slots = ({ slot, setSlot, checkout, noLabel, name }) => {
  const theme = useTheme()

  // sx prop
  const sx = {
    slot: {
      color: "#000",
      backgroundColor: "#fff",
      borderRadius: "25px",
      width: "2.5rem",
      height: "2.5rem",
      minWidth: 0,
      border: `0.15rem solid ${theme.palette.secondary.main}`,
      "&:hover": {
        backgroundColor: "#fff",
      },
      [theme.breakpoints.down("sm")]: {
        width: checkout ? "2rem" : "2.5rem",
        height: checkout ? "2rem" : "2.5rem",
      },
    },
    selectedSlot: {
      backgroundColor: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    },
    slotWrapper: {
      marginLeft: "1rem",
      marginBottom: "1rem",
      "& > :not(:first-of-type)": {
        marginLeft: "-0.5rem",
      },
    },
    slotText: {
      color: theme.palette.secondary.main,
      marginLeft: "-0.25rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: checkout ? "1.5rem" : undefined,
      },
    },
    selectedSlotText: {
      color: "#fff",
    },
    shipping: {
      color: "#fff",
      fontWeight: 600,
      marginLeft: "0.5rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
        marginTop: "0.4rem",
      },
    },
  }

  // functions
  const getSlotSx = useCallback(
    number =>
      number - 1 === slot ? { ...sx.slot, ...sx.selectedSlot } : sx.slot,
    [slot, sx.slot, sx.selectedSlot]
  )

  const getSlotTextSx = useCallback(
    number =>
      number - 1 === slot
        ? { ...sx.slotText, ...sx.selectedSlotText }
        : sx.slotText,
    [slot, sx.slotText, sx.selectedSlotText]
  )

  return (
    <Grid item container xs>
      <Grid item sx={sx.slotWrapper}>
        {[1, 2, 3].map(number => (
          <Button
            onClick={() => setSlot(number - 1)}
            sx={getSlotSx(number)}
            key={number}
          >
            <Typography variant="h5" sx={getSlotTextSx(number)}>
              {number}
            </Typography>
          </Button>
        ))}
      </Grid>
      {checkout && !noLabel && (
        <Grid item>
          <Typography variant="body1" sx={sx.shipping}>
            {name || "Shipping"}
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default Slots
