import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import ConfirmationIcon from "../../images/tag.svg"
import NameAdornment from "../../images/NameAdornment"
import EmailAdornment from "../../images/EmailAdornment"
import PhoneAdornment from "../../images/PhoneAdornment"
import StreetAdornment from "../../images/street-adornment.svg"
import zipAdornment from "../../images/zip-adornment.svg"
import cardAdornment from "../../images/card.svg"
import promoAdornment from "../../images/promo-code.svg"
import {
  Grid,
  Typography,
  Button,
  Chip,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import Fields from "../auth/Fields"
import { styled } from "@mui/material/styles"
import { CartContext, FeedbackContext } from "../../contexts"
import { setSnackbar, clearCart } from "../../contexts/actions"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

const Confirmation = ({
  user,
  detailValues,
  billingDetails,
  locationValues,
  billingLocation,
  shippingOptions,
  selectedShipping,
  selectedStep,
  setSelectedStep,
  order,
  setOrder,
}) => {
  const theme = useTheme()
  const stripe = useStripe()
  const elements = useElements()
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
  const [promo, setPromo] = useState({ promo: "" })
  const [promoErrors, setPromoErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState(null)
  const { cart, dispatchCart } = useContext(CartContext)
  const { dispatchFeedback } = useContext(FeedbackContext)
  const shipping = useMemo(
    () => shippingOptions.find(option => option.label === selectedShipping),
    [shippingOptions, selectedShipping]
  )
  const subtotal = useMemo(
    () =>
      cart.reduce((total, item) => total + item.variant.price * item.qty, 0),
    [cart]
  )
  const tax = useMemo(() => subtotal * 0.075, [subtotal])

  // sx prop
  const sx = useMemo(
    () => ({
      mainContainer: { height: "100%" },
      iconWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      text: {
        fontSize: "1rem",
        color: "#fff",
        [theme.breakpoints.down("sm")]: {
          fontSize: "0.85rem",
        },
      },
      nameWrapper: {
        height: "22px",
        width: "22px",
      },
      emailWrapper: {
        height: "17px",
        width: "22px",
      },
      phoneWrapper: {
        height: "25.122px",
        width: "25.173px",
      },
      priceLabel: {
        fontSize: "1.5rem",
        [theme.breakpoints.down("sm")]: {
          fontSize: "0.85rem",
        },
      },
      darkBackground: {
        backgroundColor: theme.palette.secondary.main,
      },
      fieldRow: {
        height: "2.5rem",
      },
      centerText: {
        display: "flex",
        alignItems: "center",
      },
      adornmentWrapper: {
        display: "flex",
        justifyContent: "center",
      },
      priceValue: {
        marginRight: "1rem",
        [theme.breakpoints.down("sm")]: {
          fontSize: "0.85rem",
          marginRight: "0.5rem",
        },
      },
      button: {
        width: "100%",
        height: "7rem",
        borderRadius: 0,
        backgroundColor: theme.palette.secondary.main,
        "&:hover": {
          backgroundColor: theme.palette.secondary.light,
        },
        "&:disabled": {
          backgroundColor: theme.palette.grey[500],
        },
      },
      buttonWrapper: {
        marginTop: "auto",
      },
      chip: {
        backgroundColor: "#fff",
        "& .MuiChip-label": {
          color: theme.palette.secondary.main,
        },
      },
    }),
    [theme]
  )

  // styled components
  const Wrapper = styled("div")(() => {})

  const Card = styled("img")(() => ({
    height: "18px",
    width: "25px",
  }))

  const FieldWrapper = styled("span")(() => ({
    marginLeft: "1.25rem",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0.25rem",
    },
  }))

  // fields
  const firstFields = useMemo(
    () => [
      {
        value: detailValues.name,
        adornment: (
          <Wrapper sx={sx.nameWrapper}>
            <NameAdornment color="#fff" />
          </Wrapper>
        ),
      },
      {
        value: detailValues.email,
        adornment: (
          <Wrapper sx={sx.emailWrapper}>
            <EmailAdornment color="#fff" />
          </Wrapper>
        ),
      },
      {
        value: detailValues.phone,
        adornment: (
          <Wrapper sx={sx.phoneWrapper}>
            <PhoneAdornment />
          </Wrapper>
        ),
      },
      {
        value: locationValues.street,
        adornment: <img src={StreetAdornment} alt="street address" />,
      },
    ],
    [sx, detailValues, locationValues]
  )

  const secondFields = useMemo(
    () => [
      {
        value: `${locationValues.city}, ${locationValues.state} ${locationValues.zip}`,
        adornment: <img src={zipAdornment} alt="city, state, zip code" />,
      },
      {
        value: "**** **** **** 1234",
        adornment: <Card src={cardAdornment} alt="credit card" />,
      },
      {
        promo: {
          helperText: "",
          placeholder: "Promo Code",
          startAdornment: <img src={promoAdornment} alt="promo code" />,
        },
      },
    ],
    [locationValues]
  )

  // prices
  const prices = useMemo(
    () => [
      {
        label: "SUBTOTAL",
        value: subtotal.toFixed(2),
      },
      {
        label: "SHIPPING",
        value: shipping.price.toFixed(2),
      },
      {
        label: "TAX",
        value: tax.toFixed(2),
      },
    ],
    [subtotal, shipping, tax]
  )
  const total = useMemo(
    () => prices.reduce((total, item) => total + parseFloat(item.value), 0),
    [prices]
  )

  const adornmentValue = useCallback(
    (adornment, value) => (
      <Fragment>
        <Grid item sx={sx.adornmentWrapper} xs={2}>
          {adornment}
        </Grid>
        <Grid item sx={sx.centerText} xs={10} zeroMinWidth>
          <Typography variant="body1" noWrap sx={sx.text}>
            {value}
          </Typography>
        </Grid>
      </Fragment>
    ),
    [sx]
  )

  // functions
  const getFieldSx = useCallback(
    index => {
      let fieldSx = sx.fieldRow
      return index % 2 ? { ...fieldSx, ...sx.darkBackground } : fieldSx
    },
    [sx]
  )

  const handleOrder = async () => {
    setLoading(true)

    const idempotencyKey = uuidv4()
    const cardElement = elements.getElement(CardElement)
    const result = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            address: {
              city: billingLocation.city,
              state: billingLocation.state,
              line1: billingLocation.street,
            },
            email: billingDetails.email,
            name: billingDetails.name,
            phone: billingDetails.phone,
          },
        },
      },
      { idempotencyKey }
    )

    if (result.error) {
      console.error(result.error.message)
      dispatchFeedback(
        setSnackbar({ status: "error", message: result.error.message })
      )
      setLoading(false)
    } else if (result.paymentIntent.status === "succeeded") {
      console.log("PAYMENT SUCCESSFUL")
    }

    // axios
    //   .post(
    //     `${process.env.STRAPI_API_URL}/api/orders/place`,
    //     {
    //       shippingAddress: locationValues,
    //       billingAddress: billingLocation,
    //       shippingInfo: detailValues,
    //       billingInfo: billingDetails,
    //       shippingOption: shipping,
    //       subtotal: subtotal.toFixed(2),
    //       tax: tax.toFixed(2),
    //       total: total.toFixed(2),
    //       items: cart,
    //     },
    //     {
    //       headers:
    //         user.name !== "Guest"
    //           ? { Authorization: `Bearer ${user.jwt}` }
    //           : undefined,
    //     }
    //   )
    //   .then(response => {
    //     dispatchCart(clearCart())

    //     setOrder({
    //       id: response.data.data.id,
    //       ...response.data.data.attributes,
    //     })
    //     setSelectedStep(selectedStep + 1)
    //   })
    //   .catch(error => {
    //     console.error(error)
    //   })
    //   .finally(() => {
    //     setLoading(false)
    //   })
  }

  // useEffects
  useEffect(() => {
    if (!order && cart.length !== 0) {
      const storedIntent = localStorage.getItem("intentID")
      const idempotencyKey = uuidv4()

      setClientSecret(null)

      axios
        .post(
          `${process.env.STRAPI_API_URL}/api/orders/process`,
          {
            items: cart,
            total: total.toFixed(2),
            shippingOption: shipping,
            idempotencyKey,
            storedIntent,
            email: detailValues.email,
          },
          {
            headers: user.jwt
              ? {
                  Authorization: `Bearer ${user.jwt}`,
                }
              : undefined,
          }
        )
        .then(response => {
          setClientSecret(response.data.data.attributes.client_secret)
          localStorage.setItem(
            "intentID",
            response.data.data.attributes.intentID
          )
        })
        .catch(error => {
          console.log(error)

          switch (error.response.status) {
            case 400:
              dispatchFeedback(
                setSnackbar({ status: "error", message: "Invalid Cart" })
              )
              break
            case 409:
              dispatchFeedback(
                setSnackbar({
                  status: "error",
                  message:
                    "The following items are not available at the requested quantity. Please update your cart and try again.\n" +
                    `${error.response.data.error.details.unavailable.map(
                      item => `\n Item: ${item.id}, Available: ${item.qty}`
                    )}`,
                })
              )
              break
            default:
              dispatchFeedback(
                setSnackbar({
                  status: "error",
                  message:
                    "Something went wrong, please refresh the page and try again. You have NOT been charged.",
                })
              )
          }
        })
    }
  }, [cart])

  console.log("CLIENT SECRET", clientSecret)

  return (
    <Grid item container sx={sx.mainContainer} direction="column">
      <Grid item container>
        <Grid item container direction="column" xs={7}>
          {firstFields.map(({ adornment, value }, index) => (
            <Grid
              item
              container
              alignItems="center"
              sx={getFieldSx(index)}
              key={index}
            >
              {adornmentValue(adornment, value)}
            </Grid>
          ))}
        </Grid>
        <Grid item xs={5} sx={sx.iconWrapper}>
          <img src={ConfirmationIcon} alt="confirmation" />
        </Grid>
      </Grid>
      {secondFields.map((field, index) => (
        <Grid
          item
          container
          alignItems="center"
          sx={getFieldSx(index)}
          key={index}
        >
          <Grid item container xs={7}>
            {field.promo ? (
              <FieldWrapper>
                <Fields
                  fields={field}
                  values={promo}
                  setValues={setPromo}
                  errors={promoErrors}
                  setErrors={setPromoErrors}
                  isWhite
                  sm={matchesSM}
                />
              </FieldWrapper>
            ) : (
              adornmentValue(field.adornment, field.value)
            )}
          </Grid>
          <Grid item container xs={5}>
            <Grid item xs={6}>
              <Typography variant="h5" sx={sx.priceLabel}>
                {prices[index].label}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" sx={sx.priceValue} variant="body2">
                ${prices[index].value}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Grid sx={sx.buttonWrapper} item>
        <Button
          sx={sx.button}
          onClick={handleOrder}
          disabled={cart.length === 0 || loading || !clientSecret}
        >
          <Grid container alignItems="center" justifyContent="space-around">
            <Grid item>
              <Typography variant="h5">PLACE ORDER</Typography>
            </Grid>
            <Grid item>
              {loading ? (
                <CircularProgress />
              ) : (
                <Chip label={`$${total.toFixed(2)}`} sx={sx.chip} />
              )}
            </Grid>
          </Grid>
        </Button>
      </Grid>
    </Grid>
  )
}

export default Confirmation
