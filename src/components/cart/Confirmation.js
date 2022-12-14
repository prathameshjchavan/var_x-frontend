import React, {
  Fragment,
  useCallback,
  useContext,
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
import { Grid, Typography, Button, Chip, useTheme } from "@mui/material"
import Fields from "../auth/Fields"
import { styled } from "@mui/material/styles"
import { CartContext } from "../../contexts"

const Confirmation = ({
  detailValues,
  billingDetails,
  detailForBilling,
  locationValues,
  billingLocation,
  locationForBilling,
  shippingOptions,
  selectedShipping,
}) => {
  const theme = useTheme()
  const [promo, setPromo] = useState({ promo: "" })
  const [promoErrors, setPromoErrors] = useState({})
  const { cart } = useContext(CartContext)
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
      priceValue: { marginRight: "1rem" },
      button: {
        width: "100%",
        height: "7rem",
        borderRadius: 0,
        backgroundColor: theme.palette.secondary.main,
        "&:hover": {
          backgroundColor: theme.palette.secondary.light,
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
        <Grid item sx={sx.centerText} xs={10}>
          <Typography variant="body1" sx={sx.text}>
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
        <Button sx={sx.button}>
          <Grid container alignItems="center" justifyContent="space-around">
            <Grid item>
              <Typography variant="h5">PLACE ORDER</Typography>
            </Grid>
            <Grid item>
              <Chip label={`$${total.toFixed(2)}`} sx={sx.chip} />
            </Grid>
          </Grid>
        </Button>
      </Grid>
    </Grid>
  )
}

export default Confirmation
