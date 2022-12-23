import { Chip, Grid } from "@mui/material"
import React, { useMemo, useState } from "react"
import locationIcon from "../../images/location.svg"
import streetAdornment from "../../images/street-adornment.svg"
import zipAdornment from "../../images/zip-adornment.svg"
import Fields from "../auth/Fields"
import Slots from "./Slots"

const Location = () => {
  const [values, setValues] = useState({ street: "", zip: "" })
  const [errors, setErrors] = useState({})

  // sx prop
  const sx = {
    icon: { marginBottom: "3rem" },
    fieldContainer: {
      "& > :not(:first-child)": {
        marginTop: "2rem",
      },
    },
    chipWrapper: { marginTop: "2rem", marginBottom: "3rem" },
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

  return (
    <Grid item container direction="column" xs={6} alignItems="center">
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
        />
      </Grid>
      <Grid item sx={sx.chipWrapper}>
        <Chip label="City, State" color="secondary" />
      </Grid>
      <Grid item container>
        <Slots />
      </Grid>
    </Grid>
  )
}

export default Location
