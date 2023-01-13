import {
  Grid,
  Button,
  useTheme,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import saveIcon from "../../images/save.svg"
import DeleteIcon from "../../images/Delete"
import React, { useState, useContext, useCallback } from "react"
import axios from "axios"
import { FeedbackContext, UserContext } from "../../contexts"
import { setSnackbar, setUser } from "../../contexts/actions"

const CheckoutNavigation = ({
  steps,
  selectedStep,
  setSelectedStep,
  details,
  detailSlot,
  location,
  locationSlot,
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
    actions: {
      position: "absolute",
      right: 0,
    },
  }

  const handleAction = useCallback(
    action => {
      if (steps[selectedStep].error) {
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
    ]
  )

  // styled components
  const Icon = styled("img")(() => ({
    height: "2.25rem",
    width: "2.25rem",
  }))

  const DeleteIconWrapper = styled("span")(() => ({
    height: "2rem",
    width: "2rem",
  }))

  return (
    <Grid
      item
      container
      justifyContent="center"
      alignItems="center"
      sx={sx.navbar}
    >
      <Grid item sx={sx.back}>
        <Button onClick={() => setSelectedStep(selectedStep - 1)}>
          <Typography variant="h5">&lt;</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="h5">
          {steps[selectedStep].title.toUpperCase()}
        </Typography>
      </Grid>
      <Grid item sx={sx.forward}>
        <Button
          disabled={steps[selectedStep].error}
          sx={sx.forwardButton}
          onClick={() => setSelectedStep(selectedStep + 1)}
        >
          <Typography variant="h5">&gt;</Typography>
        </Button>
      </Grid>
      {steps[selectedStep].hasActions && (
        <Grid item sx={sx.actions}>
          <Grid container>
            <Grid item>
              {loading === "save" ? (
                <CircularProgress />
              ) : (
                <IconButton onClick={() => handleAction("save")}>
                  <Icon src={saveIcon} alt="save" />
                </IconButton>
              )}
            </Grid>
            <Grid item>
              {loading === "delete" ? (
                <CircularProgress />
              ) : (
                <IconButton onClick={() => handleAction("delete")}>
                  <DeleteIconWrapper>
                    <DeleteIcon color="#fff" />
                  </DeleteIconWrapper>
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default CheckoutNavigation
