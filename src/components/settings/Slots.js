import { Button, Grid, Typography, useTheme } from "@mui/material"
import React from "react"

const Slots = () => {
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
    slotWrapper: {
      marginLeft: "2rem",
      "& > :not(:first-child)": {
        marginLeft: "-0.5rem",
      },
    },
    slotText: {
      color: theme.palette.secondary.main,
      marginLeft: "-0.25rem",
    },
  }

  return (
    <Grid item sx={sx.slotWrapper}>
      {[1, 2, 3].map(slot => (
        <Button sx={sx.slot} key={slot}>
          <Typography variant="h5" sx={sx.slotText}>
            {slot}
          </Typography>
        </Button>
      ))}
    </Grid>
  )
}

export default Slots
