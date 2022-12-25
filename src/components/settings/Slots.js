import { Button, Grid, Typography, useTheme } from "@mui/material"
import React, { useCallback } from "react"

const Slots = ({ slot, setSlot }) => {
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
    },
    selectedSlotText: {
      color: "#fff",
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
  )
}

export default Slots
