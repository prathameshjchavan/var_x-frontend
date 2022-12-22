import { Button, Grid } from "@mui/material"
import React, { useMemo, useState } from "react"
import fingerprint from "../../images/fingerprint.svg"
import nameAdornment from "../../images/name-adornment.svg"
import PhoneAdornment from "../../images/PhoneAdornment"
import Fields from "../auth/Fields"
import { getEmailPasswordFields } from "../auth/Login"
import { styled } from "@mui/material/styles"

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
    setVisible
  )
  const PhoneAdornmentContainer = styled("div")(() => ({
    height: 25.122,
    width: 25.173,
  }))
  const namePhoneFields = {
    name: {
      helperText: "you must enter a name",
      placeholder: "Name",
      startAdornment: <img src={nameAdornment} alt="name" />,
    },
    phone: {
      helperText: "invalid phone number",
      placeholder: "Phone",
      startAdornment: <PhoneAdornmentContainer></PhoneAdornmentContainer>,
    },
  }
  const fields = [namePhoneFields, emailPasswordFields]

  // sx prop
  const sx = {
    visibleIcon: {
      padding: 0,
    },
    emailAdornment: {
      height: 17,
      width: 22,
      marginBottom: 10,
    },
  }

  return (
    <Grid item container direction="column" xs={6} alignItems="center">
      <Grid item>
        <img src={fingerprint} alt="details settings" />
      </Grid>
      {fields.map((pair, index) => (
        <Grid container justifyContent="center" key={index}>
          <Fields
            fields={pair}
            values={values}
            setValues={setValues}
            errors={errors}
            setErrors={setErrors}
          />
        </Grid>
      ))}
      <Grid container>
        <Grid item>
          {[1, 2, 3].map(slot => (
            <Button key={slot}>{slot}</Button>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Details
