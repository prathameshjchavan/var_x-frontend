import React from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Lottie from "react-lottie"
import useMediaQuery from "@mui/material/useMediaQuery"
import animationData from "../../images/data.json"
import { useTheme } from "@mui/material"

const HeroBlock = () => {
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme => theme.breakpoints.down("sm"))
  const animationWidth = matchesSM ? "25rem" : "30rem"

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  const sx = {
    textContainer: {
      [theme.breakpoints.down("md")]: {
        padding: "2rem",
      },
    },
    animationContainer: {
      marginRight: "2rem",
    },
  }

  return (
    <Grid container justifyContent="space-around" alignItems="center">
      <Grid item sx={sx.textContainer} alignItems="center">
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
      <Grid item sx={sx.animationContainer}>
        <Lottie options={defaultOptions} width={animationWidth} />
      </Grid>
    </Grid>
  )
}

export default HeroBlock