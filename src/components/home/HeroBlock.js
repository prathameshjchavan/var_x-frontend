import React from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Lottie from "react-lottie"
import useMediaQuery from "@mui/material/useMediaQuery"
import animationData from "../../images/data.json"
import { useTheme } from "@mui/material"

const HeroBlock = () => {
  const theme = useTheme()
  const matchesXS = useMediaQuery("(max-width: 380px)")
  const matchesSM = useMediaQuery(theme => theme.breakpoints.down("sm"))
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))
  const matchesXL = useMediaQuery("(max-width: 1540px)")
  const matchesXXL = useMediaQuery(theme => theme.breakpoints.down("xxl"))
  const matchesVertical = useMediaQuery("(max-width: 1480px)")
  const animationWidth = matchesXS
    ? "18rem"
    : matchesSM
    ? "20rem"
    : matchesMD
    ? "25rem"
    : matchesXL
    ? "30rem"
    : matchesXXL
    ? "35rem"
    : "40rem"

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  const sx = {
    container: {
      padding: "0 2rem",
    },
    heading: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "3.5rem",
      },
      "@media (max-width: 380px)": {
        fontSize: "3rem",
      },
    },
    textContainer: {
      textAlign: matchesVertical ? "center" : undefined,
      marginBottom: matchesVertical ? "2rem" : undefined,
    },
  }

  return (
    <Grid
      container
      sx={sx.container}
      direction={matchesVertical ? "column" : "row"}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item sx={sx.textContainer} alignItems="center">
        <Grid container direction="column">
          <Grid item>
            <Typography sx={sx.heading} variant="h1">
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
        <Lottie options={defaultOptions} width={animationWidth} />
      </Grid>
    </Grid>
  )
}

export default HeroBlock
