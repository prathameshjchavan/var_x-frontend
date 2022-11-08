import { Button, Grid, Typography, useTheme } from "@mui/material"
import React from "react"

const Sizes = ({ sizes, selectedSize, setSelectedSize }) => {
  const theme = useTheme()

  // sx prop
  const sx = {
    button: {
      border: "3px solid #fff",
      borderRadius: 50,
      height: "3rem",
      width: "3rem",
      minWidth: 0,
    },
    size: {
      color: "#fff",
    },
    selected: {
      backgroundColor: theme.palette.secondary.main,
    },
  }

  // functions
  function getButtonSx(size) {
    return size === selectedSize ? { ...sx.button, ...sx.selected } : sx.button
  }

  return (
    <Grid item container justifyContent="space-between">
      {sizes.map((size, i) => (
        <Grid key={i} item>
          <Button onClick={() => setSelectedSize(size)} sx={getButtonSx(size)}>
            <Typography variant="h3" sx={sx.size}>
              {size}
            </Typography>
          </Button>
        </Grid>
      ))}
    </Grid>
  )
}

export default Sizes
