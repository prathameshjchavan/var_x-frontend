import {
  Chip,
  CircularProgress,
  FormControlLabel,
  Grid,
  Switch,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import axios from "axios"
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import locationIcon from "../../images/location.svg"
import streetAdornment from "../../images/street-adornment.svg"
import zipAdornment from "../../images/zip-adornment.svg"
import Fields from "../auth/Fields"
import Slots from "./Slots"
import { FeedbackContext } from "../../contexts"
import { setSnackbar } from "../../contexts/actions"

const Location = ({
  user,
  edit,
  setChangesMade,
  values,
  setValues,
  slot,
  setSlot,
  errors,
  setErrors,
  checkout,
  billing,
  setBilling,
  billingValues,
  setBillingValues,
  noSlots,
  subscription,
}) => {
  const theme = useTheme()
  const isMounted = useRef(false)
  const [loading, setLoading] = useState(false)
  const matchesVertical = useMediaQuery("(max-width: 1300px)")
  const { dispatchFeedback } = useContext(FeedbackContext)

  // sx prop
  const sx = {
    locationContainer: {
      position: "relative",
      borderBottom:
        matchesVertical && !subscription ? "4px solid #fff" : undefined,
      height: matchesVertical ? (!checkout ? "30rem" : "100%") : "100%",
    },
    icon: { marginBottom: checkout ? "1rem" : "3rem" },
    fieldContainer: {
      "& > :not(:first-of-type)": {
        marginTop: "2rem",
      },
    },
    chipWrapper: { marginTop: "2rem", marginBottom: "3rem" },
    slotContainer: {
      position: "absolute",
      bottom: "0px",
    },
    switchWrapper: {
      marginRight: "4px",
      "& .MuiTypography-root": {
        color: "#fff",
        fontWeight: "bold",
        [theme.breakpoints.down("sm")]: {
          fontSize: "1rem",
        },
      },
    },
  }

  const fields = useMemo(
    () => ({
      street: {
        placeholder: "Street",
        helperText: "invalid address",
        startAdornment: <img src={streetAdornment} alt="street" />,
      },
      zip: {
        placeholder: "Zip Code",
        helperText: "invalid zip code",
        startAdornment: <img src={zipAdornment} alt="zip code" />,
      },
    }),
    []
  )

  // functions
  const getLocation = useCallback(() => {
    setLoading(true)

    axios
      .get(
        `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-postal-code&q=&facet=country_code&facet=admin_name1&facet=place_name&facet=postal_code&refine.country_code=US&refine.postal_code=${values.zip}`
      )
      .then(response => {
        const { place_name, admin_name1 } = response.data.records[0].fields

        setValues(values => ({
          ...values,
          city: place_name,
          state: admin_name1,
        }))
      })
      .catch(error => {
        console.error(error)
        dispatchFeedback(
          setSnackbar({
            status: "error",
            message: "There was a problem with your zipcode, please try again.",
          })
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }, [values.zip, setValues, dispatchFeedback])

  // useEffects
  useEffect(() => {
    if (noSlots || user.name === "Guest") return

    setValues(user.locations[slot])
  }, [user, slot, setValues, noSlots])

  useEffect(() => {
    if (!checkout || !subscription) {
      const changed = Object.keys(user.locations[slot]).some(
        field => values[field] !== user.locations[slot][field]
      )

      setChangesMade(changed)
    }

    if (values.zip.length === 5 && !values.city) {
      getLocation()
    } else if (values.zip.length < 5 && values.city) {
      setValues(values => ({ ...values, city: "", state: "" }))
    }
  }, [user, slot, values, setChangesMade, getLocation, setValues, checkout])

  useEffect(() => {
    if (noSlots) {
      isMounted.current = false
      return
    }
    if (!isMounted.current) {
      isMounted.current = true
      return
    }
    if (billing === false && isMounted.current) {
      setValues(billingValues)
    } else {
      setBillingValues(values)
    }
  }, [billing])

  return (
    <Grid
      item
      container
      direction="column"
      lg={checkout ? 12 : 6}
      xs={12}
      alignItems="center"
      justifyContent="center"
      sx={sx.locationContainer}
    >
      <Grid item sx={sx.icon}>
        <img src={locationIcon} alt="location settings" />
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        sx={sx.fieldContainer}
      >
        <Fields
          fields={fields}
          values={billing === slot && !noSlots ? billingValues : values}
          setValues={
            billing === slot && !noSlots ? setBillingValues : setValues
          }
          errors={errors}
          setErrors={setErrors}
          isWhite
          disabled={checkout ? false : !edit}
        />
      </Grid>
      <Grid item sx={sx.chipWrapper}>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <Chip
            label={
              values.city ? `${values.city}, ${values.state}` : "City, State"
            }
            color="secondary"
          />
        )}
      </Grid>
      {!noSlots && (
        <Grid
          item
          container
          justifyContent={checkout ? "space-between" : undefined}
          sx={sx.slotContainer}
        >
          <Slots slot={slot} setSlot={setSlot} checkout name={subscription} />
          {checkout && !subscription && (
            <Grid item>
              <FormControlLabel
                sx={sx.switchWrapper}
                label="Billing"
                labelPlacement="start"
                control={
                  <Switch
                    checked={billing === slot}
                    onChange={() => setBilling(billing === slot ? false : slot)}
                    color="secondary"
                  />
                }
              />
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  )
}

export default Location
