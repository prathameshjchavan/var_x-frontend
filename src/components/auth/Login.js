import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import accountIcon from "../../images/account.svg"
import EmailAdornment from "../../images/EmailAdornment"
import passwordAdornment from "../../images/password-adornment.svg"
import hidePasswordIcon from "../../images/hide-password.svg"
import showPasswordIcon from "../../images/show-password.svg"
import addUserIcon from "../../images/add-user.svg"
import forgotPasswordIcon from "../../images/forgot.svg"
import close from "../../images/close.svg"
import { Button, Grid, IconButton, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import CircularProgress from "@mui/material/CircularProgress"
import Fields from "./Fields"
import axios from "axios"
import { setUser, setSnackbar } from "../../contexts/actions"

export const getEmailPasswordFields = (
  hideEmail,
  hidePassword,
  visible,
  setVisible
) => {
  // styled components
  const EmailAdornmentContainer = styled("span")(() => ({
    height: "17px",
    width: "22px",
    marginBottom: "15px",
  }))

  return {
    email: {
      helperText: "invalid email",
      placeholder: "Email",
      type: "text",
      hidden: hideEmail,
      startAdornment: (
        <EmailAdornmentContainer>
          <EmailAdornment />
        </EmailAdornmentContainer>
      ),
      endAdornment: null,
    },
    password: {
      helperText:
        "you password must be at least eight characters and include one uppercase letter, one number, and one special character",
      placeholder: "Password",
      hidden: hidePassword,
      type: visible ? "text" : "password",
      startAdornment: <img src={passwordAdornment} alt="password" />,
      endAdornment: (
        <IconButton sx={{ padding: 0 }} onClick={() => setVisible(!visible)}>
          <img
            src={visible ? showPasswordIcon : hidePasswordIcon}
            alt={`${visible ? "Show" : "Hide"} Password`}
          />
        </IconButton>
      ),
    },
  }
}

const Login = ({
  user,
  dispatchUser,
  dispatchFeedback,
  setSelectedStep,
  steps,
}) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)
  const [forgot, setForgot] = useState(false)
  const [loading, setLoading] = useState(false)
  const disabled = useMemo(
    () =>
      Object.keys(errors).some(error => errors[error] === true) ||
      Object.keys(errors).length !== Object.keys(values).length,
    [errors, values]
  )
  const [success, setSuccess] = useState(false)

  // sx prop
  const sx = {
    accountIcon: { marginTop: "2rem" },
    login: {
      width: "20rem",
      borderRadius: "50px",
      textTransform: "none",
    },
    facebookButton: {
      marginTop: errors.password ? 0 : "-1rem",
    },
    facebookText: {
      fontSize: "1.5rem",
      fontWeight: 600,
      textTransform: "none",
    },
    close: {
      paddingTop: forgot && "5px",
    },
  }

  // functions
  // Function for getting the sx prop for Login/Reset button
  const getButtonSx = useCallback(() => {
    let buttonSx = sx.login
    if (forgot) buttonSx = { ...buttonSx, ...sx.reset }
    return buttonSx
  }, [forgot, sx.login, sx.reset])

  const navigateSignUp = useCallback(() => {
    const signUpIndex = steps.findIndex(step => step.label === "Sign Up")
    setSelectedStep(signUpIndex)
  }, [steps, setSelectedStep])

  const handleLogin = useCallback(() => {
    setLoading(true)

    axios
      .post(`${process.env.STRAPI_API_URL}/api/auth/local`, {
        identifier: values.email,
        password: values.password,
      })
      .then(response => {
        dispatchUser(
          setUser({
            ...response.data.user,
            jwt: response.data.jwt,
            onboarding: true,
          })
        )
      })
      .catch(error => {
        const { message } = error.response.data.error
        dispatchFeedback(setSnackbar({ status: "error", message }))
      })
      .finally(() => {
        setLoading(false)
      })
  }, [setLoading, values, dispatchUser, dispatchFeedback])

  const handleForgot = useCallback(() => {
    setLoading(true)

    axios
      .post(`${process.env.STRAPI_API_URL}/api/auth/forgot-password`, {
        email: values.email,
      })
      .then(response => {
        setSuccess(true)
        dispatchFeedback(
          setSnackbar({ status: "success", message: "Reset Code Sent" })
        )
      })
      .catch(error => {
        const { message } = error.response.data.error
        dispatchFeedback(setSnackbar({ status: "error", message }))
      })
      .finally(() => {
        setLoading(false)
      })
  }, [dispatchFeedback, values])

  // variables
  const fields = useMemo(
    () => getEmailPasswordFields(false, forgot, visible, setVisible),
    [visible, setVisible, forgot]
  )

  // useEffect
  useEffect(() => {
    if (!success) return

    const timer = setTimeout(() => {
      setForgot(false)
    }, 6000)

    return () => clearTimeout(timer)
  }, [success])

  return (
    <Fragment>
      <Grid item sx={sx.accountIcon}>
        <img src={accountIcon} alt="login page" />
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
          sx={getButtonSx()}
          onClick={() => (forgot ? handleForgot() : handleLogin())}
          disabled={loading || (!forgot && disabled)}
          variant="contained"
          color="secondary"
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="h5">
              {forgot ? "Reset Password" : "Login"}
            </Typography>
          )}
        </Button>
      </Grid>
      {forgot ? null : (
        <Grid item>
          <Button
            component="a"
            href={`${process.env.STRAPI_API_PROXY_URL}/api/connect/facebook`}
            sx={sx.facebookButton}
          >
            <Typography variant="h3" sx={sx.facebookText}>
              Login with Facebook
            </Typography>
          </Button>
        </Grid>
      )}
      <Grid item container justifyContent="space-between">
        <Grid item>
          <IconButton onClick={navigateSignUp}>
            <img src={addUserIcon} alt="sign up" />
          </IconButton>
        </Grid>
        <Grid item sx={sx.close}>
          <IconButton onClick={() => setForgot(!forgot)}>
            <img
              src={forgot ? close : forgotPasswordIcon}
              alt={forgot ? "back to login" : "forgot password"}
            />
          </IconButton>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Login
