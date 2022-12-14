import { Grid, IconButton, useMediaQuery } from "@mui/material"
import React, { useCallback, useContext, useState } from "react"
import { styled } from "@mui/material/styles"
import axios from "axios"
import CircularProgress from "@mui/material/CircularProgress"
import { FeedbackContext } from "../../contexts"
import BackwardsIcon from "../../images/BackwardsOutline"
import editIcon from "../../images/edit.svg"
import saveIcon from "../../images/save.svg"
import { setSnackbar, setUser } from "../../contexts/actions"
import Confirmation from "./Confirmation"

const Edit = ({
  setSelectedSetting,
  user,
  isError,
  dispatchUser,
  edit,
  setEdit,
  details,
  locations,
  detailSlot,
  locationSlot,
  changesMade,
  detailValues,
  setDetailValues,
}) => {
  const { dispatchFeedback } = useContext(FeedbackContext)
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const matchesVertical = useMediaQuery("(max-width: 1300px)")

  // sx prop
  const sx = {
    editContainer: {
      borderLeft: !matchesVertical ? "4px solid #fff" : undefined,
      height: matchesVertical ? "30rem" : undefined,
    },
    icon: {
      height: "8rem",
      width: "8rem",
    },
  }

  // functions
  const handleEdit = useCallback(() => {
    if (edit && isError) {
      return dispatchFeedback(
        setSnackbar({
          status: "error",
          message: "All fields must be valid before saving.",
        })
      )
    }

    setEdit(!edit)
    const { password, ...newDetails } = details

    if (password !== "********") {
      setDialogOpen(true)
    }

    if (edit && changesMade) {
      setLoading(true)

      axios
        .put(
          `${process.env.STRAPI_API_URL}/api/user/settings`,
          {
            details: newDetails,
            detailSlot,
            location: locations,
            locationSlot,
          },
          {
            headers: { Authorization: `Bearer ${user.jwt}` },
          }
        )
        .then(response => {
          dispatchFeedback(
            setSnackbar({
              status: "success",
              message: "Settings Saved Successfully",
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
              message:
                "There was a problem saving your settings, please try again.",
            })
          )
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [
    edit,
    setEdit,
    changesMade,
    detailSlot,
    details,
    dispatchFeedback,
    dispatchUser,
    locationSlot,
    locations,
    user.jwt,
    isError,
  ])

  // styled components
  const IconWrapper = styled("span")(() => sx.icon)
  const Icon = styled("img")(() => sx.icon)

  return (
    <Grid
      item
      container
      sx={sx.editContainer}
      justifyContent="space-evenly"
      alignItems="center"
      lg={6}
      xs={12}
    >
      <Grid item>
        <IconButton onClick={() => setSelectedSetting(null)}>
          <IconWrapper>
            <BackwardsIcon color="#fff" />
          </IconWrapper>
        </IconButton>
      </Grid>
      <Grid item>
        {loading ? (
          <CircularProgress color="secondary" size="8rem" />
        ) : (
          <IconButton disabled={loading} onClick={handleEdit}>
            <Icon
              src={edit ? saveIcon : editIcon}
              alt={`edit ${edit ? "save" : "settings"}`}
            />
          </IconButton>
        )}
      </Grid>
      <Confirmation
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        user={user}
        dispatchFeedback={dispatchFeedback}
        setSnackbar={setSnackbar}
        detailValues={detailValues}
        setDetailValues={setDetailValues}
      />
    </Grid>
  )
}

export default Edit
