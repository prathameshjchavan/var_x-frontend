import { Button, Grid } from "@mui/material"
import React from "react"

const Swatches = ({ colors }) => {
  // sx prop
  const sx = {
    swatchesContainer: {
      marginTop: "0.5rem",
      "&:not(:first-child)": {
        marginLeft: "-0.5rem",
      },
    },
    swatch: {
      border: `3px solid #fff`,
      height: "3rem",
      width: "3rem",
      minWidth: 0,
      borderRadius: 50,
    },
  }

  return (
    <Grid item container>
      {colors.sort().map(color => (
        <Grid key={color} item sx={sx.swatchesContainer}>
          <Button
            sx={{
              ...sx.swatch,
              backgroundColor: color,
              "&:hover": { backgroundColor: color },
            }}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default Swatches
