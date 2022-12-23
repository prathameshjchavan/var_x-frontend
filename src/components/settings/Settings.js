import { Grid } from "@mui/material"
import React, { Fragment } from "react"
import Details from "./Details"
import Edit from "./Edit"
import Location from "./Location"
import Payments from "./Payments"

const Settings = () => {
  // sx prop
  const sx = {
    bottomRow: {
      borderTop: "4px solid #fff",
    },
  }

  return (
    <Fragment>
      <Grid container>
        <Details />
        <Payments />
      </Grid>
      <Grid container sx={sx.bottomRow}>
        <Location />
        <Edit />
      </Grid>
    </Fragment>
  )
}

export default Settings
