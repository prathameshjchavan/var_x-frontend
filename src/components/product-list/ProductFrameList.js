import { Grid, useTheme } from "@mui/material"
import frame from "../../images/product-frame-list.svg"
import React from "react"

function ProductFrameList() {
  const theme = useTheme()

  const sx = {
    frame: {
      backgroundImage: `url(${frame})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "25rem",
    },
    info: {
      backgroundColor: theme.palette.primary.main,
      height: "100%",
      width: "100%",
    },
  }

  return (
    <Grid item container>
      <Grid item container xs={10} sx={sx.frame}></Grid>
      <Grid item container xs={2} direction="column" sx={sx.info}></Grid>
    </Grid>
  )
}

export default ProductFrameList
