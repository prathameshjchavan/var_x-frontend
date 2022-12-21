import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { getEmailPasswordFields } from "./Login"
import accountIcon from "../../images/account.svg"
import { Button, Grid, Typography, useTheme } from "@mui/material"
import Fields from "./Fields"
import CircularProgress from "@mui/material/CircularProgress"
import { setSnackbar } from "../../contexts/actions"
import axios from "axios"

const Reset = ({ steps, setSelectedStep, dispatchFeedback }) => {
  const [visible, setVisible] = useState(false)
  const [values, setValues] = useState({
    password: "",
    confirmation: "",
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const disabled = useMemo(
    () =>
      Object.keys(errors).some(error => errors[error] === true) ||
      Object.keys(errors).length !== Object.keys(values).length ||
      values.password !== values.confirmation,
    [errors, values]
  )
  const fields = useMemo(() => {
    const { password } = getEmailPasswordFields(
      true,
      false,
      visible,
      setVisible
    )
    return {
      password,
      confirmation: { ...password, placeholder: "Confirm Password" },
    }
  }, [visible, setVisible])
  const theme = useTheme()

  // sx prop
  const sx = {
    icon: {
      marginTop: "2rem",
    },
    reset: {
      width: "20rem",
      borderRadius: "50px",
      textTransform: "none",
      marginBottom:
        Object.values(errors).filter(value => value).length === 2
          ? "2rem"
          : "4rem",
      [theme.breakpoints.down("sm")]: {
        width: "15rem",
      },
    },
    buttonText: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.5rem",
      },
    },
  }

  // functions
  const handleReset = useCallback(() => {
    setLoading(true)

    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")

    axios
      .post(`${process.env.STRAPI_API_URL}/api/auth/reset-password`, {
        code,
        password: values.password,
        passwordConfirmation: values.confirmation,
      })
      .then(response => {
        setSuccess(true)
        dispatchFeedback(
          setSnackbar({
            status: "success",
            message: "Password Reset Successfully",
          })
        )
      })
      .catch(error => {
        const { message } = error.response.data.error
        console.error(error)
        dispatchFeedback(setSnackbar({ status: "error", message }))
      })
      .finally(() => {
        setLoading(false)
      })
  }, [dispatchFeedback, values])

  useEffect(() => {
    if (!success) return

    const timer = setTimeout(() => {
      window.history.replaceState(null, null, window.location.pathname)

      const loginStep = steps.findIndex(step => step.label === "Login")
      setSelectedStep(loginStep)
    }, 6000)

    return () => clearTimeout(timer)
  }, [success, setSelectedStep, steps])

  return (
    <Fragment>
      <Grid item sx={sx.icon}>
        <img src={accountIcon} alt="reset password page" />
      </Grid>
      <Fields
        fields={fields}
        values={values}
        setValues={setValues}
        errors={errors}
        setErrors={setErrors}
      />
      <Grid item>
        <Button
          variant="contained"
          disabled={disabled}
          onClick={handleReset}
          color="secondary"
          sx={sx.reset}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="h5" sx={sx.buttonText}>
              Reset Password
            </Typography>
          )}
        </Button>
      </Grid>
    </Fragment>
  )
}

export default Reset
