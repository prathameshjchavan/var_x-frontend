import React from "react"
import ConfirmationIcon from "../../images/tag.svg"
import NameAdornment from "../../images/NameAdornment"
import EmailAdornment from "../../images/EmailAdornment"
import PhoneAdornment from "../../images/PhoneAdornment"
import StreetAdornment from "../../images/street-adornment.svg"
import zipAdornment from "../../images/zip-adornment.svg"
import cardAdornment from "../../images/card.svg"
import promoAdornment from "../../images/promo-adornment.svg"
import { Grid, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

const Confirmation = () => {
  // sx prop
  const sx = {
    name: {
      fontSize: "1rem",
      color: "#fff",
    },
  }

  // styled components
  const NameWrapper = styled("div")(() => ({
    height: "22px",
    width: "22px",
  }))

  return (
    <Grid item container direction="column">
      <Grid item container>
        <Grid item container direction="column" xs={8}>
          <Grid item container>
            <Grid item xs={1}>
              <NameWrapper>
                <NameAdornment color="#fff" />
              </NameWrapper>
            </Grid>
            <Grid item xs={11}>
              <Typography variant="body1" sx={sx.name}>
                Prathamesh
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <img src={ConfirmationIcon} alt="confirmation" />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Confirmation
