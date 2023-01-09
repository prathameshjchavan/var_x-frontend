import React, { useMemo } from "react"
import ConfirmationIcon from "../../images/tag.svg"
import NameAdornment from "../../images/NameAdornment"
import EmailAdornment from "../../images/EmailAdornment"
import PhoneAdornment from "../../images/PhoneAdornment"
import StreetAdornment from "../../images/street-adornment.svg"
import zipAdornment from "../../images/zip-adornment.svg"
import cardAdornment from "../../images/card.svg"
import promoAdornment from "../../images/promo-code.svg"
import { Grid, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

const Confirmation = () => {
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
    }),
    []
  )

  // styled components
  const Wrapper = styled("div")(() => {})

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
        adornment: <img src={cardAdornment} alt="credit card" />,
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

  return (
    <Grid item container direction="column">
      <Grid item container>
        <Grid item container direction="column" xs={8}>
          {firstFields.map((field, index) => (
            <Grid item container key={index}>
              <Grid item xs={1}>
                {field.adornment}
              </Grid>
              <Grid item xs={11}>
                <Typography variant="body1" sx={sx.text}>
                  {field.value}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={4}>
          <img src={ConfirmationIcon} alt="confirmation" />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Confirmation
