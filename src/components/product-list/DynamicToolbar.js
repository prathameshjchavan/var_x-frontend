import { Grid, useTheme } from "@mui/material"
import React from "react"
import DescriptionContainer from "./DescriptionContainer"
import FunctionContainer from "./FunctionContainer"

const DynamicToolbar = ({ filterOptions, name, description }) => {
  const theme = useTheme()

  // sx prop
  const sx = {
    toolbar: {
      border: `5px solid ${theme.palette.primary.main}`,
      borderRadius: "25px",
      width: "95%",
      height: "auto",
    },
  }

  return (
    <Grid item container sx={sx.toolbar} direction="column">
      <FunctionContainer filterOptions={filterOptions} />
      <DescriptionContainer name={name} description={description} />
    </Grid>
  )
}

export default DynamicToolbar
