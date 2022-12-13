import { Grid, useTheme } from "@mui/material"
import Paper from "@mui/material/Paper"
import Login from "./Login"
import React, { useMemo, useState } from "react"
import SignUp from "./SignUp"
import Complete from "./Complete"

const AuthPortal = () => {
  const theme = useTheme()
  const [selectedStep, setSelectedStep] = useState(0)
  const steps = useMemo(
    () => [
      { component: Login, label: "Login" },
      { component: SignUp, label: "Sign Up" },
      { component: Complete, label: "Complete" },
    ],
    []
  )

  // sx prop
  const sx = {
    container: {
      marginBottom: "8rem",
    },
    paper: {
      border: `2rem solid ${theme.palette.secondary.main}`,
      width: "50rem",
      height: "40rem",
      borderRadius: 0,
    },
    inner: {
      height: "40rem",
      width: "100%",
      border: `2rem solid ${theme.palette.primary.main}`,
    },
  }

  return (
    <Grid container justifyContent="center" sx={sx.container}>
      <Grid item>
        <Paper elevation={6} sx={sx.paper}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            sx={sx.inner}
          >
            {steps.map((Step, index) =>
              selectedStep === index ? (
                <Step.component
                  key={Step.label}
                  setSelectedStep={setSelectedStep}
                  steps={steps}
                />
              ) : null
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default AuthPortal
