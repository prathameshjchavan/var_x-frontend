import {
  Button,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import cardIcon from "../../images/card.svg"
import Slots from "./Slots"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios"
import { FeedbackContext, UserContext } from "../../contexts"
import { setSnackbar, setUser } from "../../contexts/actions"

const Payments = ({
  user,
  slot,
  edit,
  setSlot,
  saveCard,
  setSaveCard,
  addCard,
  setAddCard,
  setCardElement,
  setCardError,
  checkout,
  visible,
  setCard,
  hasSubscriptionCart,
  hasSubscriptionActive,
}) => {
  const theme = useTheme()
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const editRef = useRef(edit)
  const { dispatchFeedback } = useContext(FeedbackContext)
  const { dispatchUser } = useContext(UserContext)
  const matchesVertical = useMediaQuery("(max-width: 1300px)")
  const matchesXS = useMediaQuery("(max-width: 500px)")
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
  const card = useMemo(
    () =>
      user.name === "Guest"
        ? { last4: "", brand: "" }
        : user.paymentMethods[slot],
    [user, slot]
  )

  // functions
  const handleSubmit = async event => {
    event.preventDefault()

    if (!stripe || !elements) return
  }

  const removeCard = () => {
    const remaining = user.paymentMethods.filter(method => method.last4 !== "")
    const subscriptionPayment = user.subscriptions.find(
      subscription => subscription.paymentMethod.last4 === card.last4
    )

    if (
      (hasSubscriptionActive && remaining.length === 1) ||
      subscriptionPayment
    ) {
      dispatchFeedback(
        setSnackbar({
          status: "error",
          message:
            "You cannot remove your last card with an active subscription. Please add another card first.",
        })
      )
      return
    }

    setLoading(true)

    axios
      .post(
        `${process.env.STRAPI_API_URL}/api/orders/removeCard`,
        {
          card: card.last4,
        },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      )
      .then(response => {
        dispatchUser(
          setUser({ ...response.data, jwt: user.jwt, onboarding: true })
        )
        setCardError(true)
        if (!editRef) setCard({ brand: "", last4: "" })

        dispatchFeedback(
          setSnackbar({
            status: "success",
            message: "Card Removed Successfully.",
          })
        )
      })
      .catch(error => {
        console.error(error)

        dispatchFeedback(
          setSnackbar({
            status: "error",
            message:
              "There was a problem removing your card. Please try again.",
          })
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handlePaymentMethod = useCallback(
    async cardElement => {
      if (editRef.current) {
        setCardElement(cardElement)
      } else {
        const { paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        })

        setCard({
          brand: paymentMethod.card.brand,
          last4: paymentMethod.card.last4,
        })
      }
    },
    [edit, stripe]
  )

  const handleCardChange = useCallback(
    async event => {
      if (event.empty) setAddCard(false)
      else if (!addCard) setAddCard(true)

      if (event.complete) {
        const cardElement = elements.getElement(CardElement)

        handlePaymentMethod(cardElement)
        setCardError(false)
      } else {
        setCardError(true)
      }
    },
    [elements, stripe]
  )

  // styled components
  const Form = styled("form")(() => ({
    width: matchesSM ? "85%" : "75%",
    borderBottom: "2px solid #fff",
    height: "2rem",
    marginTop: "-1rem",
  }))

  // wrappers
  const cardWrapper = useMemo(
    () => (
      <Form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "20px",
                color: "#fff",
                iconColor: "#fff",
                "::placeholder": {
                  color: "#fff",
                },
              },
            },
          }}
          onChange={handleCardChange}
        />
      </Form>
    ),
    [handleCardChange]
  )

  // sx prop
  const sx = {
    paymentContainer: {
      display: checkout && !visible ? "none" : "flex",
      borderLeft: !matchesVertical && !checkout ? "4px solid #fff" : undefined,
      position: "relative",
      height: matchesVertical ? (!checkout ? "30rem" : "100%") : "100%",
    },
    number: {
      color: "#fff",
      marginBottom: matchesXS ? (checkout ? "1rem" : undefined) : "5rem",
      fontSize: checkout ? "1.5rem" : undefined,
    },
    icon: {
      marginBottom: matchesXS ? (checkout ? "3rem" : "1rem") : "3rem",
    },
    removeCard: {
      backgroundColor: "#fff",
      paddingLeft: "5px",
      paddingRight: "5px",
      "&:hover": {
        backgroundColor: "#fff",
      },
      marginLeft: matchesXS ? "0px" : "2rem",
      marginTop: checkout ? (matchesXS ? "0px" : "-0.25rem") : undefined,
    },
    removeCardText: {
      fontSize: "1rem",
      color: theme.palette.primary.main,
      fontFamily: "Philosopher",
      fontStyle: "italic",
    },
    slotContainer: {
      position: "absolute",
      bottom: "0px",
    },
    switchWrapper: {
      marginRight: "4px",
      "& .MuiTypography-root": {
        color: "#fff",
        fontWeight: "bold",
        fontSize: matchesXS ? "1.25rem" : undefined,
      },
    },
    spinner: {
      marginLeft: loading ? "3rem" : undefined,
    },
    switchItem: {
      width: matchesSM ? "100%" : undefined,
    },
    numberWrapper: {
      flexDirection: matchesXS ? "column" : "row",
      alignItems: matchesXS ? "center" : undefined,
      marginBottom: checkout && matchesXS ? "6rem" : undefined,
    },
  }

  // useEffect
  useEffect(() => {
    if (!checkout || !user.jwt) return

    if (user.paymentMethods[slot].last4 !== "") {
      setCard(user.paymentMethods[slot])
      setCardError(false)
    } else {
      setCard({ brand: "", last4: "" })
      setCardError(true)
    }
  }, [slot])

  useEffect(() => {
    editRef.current = edit
  }, [edit])

  return (
    <Grid
      item
      container
      sx={sx.paymentContainer}
      direction="column"
      lg={checkout ? 12 : 6}
      xs={12}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item sx={sx.icon}>
        <img src={cardIcon} alt="payment settings" />
      </Grid>
      <Grid item container justifyContent="center" sx={sx.numberWrapper}>
        {(checkout || edit || addCard) && !card.last4 && cardWrapper}
        <Grid item>
          <Typography align="center" variant="h3" sx={sx.number}>
            {card.last4
              ? `${card.brand.toUpperCase()} **** **** **** ${card.last4}`
              : checkout
              ? null
              : !edit
              ? !addCard
                ? "Click on Edit Icon to Add New Card"
                : null
              : null}
          </Typography>
        </Grid>
        {card.last4 && (
          <Grid item sx={sx.spinner}>
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <Button
                onClick={removeCard}
                variant="contained"
                sx={sx.removeCard}
              >
                <Typography variant="h6" sx={sx.removeCardText}>
                  remove card
                </Typography>
              </Button>
            )}
          </Grid>
        )}
      </Grid>
      <Grid item container justifyContent="space-between" sx={sx.slotContainer}>
        <Slots slot={slot} setSlot={setSlot} noLabel />
        {checkout && user.name !== "Guest" && (
          <Grid item sx={sx.switchItem}>
            <FormControlLabel
              sx={sx.switchWrapper}
              label="Save Card For Future Use"
              labelPlacement="start"
              control={
                <Switch
                  disabled={
                    user.paymentMethods[slot].last4 !== "" ||
                    hasSubscriptionCart
                  }
                  checked={
                    user.paymentMethods[slot].last4 !== "" ||
                    hasSubscriptionCart
                      ? true
                      : saveCard
                  }
                  onChange={() => setSaveCard(!saveCard)}
                  color="secondary"
                />
              }
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default Payments
