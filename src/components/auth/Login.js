import React, { Fragment, useState } from "react"
import accountIcon from "../../images/account.svg"
import EmailAdornment from "../../images/EmailAdornment"
import passwordAdornment from "../../images/password-adornment.svg"
import hidePassword from "../../images/hide-password.svg"
import showPassword from "../../images/show-password.svg"
import addUserIcon from "../../images/add-user.svg"
import forgotPasswordIcon from "../../images/forgot.svg"
import { Grid, InputAdornment, TextField } from "@mui/material"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState("")

  // sx prop
  const sx = {
    textfield: {},
  }

  return (
    <Fragment>
      <Grid item>
        <img src={accountIcon} alt="login page" />
      </Grid>
      <Grid item>
        <TextField
          value={email}
          variant="standard"
          onChange={e => setEmail(e.target.value)}
          sx={sx.textfield}
          placeholder="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailAdornment />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Fragment>
  )
}

export default Login
