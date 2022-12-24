import { Grid } from "@mui/material"
import React, { useState } from "react"
import fingerprint from "../../images/fingerprint.svg"
import NameAdornment from "../../images/NameAdornment"
import PhoneAdornment from "../../images/PhoneAdornment"
import Fields from "../auth/Fields"
import { getEmailPasswordFields } from "../auth/Login"
import { styled } from "@mui/material/styles"
import Slots from "./Slots"

const Details = () => {
  const [visible, setVisible] = useState(false)
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
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
      marginBottom: "2rem",
      "& > :not(:first-of-type)": {
        marginLeft: "5rem",
      },
    },
    slotContainer: {
      position: "absolute",
      bottom: "0px",
    },
  }

  // styled components
  const Icon = styled("img")(() => ({
    marginBottom: "3rem",
  }))

  return (
    <Grid
      item
      container
      direction="column"
      xs={6}
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
          justifyContent="center"
          key={index}
        >
          <Fields
            fields={pair}
            values={values}
            setValues={setValues}
            errors={errors}
            setErrors={setErrors}
            isWhite
          />
        </Grid>
      ))}
      <Grid item container sx={sx.slotContainer}>
        <Slots />
      </Grid>
    </Grid>
  )
}

export default Details
