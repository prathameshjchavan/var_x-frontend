import { Grid, useMediaQuery } from "@mui/material"
import React, { useEffect, useState } from "react"
import fingerprint from "../../images/fingerprint.svg"
import NameAdornment from "../../images/NameAdornment"
import PhoneAdornment from "../../images/PhoneAdornment"
import Fields from "../auth/Fields"
import { getEmailPasswordFields } from "../auth/Login"
import { styled } from "@mui/material/styles"
import Slots from "./Slots"

const Details = ({
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
  const [visible, setVisible] = useState(false)
  const matchesVertical = useMediaQuery("(max-width: 1300px)")
  const matchesXS = useMediaQuery("(max-width: 700px)")
  const emailPasswordFields = getEmailPasswordFields(
    false,
    false,
    visible,
    setVisible,
    true
  )
  const PhoneAdornmentContainer = styled("div")(() => ({
    height: 25.122,
    width: 25.173,
  }))
  const namePhoneFields = {
    name: {
      helperText: "you must enter a name",
      placeholder: "Name",
      startAdornment: <NameAdornment color="#fff" />,
    },
    phone: {
      helperText: "invalid phone number",
      placeholder: "Phone",
      startAdornment: (
        <PhoneAdornmentContainer>
          <PhoneAdornment />
        </PhoneAdornmentContainer>
      ),
    },
  }
  const fields = [namePhoneFields, emailPasswordFields]

  // sx prop
  const sx = {
    detailsContainer: {
      position: "relative",
      borderBottom: matchesVertical ? "4px solid #fff" : undefined,
      height: matchesVertical ? "30rem" : undefined,
    },
    visibleIcon: {
      padding: 0,
    },
    emailAdornment: {
      height: 17,
      width: 22,
      marginBottom: 10,
    },
    fieldContainer: {
      marginBottom: matchesXS ? "1rem" : "2rem",
      "& > :not(:first-of-type)": {
        marginLeft: !matchesXS ? "5rem" : undefined,
        marginTop: "1rem",
      },
    },
    slotContainer: {
      position: "absolute",
      bottom: "0px",
    },
  }

  // styled components
  const Icon = styled("img")(() => ({
    marginBottom: matchesXS ? "1rem" : "3rem",
  }))

  // useEffect
  useEffect(() => {
    setValues({ ...user.contactInfo[slot], password: "********" })
  }, [slot, user.contactInfo, setValues])

  useEffect(() => {
    const changed = Object.keys(user.contactInfo[slot]).some(
      field => values[field] !== user.contactInfo[slot][field]
    )

    setChangesMade(changed)
  }, [user, slot, values, setChangesMade])

  return (
    <Grid
      item
      container
      direction="column"
      lg={6}
      xs={12}
      alignItems="center"
      justifyContent="center"
      sx={sx.detailsContainer}
    >
      <Grid item>
        <Icon src={fingerprint} alt="details settings" />
      </Grid>
      {fields.map((pair, index) => (
        <Grid
          container
          sx={sx.fieldContainer}
          direction={matchesXS ? "column" : "row"}
          justifyContent="center"
          alignItems={matchesXS ? "center" : undefined}
          key={index}
        >
          <Fields
            fields={pair}
            values={values}
            setValues={setValues}
            errors={errors}
            setErrors={setErrors}
            isWhite
            disabled={!edit}
            settings
          />
        </Grid>
      ))}
      <Grid item container sx={sx.slotContainer}>
        <Slots slot={slot} setSlot={setSlot} />
      </Grid>
    </Grid>
  )
}

export default Details
