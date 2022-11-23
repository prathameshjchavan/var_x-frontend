import { Grid, useTheme } from "@mui/material"
import React from "react"

const ProductInfo = ({
  name,
  description,
  variants,
  selectedVariant,
  setSelectedVariant,
}) => {
  const theme = useTheme()

  // sx prop
  const sx = {
    mainContainer: { width: "50%", position: "relative" },
    background: {
      backgroundColor: theme.palette.secondary.main,
      height: "45rem",
      width: "35rem",
    },
    center: {
      backgroundColor: theme.palette.primary.main,
      height: "35rem",
      width: "45rem",
      position: "absolute",
    },
  }

  return (
    <Grid
      item
      container
      sx={sx.mainContainer}
      direction="column"
      justifyContent="center"
      alignItems="flex-end"
    >
      <Grid item container sx={sx.background} direction="column"></Grid>
      <Grid item container sx={sx.center} direction="column"></Grid>
    </Grid>
  )
}

export default ProductInfo
