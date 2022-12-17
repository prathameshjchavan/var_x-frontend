import React, { Fragment, useMemo, useState } from "react"
import { getEmailPasswordFields } from "./Login"
import accountIcon from "../../images/account.svg"
import { Grid } from "@mui/material"
import Fields from "./Fields"

const Reset = () => {
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

  return (
    <Fragment>
      <Grid item>
        <img src={accountIcon} alt="reset password page" />
      </Grid>
      <Fields
        fields={fields}
        values={values}
        setValues={setValues}
        errors={errors}
        setErrors={setErrors}
      />
    </Fragment>
  )
}

export default Reset
