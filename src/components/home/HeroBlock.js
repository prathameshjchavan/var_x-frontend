import React from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Lottie from "react-lottie"
import animationData from "../../images/data.json"

const HeroBlock = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
  }

  return (
    <Grid container justifyContent="space-around" alignItems="center">
      <Grid item alignItems="center">
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h1">
              The Premiere
              <br />
              Developer Clothing Line
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3">
              high quality, custom-designed shirts, hats and hoodies
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Lottie options={defaultOptions} width="50rem" />
      </Grid>
    </Grid>
  )
}

export default HeroBlock
