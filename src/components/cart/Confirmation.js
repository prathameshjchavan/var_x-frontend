import React, { Fragment, useCallback, useMemo, useState } from "react"
import ConfirmationIcon from "../../images/tag.svg"
import NameAdornment from "../../images/NameAdornment"
import EmailAdornment from "../../images/EmailAdornment"
import PhoneAdornment from "../../images/PhoneAdornment"
import StreetAdornment from "../../images/street-adornment.svg"
import zipAdornment from "../../images/zip-adornment.svg"
import cardAdornment from "../../images/card.svg"
import promoAdornment from "../../images/promo-code.svg"
import { Grid, Typography, useTheme } from "@mui/material"
import Fields from "../auth/Fields"
import { styled } from "@mui/material/styles"

const Confirmation = () => {
  const theme = useTheme()
  const [promo, setPromo] = useState({ promo: "" })
  const [promoErrors, setPromoErrors] = useState({})

  // sx prop
  const sx = useMemo(
    () => ({
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
    }),
    [theme]
  )

  // styled components
  const Wrapper = styled("div")(() => {})

  const Card = styled("img")(() => ({
    height: "18px",
    width: "25px",
  }))

  // fields
  const firstFields = useMemo(
    () => [
      {
        value: "Prathamesh Chavan",
        adornment: (
          <Wrapper sx={sx.nameWrapper}>
            <NameAdornment color="#fff" />
          </Wrapper>
        ),
      },
      {
        value: "prathamesh.chavan216@gmail.com",
        adornment: (
          <Wrapper sx={sx.emailWrapper}>
            <EmailAdornment color="#fff" />
          </Wrapper>
        ),
      },
      {
        value: "(555) 555-5555",
        adornment: (
          <Wrapper sx={sx.phoneWrapper}>
            <PhoneAdornment />
          </Wrapper>
        ),
      },
      {
        value: "1234 Example Street",
        adornment: <img src={StreetAdornment} alt="street address" />,
      },
    ],
    [sx]
  )

  const secondFields = useMemo(
    () => [
      {
        value: "Wichita, KS 67211",
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
    []
  )

  // prices
  const prices = useMemo(
    () => [
      {
        label: "SUBTOTAL",
        value: 99.99,
      },
      {
        label: "SHIPPING",
        value: 9.99,
      },
      {
        label: "TAX",
        value: 9.67,
      },
    ],
    []
  )

  const adornmentValue = useCallback(
    (adornment, value) => (
      <Fragment>
        <Grid item xs={1}>
          {adornment}
        </Grid>
        <Grid item xs={11}>
          <Typography variant="body1" sx={sx.text}>
            {value}
          </Typography>
        </Grid>
      </Fragment>
    ),
    [sx.text]
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
    <Grid item container direction="column">
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
        <Grid item xs={5}>
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
          <Grid item xs={7}>
            {field.promo ? (
              <Fields
                fields={field}
                values={promo}
                setValues={setPromo}
                errors={promoErrors}
                setErrors={setPromoErrors}
                isWhite
              />
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
              <Typography align="right" variant="body2">
                ${prices[index].value}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default Confirmation
