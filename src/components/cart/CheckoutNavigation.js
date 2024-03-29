import { Grid, Button, useTheme, Typography } from "@mui/material"
import React, { useState, useContext, useCallback } from "react"
import axios from "axios"
import { FeedbackContext, UserContext } from "../../contexts"
import { setSnackbar, setUser } from "../../contexts/actions"
import Actions from "./Actions"

const CheckoutNavigation = ({
  steps,
  selectedStep,
  setSelectedStep,
  details,
  detailSlot,
  location,
  locationSlot,
  setErrors,
}) => {
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const { dispatchFeedback } = useContext(FeedbackContext)
  const { user, dispatchUser } = useContext(UserContext)

  // sx prop
  const sx = {
    navbar: {
      backgroundColor: theme.palette.secondary.main,
      width: "40rem",
      height: "5rem",
      position: "relative",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    back: {
      visibility:
        selectedStep === 0 || selectedStep === steps.length - 1
          ? "hidden"
          : "visible",
    },
    forward: {
      visibility: selectedStep >= steps.length - 2 ? "hidden" : "visible",
    },
    forwardButton: {
      "&:disabled": {
        opacity: 0.5,
      },
    },
    text: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.25rem",
      },
    },
    navButton: {
      [theme.breakpoints.down("sm")]: {
        width: "1.5rem",
        height: "1.5rem",
        minWidth: 0,
      },
    },
  }

  // functions
  const handleAction = useCallback(
    action => {
      if (steps[selectedStep].error && action !== "delete") {
        dispatchFeedback(
          setSnackbar({
            status: "error",
            message: "All fields must be valid before saving",
          })
        )
        return
      }

      setLoading(action)

      const isDetails = steps[selectedStep].title === "Contact Info"
      const isLocation = steps[selectedStep].title === "Address"

      axios
        .put(
          `${process.env.STRAPI_API_URL}/api/user/settings`,
          {
            details: isDetails && action !== "delete" ? details : undefined,
            detailSlot: isDetails ? detailSlot : undefined,
            location: isLocation && action !== "delete" ? location : undefined,
            locationSlot: isLocation ? locationSlot : undefined,
          },
          {
            headers: { Authorization: `Bearer ${user.jwt}` },
          }
        )
        .then(response => {
          dispatchFeedback(
            setSnackbar({
              status: "success",
              message: `Information ${
                action === "delete" ? "Deleted" : "Saved"
              } Successfully`,
            })
          )
          dispatchUser(
            setUser({ ...response.data, jwt: user.jwt, onboarding: true })
          )
          if (action === "delete") {
            setErrors({})
          }
        })
        .catch(error => {
          console.error(error)
          dispatchFeedback(
            setSnackbar({
              status: "error",
              message: `There was a problem ${
                action === "delete" ? "deleting" : "saving"
              } your information, please try again.`,
            })
          )
        })
        .finally(() => {
          setLoading(null)
        })
    },
    [
      detailSlot,
      details,
      dispatchFeedback,
      dispatchUser,
      location,
      locationSlot,
      selectedStep,
      steps,
      user.jwt,
      setErrors,
    ]
  )

  return (
    <Grid
      item
      container
      justifyContent="center"
      alignItems="center"
      sx={sx.navbar}
    >
      <Grid item sx={sx.back}>
        <Button
          sx={sx.navButton}
          onClick={() => setSelectedStep(selectedStep - 1)}
        >
          <Typography variant="h5" sx={sx.text}>
            &lt;
          </Typography>
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="h5" sx={sx.text}>
          {steps[selectedStep].title.toUpperCase()}
        </Typography>
      </Grid>
      <Grid item sx={sx.forward}>
        <Button
          disabled={steps[selectedStep].error}
          sx={{ ...sx.forwardButton, ...sx.navButton }}
          onClick={() => setSelectedStep(selectedStep + 1)}
        >
          <Typography variant="h5" sx={sx.text}>
            &gt;
          </Typography>
        </Button>
      </Grid>
      {steps[selectedStep].hasActions && user.name !== "Guest" && (
        <Actions loading={loading} handleAction={handleAction} />
      )}
    </Grid>
  )
}

export default CheckoutNavigation
