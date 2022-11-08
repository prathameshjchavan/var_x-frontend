import { Button, Grid, useTheme } from "@mui/material"
import React from "react"

const Swatches = ({ colors, selectedColor, setSelectedColor }) => {
  const theme = useTheme()

  // sx prop
  const sx = {
    swatchesContainer: {
      marginTop: "0.5rem",
      "&:not(:first-of-type)": {
        marginLeft: "-0.5rem",
      },
    },
    swatch: {
      height: "3rem",
      width: "3rem",
      minWidth: 0,
      borderRadius: 50,
    },
  }

  // functions
  function getSwatchSx(color) {
    return {
      ...sx.swatch,
      backgroundColor: color,
      "&:hover": { backgroundColor: color },
      border:
        color === selectedColor
          ? `3px solid ${theme.palette.secondary.main}`
          : "3px solid #fff",
    }
  }

  return (
    <Grid item container>
      {colors.map(color => (
        <Grid key={color} item sx={sx.swatchesContainer}>
          <Button
            onClick={() => setSelectedColor(color)}
            sx={getSwatchSx(color)}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default Swatches
