import React, { Fragment, useState } from "react"
import accountIcon from "../../images/account.svg"
import EmailAdornment from "../../images/EmailAdornment"
import passwordAdornment from "../../images/password-adornment.svg"
import hidePassword from "../../images/hide-password.svg"
import showPassword from "../../images/show-password.svg"
import addUserIcon from "../../images/add-user.svg"
import forgotPasswordIcon from "../../images/forgot.svg"
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material"
import { styled } from "@mui/material/styles"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(false)

  // sx prop
  const sx = {
    textfield: {
      "& .MuiInput-input": {
        color: "currentColor",
      },
      "& .MuiInputBase-root": {
        borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
      },
    },
  }

  // styled components
  const EmailAdornmentContainer = styled("span")(() => ({
    height: "17px",
    width: "22px",
    marginBottom: "12px",
  }))

  return (
    <Fragment>
      <Grid item>
        <img src={accountIcon} alt="login page" />
      </Grid>
      <Grid item>
        <TextField
          value={email}
          variant="standard"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          sx={sx.textfield}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailAdornmentContainer>
                  <EmailAdornment />
                </EmailAdornmentContainer>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          value={password}
          variant="standard"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          sx={sx.textfield}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={passwordAdornment} alt="password" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <img
                  src={visible ? showPassword : hidePassword}
                  alt={`${visible ? "Show" : "Hide"} Password`}
                />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" color="secondary">
          <Typography variant="h5">Login</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button>
          <Typography variant="h3">Login with Facebook</Typography>
        </Button>
      </Grid>
      <Grid item container justifyContent="space-between">
        <Grid item>
          <IconButton>
            <img src={addUserIcon} alt="sign up" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <img src={forgotPasswordIcon} alt="forgot password" />
          </IconButton>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Login
