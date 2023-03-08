import { Grid, IconButton, useMediaQuery } from "@mui/material"
import React, { useContext, useState } from "react"
import { styled } from "@mui/material/styles"
import axios from "axios"
import CircularProgress from "@mui/material/CircularProgress"
import { FeedbackContext } from "../../contexts"
import BackwardsIcon from "../../images/BackwardsOutline"
import editIcon from "../../images/edit.svg"
import saveIcon from "../../images/save.svg"
import { setSnackbar, setUser } from "../../contexts/actions"
import Confirmation from "./Confirmation"
import { useStripe } from "@stripe/react-stripe-js"

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
  addCard,
  billingSlot,
  cardElement,
  cardError,
  changesMade,
  detailValues,
  setDetailValues,
  setAddCard,
  setCardError,
  setCardElement,
}) => {
  const { dispatchFeedback } = useContext(FeedbackContext)
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const matchesVertical = useMediaQuery("(max-width: 1300px)")
  const stripe = useStripe()

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
  const handleEdit = async () => {
    if ((edit && isError) || (addCard && (!cardElement || cardError))) {
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

    if (edit && (changesMade || addCard)) {
      let newPaymentMethod = null
      setLoading(true)

      if (addCard) {
        const { paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        })

        await axios
          .post(
            `${process.env.STRAPI_API_URL}/api/orders/savePaymentMethod`,
            {
              paymentMethod,
              customer: user,
            },
            {
              headers: { Authorization: `Bearer ${user.jwt}` },
            }
          )
          .then(response => {
            newPaymentMethod = {
              brand: response.data.card.brand,
              last4: response.data.card.last4,
            }
          })
          .catch(error => {
            console.log(error)
          })
      }

      axios
        .put(
          `${process.env.STRAPI_API_URL}/api/user/settings`,
          {
            details: newDetails,
            detailSlot,
            location: locations,
            locationSlot,
            paymentMethod: newPaymentMethod || undefined,
            paymentMethodSlot: billingSlot || undefined,
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
          let newUser = { ...user, ...response.data }
          if (addCard) {
            newUser.paymentMethods[billingSlot] = newPaymentMethod
          }
          dispatchUser(setUser(newUser))
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
          setAddCard(false)
          setCardError(true)
          setCardElement(null)
        })
    }
  }

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
