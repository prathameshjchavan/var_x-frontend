import { Grid } from "@mui/material"
import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
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
  const [billingSlot, setBillingSlot] = useState(0)
  const [detailErrors, setDetailErrors] = useState({})
  const [locationErrors, setLocationErrors] = useState({})
  const isError = useMemo(() => {
    const allErrors = { ...detailErrors, ...locationErrors }
    return Object.keys(allErrors).some(error => allErrors[error] === true)
  }, [detailErrors, locationErrors])

  // sx prop
  const sx = {
    bottomRow: {
      borderTop: "4px solid #fff",
    },
    sectionContainer: {
      height: "50%",
    },
  }

  useEffect(() => {
    setDetailErrors({})
  }, [detailSlot])

  useEffect(() => {
    setLocationErrors({})
  }, [locationSlot])

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
          errors={detailErrors}
          setErrors={setDetailErrors}
        />
        <Payments user={user} slot={billingSlot} setSlot={setBillingSlot} />
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
          errors={locationErrors}
          setErrors={setLocationErrors}
        />
        <Edit
          edit={edit}
          setEdit={setEdit}
          isError={isError}
          user={user}
          dispatchUser={dispatchUser}
          setSelectedSetting={setSelectedSetting}
          changesMade={changesMade}
          details={detailValues}
          locations={locationValues}
          detailSlot={detailSlot}
          locationSlot={locationSlot}
          detailValues={detailValues}
          setDetailValues={setDetailValues}
        />
      </Grid>
    </Fragment>
  )
}

export default Settings
