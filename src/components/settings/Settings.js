import { Grid } from "@mui/material"
import React, { Fragment } from "react"
import Details from "./Details"
import Edit from "./Edit"
import Location from "./Location"
import Payments from "./Payments"

const Settings = ({ setSelectedSetting }) => {
  // sx prop
  const sx = {
    bottomRow: {
      borderTop: "4px solid #fff",
    },
    sectionContainer: {
      height: "50%",
    },
  }

  return (
    <Fragment>
      <Grid container sx={sx.sectionContainer}>
        <Details />
        <Payments />
      </Grid>
      <Grid container sx={{ ...sx.bottomRow, ...sx.sectionContainer }}>
        <Location />
        <Edit setSelectedSetting={setSelectedSetting} />
      </Grid>
    </Fragment>
  )
}

export default Settings
