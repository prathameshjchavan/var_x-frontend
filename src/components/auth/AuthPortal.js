import { Grid, useTheme } from "@mui/material"
import Paper from "@mui/material/Paper"
import Login from "./Login"
import React, { useMemo, useState, useEffect, useContext } from "react"
import { UserContext, FeedbackContext } from "../../contexts"
import SignUp from "./SignUp"
import Complete from "./Complete"
import Reset from "./reset"
import { setSnackbar, setUser } from "../../contexts/actions"
import axios from "axios"

const AuthPortal = () => {
  const theme = useTheme()
  const [selectedStep, setSelectedStep] = useState(0)
  const steps = useMemo(
    () => [
      { component: Login, label: "Login" },
      { component: SignUp, label: "Sign Up" },
      { component: Complete, label: "Complete" },
      { component: Reset, label: "Reset" },
    ],
    []
  )
  const { user, dispatchUser } = useContext(UserContext)
  const { feedback, dispatchFeedback } = useContext(FeedbackContext)

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")
    const access_token = params.get("access_token")

    if (code) {
      const resetStepIndex = steps.findIndex(step => step.label === "Reset")
      setSelectedStep(resetStepIndex)
    } else if (access_token) {
      axios
        .get(`${process.env.STRAPI_API_URL}/auth/facebook/callback`, {
          params: {
            access_token,
          },
        })
        .then(response => {
          dispatchUser(
            setUser({
              ...response.data.user,
              jwt: response.data.jwt,
              onboarding: true,
            })
          )

          window.history.replaceState(null, null, window.location.pathname)
        })
        .catch(error => {
          console.error(error)
          dispatchFeedback(
            setSnackbar({
              status: "error",
              message: "Connecting to Facebook failed, please try again.",
            })
          )
        })
    }
  }, [steps, dispatchFeedback, dispatchUser])

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
                  user={user}
                  dispatchUser={dispatchUser}
                  feedback={feedback}
                  dispatchFeedback={dispatchFeedback}
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
