import { Grid } from "@mui/material"
import React from "react"
import Details from "./Details"
import Payments from "./Payments"

const Settings = () => {
  return (
    <Grid container>
      <Details />
      <Payments />
    </Grid>
  )
}

export default Settings
