import React, { Fragment, useCallback, useMemo, useState } from "react"
import accountIcon from "../../images/account.svg"
import EmailAdornment from "../../images/EmailAdornment"
import passwordAdornment from "../../images/password-adornment.svg"
import hidePassword from "../../images/hide-password.svg"
import showPassword from "../../images/show-password.svg"
import addUserIcon from "../../images/add-user.svg"
import forgotPasswordIcon from "../../images/forgot.svg"
import close from "../../images/close.svg"
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

const Login = ({ setSelectedStep, steps }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)
  const [forgot, setForgot] = useState(false)
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
    reset: {
      marginTop: "-4rem",
    },
    facebookButton: {
      marginTop: errors.password ? 0 : "-1rem",
    },
    facebookText: {
      fontSize: "1.5rem",
      fontWeight: 700,
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

  const navigateSignUp = () => {
    const signUp = steps.find(step => step.label === "Sign Up")
    setSelectedStep(steps.indexOf(signUp))
  }

  // styled components
  const EmailAdornmentContainer = styled("span")(() => ({
    height: "17px",
    width: "22px",
    marginBottom: "15px",
  }))

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
        endAdornment: null,
      },
      password: {
        helperText:
          "you password must be at least eight characters and include one uppercase letter, one number, and one special character",
        placeholder: "Password",
        hidden: forgot,
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
    [sx.visibleIcon, visible, forgot]
  )

  return (
    <Fragment>
      <Grid item sx={sx.accountIcon}>
        <img src={accountIcon} alt="login page" />
      </Grid>
      {Object.keys(fields).map((field, index) => {
        const validateHelper = event => {
          const valid = validate({ [field]: event.target.value })
          setErrors({ ...errors, [field]: !valid[field] })
        }

        return !fields[field].hidden ? (
          <Grid item key={index}>
            <TextField
              value={values[field]}
              variant="standard"
              placeholder={fields[field].placeholder}
              type={fields[field].type}
              onChange={e => {
                setValues({ ...values, [field]: e.target.value })
                if (
                  errors[field] ||
                  (values[field] !== "" && errors[field] !== null)
                )
                  validateHelper(e)
              }}
              onBlur={e => validateHelper(e)}
              error={errors[field]}
              helperText={errors[field] && fields[field].helperText}
              sx={sx.textfield}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {fields[field].startAdornment}
                  </InputAdornment>
                ),
                endAdornment: fields[field].endAdornment ? (
                  <InputAdornment position="end">
                    {fields[field].endAdornment}
                  </InputAdornment>
                ) : undefined,
              }}
            />
          </Grid>
        ) : null
      })}
      <Grid item>
        <Button sx={getButtonSx()} variant="contained" color="secondary">
          <Typography variant="h5">
            {forgot ? "Reset Password" : "Login"}
          </Typography>
        </Button>
      </Grid>
      {forgot ? null : (
        <Grid item>
          <Button sx={sx.facebookButton}>
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
