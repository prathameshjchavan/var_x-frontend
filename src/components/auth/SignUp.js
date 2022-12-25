import React, { Fragment, useCallback, useMemo, useState } from "react"
import addUserIcon from "../../images/add-user.svg"
import nameAdornment from "../../images/name-adornment.svg"
import forward from "../../images/forward-outline.svg"
import backward from "../../images/backwards-outline.svg"
import { styled } from "@mui/material/styles"
import { Button, Grid, IconButton, Typography, useTheme } from "@mui/material"
import { getEmailPasswordFields } from "./Login"
import CircularProgress from "@mui/material/CircularProgress"
import Fields from "./Fields"
import axios from "axios"
import { setUser, setSnackbar } from "../../contexts/actions"

const SignUp = ({ dispatchUser, dispatchFeedback, setSelectedStep, steps }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)
  const [info, setInfo] = useState(false)
  const [loading, setLoading] = useState(false)
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
  const fields = useMemo(
    () =>
      info
        ? getEmailPasswordFields(false, false, visible, setVisible)
        : nameField,
    [info, visible, setVisible, nameField]
  )
  const disabled = useMemo(
    () =>
      Object.keys(errors).some(error => errors[error] === true) ||
      Object.keys(errors).length !== Object.keys(values).length,
    [errors, values]
  )

  // sx prop
  const sx = {
    facebookSignUp: {
      width: "20rem",
      borderRadius: "50px",
      marginTop: info ? 0 : "-3rem",
      [theme.breakpoints.down("sm")]: {
        width: "15rem",
      },
    },
    facebookText: {
      textTransform: "none",
      fontSize: "1.5rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.25rem",
      },
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
    setLoading(true)

    const data = {
      paymentMethods: [
        { brand: "", last4: "" },
        { brand: "", last4: "" },
        { brand: "", last4: "" },
      ],
      contactInfo: [
        { name: values.name, email: values.email, phone: "" },
        { name: "", email: "", phone: "" },
        { name: "", email: "", phone: "" },
      ],
      locations: [
        { street: "", zip: "", city: "", state: "" },
        { street: "", zip: "", city: "", state: "" },
        { street: "", zip: "", city: "", state: "" },
      ],
    }

    axios
      .post(`${process.env.STRAPI_API_URL}/api/auth/local/register`, {
        name: values.name,
        username: values.email,
        email: values.email,
        password: values.password,
        ...data,
      })
      .then(response => {
        dispatchUser(setUser({ ...response.data.user, jwt: response.data.jwt }))

        const completeIndex = steps.findIndex(step => step.label === "Complete")
        setSelectedStep(completeIndex)
      })
      .catch(error => {
        const { message } = error.response.data.error
        console.log(error)
        dispatchFeedback(setSnackbar({ status: "error", message }))
      })
      .finally(() => {
        setLoading(false)
      })
  }, [
    values,
    steps,
    setSelectedStep,
    dispatchUser,
    dispatchFeedback,
    setLoading,
  ])

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
          component={!info ? "a" : undefined}
          href={
            !info
              ? `${process.env.STRAPI_API_PROXY_URL}/api/connect/facebook`
              : undefined
          }
          disabled={loading || (info && disabled)}
          onClick={() => info && handleComplete()}
          sx={sx.facebookSignUp}
          color="secondary"
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography sx={sx.facebookText} variant="h5">
              Sign up{!info && " with Facebook"}
            </Typography>
          )}
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
