import { Grid } from "@mui/material"
import React, { Fragment, useContext } from "react"
import Details from "./Details"
import Edit from "./Edit"
import Location from "./Location"
import Payments from "./Payments"
import { UserContext } from "../../contexts"

const Settings = ({ setSelectedSetting }) => {
  const { user } = useContext(UserContext)

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
        <Details user={user} />
        <Payments user={user} />
      </Grid>
      <Grid container sx={{ ...sx.bottomRow, ...sx.sectionContainer }}>
        <Location user={user} />
        <Edit user={user} setSelectedSetting={setSelectedSetting} />
      </Grid>
    </Fragment>
  )
}

export default Settings
