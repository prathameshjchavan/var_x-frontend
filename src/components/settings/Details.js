import { Button, Grid, Typography, useTheme } from "@mui/material"
import React, { useState } from "react"
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
  const theme = useTheme()
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
    visibleIcon: {
      padding: 0,
    },
    emailAdornment: {
      height: 17,
      width: 22,
      marginBottom: 10,
    },
    slot: {
      color: "#000",
      backgroundColor: "#fff",
      borderRadius: "25px",
      width: "2.5rem",
      height: "2.5rem",
      minWidth: 0,
      border: `0.15rem solid ${theme.palette.secondary.main}`,
      "&:hover": {
        backgroundColor: "#fff",
      },
    },
    slotWrapper: {
      marginLeft: "2rem",
      "& > :not(:first-child)": {
        marginLeft: "-0.5rem",
      },
    },
    slotText: {
      color: theme.palette.secondary.main,
      marginLeft: "-0.25rem",
    },
    fieldContainer: {
      "& > :not(:first-child)": {
        marginLeft: "5rem",
      },
    },
  }

  // styled components
  const Icon = styled("img")(() => ({
    marginBottom: "3rem",
  }))

  return (
    <Grid item container direction="column" xs={6} alignItems="center">
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
            whiteOutline
          />
        </Grid>
      ))}
      <Grid container>
        <Grid item sx={sx.slotWrapper}>
          {[1, 2, 3].map(slot => (
            <Button sx={sx.slot} key={slot}>
              <Typography variant="h5" sx={sx.slotText}>
                {slot}
              </Typography>
            </Button>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Details
