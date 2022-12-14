import React, { Fragment, useCallback, useMemo, useState } from "react"
import addUserIcon from "../../images/add-user.svg"
import nameAdornment from "../../images/name-adornment.svg"
import forward from "../../images/forward-outline.svg"
import backward from "../../images/backwards-outline.svg"
import { styled } from "@mui/material/styles"
import { Button, Grid, IconButton, Typography, useTheme } from "@mui/material"
import { getEmailPasswordFields } from "./Login"
import Fields from "./Fields"
import axios from "axios"

const SignUp = ({ setSelectedStep, steps }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)
  const [info, setInfo] = useState(false)
  const theme = useTheme()
  const nameField = useMemo(
    () => ({
      name: {
        helperText: "you must enter a name",
        placeholder: "Name",
        startAdornment: <img src={nameAdornment} alt="name" />,
      },
    }),
    []
  )
  const fields = info
    ? getEmailPasswordFields(false, false, visible, setVisible)
    : nameField
  const disabled =
    Object.keys(errors).some(error => errors[error] === true) ||
    Object.keys(values).some(value => values[value] === "")

  // sx prop
  const sx = {
    textfield: {
      width: "20rem",
      "& .MuiInput-input": {
        color: theme.palette.secondary.main,
      },
      "& .MuiInput-underline": {
        "&:before, &:hover:not(.Mui-disabled):before": {
          borderBottom: `2px solid ${theme.palette.primary.main}`,
        },
      },
    },
    facebookSignUp: {
      width: "20rem",
      borderRadius: "50px",
      marginTop: info ? 0 : "-3rem",
    },
    facebookText: {
      textTransform: "none",
      fontSize: "1.5rem",
    },
  }

  // functions
  const handleNavigate = useCallback(
    direction => {
      if (direction === "forward") setInfo(true)
      else if (info) setInfo(false)
      else {
        const loginIndex = steps.findIndex(step => step.label === "Login")
        setSelectedStep(loginIndex)
      }
    },
    [info, setInfo, steps, setSelectedStep]
  )

  const handleComplete = useCallback(() => {
    axios
      .post(`${process.env.STRAPI_API_URL}/api/auth/local/register`, {
        username: values.name,
        email: values.email,
        password: values.password,
      })
      .then(response => {
        const completeIndex = steps.findIndex(step => step.label === "Complete")
        setSelectedStep(completeIndex)
      })
      .catch(error => {
        console.log(error)
      })
  }, [values, steps, setSelectedStep])

  // styled components
  const AddUserIcon = styled("img")(() => ({
    height: "10rem",
    width: "11rem",
    marginTop: "5rem",
  }))

  const NavigationIcon = styled("img")(() => ({
    height: "4rem",
    width: "4rem",
  }))

  return (
    <Fragment>
      <Grid item>
        <AddUserIcon src={addUserIcon} alt="new user" />
      </Grid>
      <Fields
        fields={fields}
        errors={errors}
        setErrors={setErrors}
        values={values}
        setValues={setValues}
      />
      <Grid item>
        <Button
          variant="contained"
          disabled={info && disabled}
          onClick={() => info && handleComplete()}
          sx={sx.facebookSignUp}
          color="secondary"
        >
          <Typography sx={sx.facebookText} variant="h5">
            Sign up{!info && " with Facebook"}
          </Typography>
        </Button>
      </Grid>
      <Grid item container justifyContent="space-between">
        <Grid item>
          <IconButton onClick={() => handleNavigate("backward")}>
            <NavigationIcon src={backward} alt="back to login" />
          </IconButton>
        </Grid>
        {info ? null : (
          <Grid item>
            <IconButton onClick={() => handleNavigate("forward")}>
              <NavigationIcon src={forward} alt="continue registration" />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </Fragment>
  )
}

export default SignUp
