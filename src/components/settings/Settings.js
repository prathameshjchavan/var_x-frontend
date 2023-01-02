import { Grid } from "@mui/material"
import React, { Fragment, useContext, useState } from "react"
import Details from "./Details"
import Edit from "./Edit"
import Location from "./Location"
import Payments from "./Payments"
import { UserContext } from "../../contexts"

const Settings = ({ setSelectedSetting }) => {
  const { user, dispatchUser } = useContext(UserContext)
  const [edit, setEdit] = useState(false)
  const [changesMade, setChangesMade] = useState(false)
  const [detailValues, setDetailValues] = useState({
    name: "",
    phone: "",
    email: "",
    password: "********",
  })
  const [locationValues, setLocationValues] = useState({
    street: "",
    zip: "",
    city: "",
    state: "",
  })
  const [locationSlot, setLocationSlot] = useState(0)
  const [detailSlot, setDetailSlot] = useState(0)

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
        <Details
          values={detailValues}
          setValues={setDetailValues}
          user={user}
          edit={edit}
          setChangesMade={setChangesMade}
          slot={detailSlot}
          setSlot={setDetailSlot}
        />
        <Payments user={user} edit={edit} />
      </Grid>
      <Grid container sx={{ ...sx.bottomRow, ...sx.sectionContainer }}>
        <Location
          values={locationValues}
          setValues={setLocationValues}
          user={user}
          edit={edit}
          setChangesMade={setChangesMade}
          slot={locationSlot}
          setSlot={setLocationSlot}
        />
        <Edit
          edit={edit}
          setEdit={setEdit}
          user={user}
          dispatchUser={dispatchUser}
          setSelectedSetting={setSelectedSetting}
          changesMade={changesMade}
          details={detailValues}
          locations={locationValues}
          detailSlot={detailSlot}
          locationSlot={locationSlot}
        />
      </Grid>
    </Fragment>
  )
}

export default Settings
