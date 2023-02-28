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
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

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
  const [cardElement, setCardElement] = useState(null)
  const [cardError, setCardError] = useState(true)
  const [addCard, setAddCard] = useState(false)
  const isError = useMemo(() => {
    const allErrors = { ...detailErrors, ...locationErrors }
    return Object.keys(allErrors).some(error => allErrors[error] === true)
  }, [detailErrors, locationErrors])
  const stripePromise = useMemo(
    () => loadStripe(process.env.GATSBY_STRIPE_PK),
    []
  )
  const hasSubscriptionActive = user?.subscriptions?.length > 0

  // sx prop
  const sx = {
    bottomRow: {
      borderTop: "4px solid #fff",
    },
    sectionContainer: {
      height: "50%",
    },
  }

  // useEffects
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
        <Elements stripe={stripePromise}>
          <Payments
            user={user}
            edit={edit}
            slot={billingSlot}
            setSlot={setBillingSlot}
            hasSubscriptionActive={hasSubscriptionActive}
            setCardElement={setCardElement}
            setCardError={setCardError}
            addCard={addCard}
            setAddCard={setAddCard}
          />
        </Elements>
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
        <Elements stripe={stripePromise}>
          <Edit
            edit={edit}
            setEdit={setEdit}
            addCard={addCard}
            isError={isError}
            user={user}
            dispatchUser={dispatchUser}
            setSelectedSetting={setSelectedSetting}
            changesMade={changesMade}
            details={detailValues}
            locations={locationValues}
            detailSlot={detailSlot}
            locationSlot={locationSlot}
            billingSlot={billingSlot}
            cardElement={cardElement}
            cardError={cardError}
            detailValues={detailValues}
            setDetailValues={setDetailValues}
            setAddCard={setAddCard}
            setCardError={setCardError}
            setCardElement={setCardElement}
          />
        </Elements>
      </Grid>
    </Fragment>
  )
}

export default Settings
