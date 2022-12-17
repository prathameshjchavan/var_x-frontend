import React, { Fragment, useCallback, useMemo, useState } from "react"
import { getEmailPasswordFields } from "./Login"
import accountIcon from "../../images/account.svg"
import { Button, Grid, Typography } from "@mui/material"
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
        dispatchFeedback(
          setSnackbar({
            status: "success",
            message: "Password Reset Successfully",
          })
        )

        setTimeout(() => {
          window.history.replaceState(null, null, window.location.pathname)

          const loginStep = steps.findIndex(step => step.label === "Login")
          setSelectedStep(loginStep)
        }, 6000)
      })
      .catch(error => {
        const { message } = error.response.data.error
        console.error(error)
        dispatchFeedback(setSnackbar({ status: "error", message }))
      })
      .finally(() => {
        setLoading(false)
      })
  }, [dispatchFeedback, setSelectedStep, steps, values])

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
            <Typography variant="h5">Reset Password</Typography>
          )}
        </Button>
      </Grid>
    </Fragment>
  )
}

export default Reset
