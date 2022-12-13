import React, { Fragment, useState } from "react"
import addUserIcon from "../../images/add-user.svg"
import nameAdornment from "../../images/name-adornment.svg"
import forward from "../../images/forward-outline.svg"
import backward from "../../images/backwards-outline.svg"
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
  }

  return (
    <Fragment>
      <Grid item>
        <img src={addUserIcon} alt="new user" />
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
        <Button variant="contained" color="secondary">
          <Typography variant="h5">Sign Up with Facebook</Typography>
        </Button>
      </Grid>
      <Grid item container justifyContent="space-between">
        <Grid item>
          <IconButton>
            <img src={backward} alt="back to login" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <img src={forward} alt="continue registration" />
          </IconButton>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default SignUp
