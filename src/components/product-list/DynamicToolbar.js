import { Grid, useTheme } from "@mui/material"
import React from "react"
import FunctionContainer from "./FunctionContainer"

const DynamicToolbar = () => {
  const theme = useTheme()

  // sx prop
  const sx = {
    toolbar: {
      border: `5px solid ${theme.palette.primary.main}`,
      borderRadius: "25px",
      width: "95%",
      height: "20rem",
    },
  }

  return (
    <Grid item container sx={sx.toolbar} direction="column">
      <FunctionContainer />
    </Grid>
  )
}

export default DynamicToolbar
