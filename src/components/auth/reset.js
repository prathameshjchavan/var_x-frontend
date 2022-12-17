import React, { Fragment, useCallback, useMemo, useState } from "react"
import { getEmailPasswordFields } from "./Login"
import accountIcon from "../../images/account.svg"
import { Button, Grid, Typography } from "@mui/material"
import Fields from "./Fields"
import { setSnackbar } from "../../contexts/actions"

const Reset = ({ steps, setSelectedStep, dispatchFeedback }) => {
  const [visible, setVisible] = useState(false)
  const [values, setValues] = useState({
    password: "",
    confirmation: "",
  })
  const [errors, setErrors] = useState({})

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
    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")

    axios
      .post(`${process.env.STRAPI_API_URL}/api/auth/reset-password`, {
        code,
        password: values.password,
        passwordConfirmation: values.confirmation,
      })
      .then(response => {})
      .catch(error => {})
  }, [])

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
          onClick={handleReset}
          color="secondary"
          sx={sx.reset}
        >
          <Typography variant="h5">Reset Password</Typography>
        </Button>
      </Grid>
    </Fragment>
  )
}

export default Reset
