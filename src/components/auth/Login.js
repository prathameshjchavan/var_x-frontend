import React, { Fragment, useMemo, useState } from "react"
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
import { useTheme } from "@mui/material"
import validate from "../ui/validate"

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(false)
  const theme = useTheme()

  // sx prop
  const sx = {
    accountIcon: { marginTop: "2rem" },
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
    visibleIcon: { padding: 0 },
    login: {
      width: "20rem",
      borderRadius: "50px",
      textTransform: "none",
    },
    facebookButton: {
      marginTop: "-1rem",
    },
    facebookText: {
      fontSize: "1.5rem",
      fontWeight: 700,
      textTransform: "none",
    },
  }

  const fields = useMemo(
    () => ({
      email: {
        helperText: "invalid email",
        placeholder: "Email",
        type: "text",
        startAdornment: (
          <EmailAdornmentContainer>
            <EmailAdornment />
          </EmailAdornmentContainer>
        ),
      },
      password: {
        helperText:
          "you must include one uppercase letter, one number, and one special character",
        placeholder: "Password",
        type: visible ? "text" : "password",
        startAdornment: <img src={passwordAdornment} alt="password" />,
        endAdornment: (
          <IconButton sx={sx.visibleIcon} onClick={() => setVisible(!visible)}>
            <img
              src={visible ? showPassword : hidePassword}
              alt={`${visible ? "Show" : "Hide"} Password`}
            />
          </IconButton>
        ),
      },
    }),
    []
  )

  // styled components
  const EmailAdornmentContainer = styled("span")(() => ({
    height: "17px",
    width: "22px",
    marginBottom: "15px",
  }))

  return (
    <Fragment>
      <Grid item sx={sx.accountIcon}>
        <img src={accountIcon} alt="login page" />
      </Grid>
      {Object.keys(fields).map(field => {
        const validateHelper = event => {
          const valid = validate({ [field]: event.target.value })
          setErrors({ ...errors, [field]: !valid[field] })
        }

        return (
          <Grid item>
            <TextField
              value={password}
              variant="standard"
              placeholder="Password"
              type={visible ? "text" : "password"}
              onChange={e => setPassword(e.target.value)}
              sx={sx.textfield}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
                endAdornment: <InputAdornment position="end"></InputAdornment>,
              }}
            />
          </Grid>
        )
      })}

      <Grid item>
        <Button sx={sx.login} variant="contained" color="secondary">
          <Typography variant="h5">Login</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button sx={sx.facebookButton}>
          <Typography variant="h3" sx={sx.facebookText}>
            Login with Facebook
          </Typography>
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
