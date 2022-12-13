import React, { Fragment, useCallback, useState } from "react"
import addUserIcon from "../../images/add-user.svg"
import nameAdornment from "../../images/name-adornment.svg"
import forward from "../../images/forward-outline.svg"
import backward from "../../images/backwards-outline.svg"
import { styled } from "@mui/material/styles"
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material"

const SignUp = ({ setSelectedStep, steps }) => {
  const [name, setName] = useState("")
  const [info, setInfo] = useState(false)
  const theme = useTheme()

  // sx prop
  const sx = {
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
    facebookSignUp: {
      width: "20rem",
      borderRadius: "50px",
      marginTop: "-3rem",
    },
    facebookText: {
      textTransform: "none",
      fontSize: "1.5rem",
    },
  }

  // functions
  const handleNavigate = useCallback(
    direction => {
      if (direction === "forward") setInfo(true)
      else {
        const loginIndex = steps.findIndex(step => step.label === "Login")
        setSelectedStep(loginIndex)
      }
    },
    [setInfo, steps, setSelectedStep]
  )

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
      <Grid item>
        <TextField
          value={name}
          variant="standard"
          placeholder="Name"
          onChange={e => setName(e.target.value)}
          sx={sx.textfield}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={nameAdornment} alt="name" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" sx={sx.facebookSignUp} color="secondary">
          <Typography sx={sx.facebookText} variant="h5">
            Sign Up with Facebook
          </Typography>
        </Button>
      </Grid>
      <Grid item container justifyContent="space-between">
        <Grid item>
          <IconButton onClick={() => handleNavigate("backward")}>
            <NavigationIcon src={backward} alt="back to login" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={() => handleNavigate("forward")}>
            <NavigationIcon src={forward} alt="continue registration" />
          </IconButton>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default SignUp
