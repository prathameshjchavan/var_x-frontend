import { Grid } from "@mui/material"
import React, { Fragment, useContext, useState } from "react"
import Details from "./Details"
import Edit from "./Edit"
import Location from "./Location"
import Payments from "./Payments"
import { UserContext } from "../../contexts"

const Settings = ({ setSelectedSetting }) => {
  const { user } = useContext(UserContext)
  const [edit, setEdit] = useState(false)
  const [changesMade, setChangesMade] = useState(false)

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
        <Details user={user} edit={edit} setChangesMade={setChangesMade} />
        <Payments user={user} edit={edit} />
      </Grid>
      <Grid container sx={{ ...sx.bottomRow, ...sx.sectionContainer }}>
        <Location user={user} edit={edit} setChangesMade={setChangesMade} />
        <Edit
          edit={edit}
          setEdit={setEdit}
          user={user}
          setSelectedSetting={setSelectedSetting}
          changesMade={changesMade}
        />
      </Grid>
    </Fragment>
  )
}

export default Settings
