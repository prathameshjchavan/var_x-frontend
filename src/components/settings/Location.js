import { Chip, Grid } from "@mui/material"
import React, { useEffect, useMemo } from "react"
import locationIcon from "../../images/location.svg"
import streetAdornment from "../../images/street-adornment.svg"
import zipAdornment from "../../images/zip-adornment.svg"
import Fields from "../auth/Fields"
import Slots from "./Slots"

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
}) => {
  // sx prop
  const sx = {
    locationContainer: { position: "relative" },
    icon: { marginBottom: "3rem" },
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

  useEffect(() => {
    setValues(user.locations[slot])
  }, [user, slot, setValues])

  useEffect(() => {
    const changed = Object.keys(user.locations[slot]).some(
      field => values[field] !== user.locations[slot][field]
    )

    setChangesMade(changed)
  }, [user, slot, values, setChangesMade])

  return (
    <Grid
      item
      container
      direction="column"
      xs={6}
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
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
          isWhite
          disabled={!edit}
        />
      </Grid>
      <Grid item sx={sx.chipWrapper}>
        <Chip
          label={
            values.city ? `${values.city}, ${values.state}` : "City, State"
          }
          color="secondary"
        />
      </Grid>
      <Grid item container sx={sx.slotContainer}>
        <Slots slot={slot} setSlot={setSlot} />
      </Grid>
    </Grid>
  )
}

export default Location
