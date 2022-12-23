import { Grid } from "@mui/material"
import React, { Fragment } from "react"
import Details from "./Details"
import Location from "./Location"
import Payments from "./Payments"

const Settings = () => {
  return (
    <Fragment>
      <Grid container>
        <Details />
        <Payments />
      </Grid>
      <Grid container>
        <Location />
      </Grid>
    </Fragment>
  )
}

export default Settings
