import React from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { Link } from "gatsby"
import marketingAdornment from "../../images/marketing-adornment.svg"
import moreByUs from "../../images/more-by-us.svg"
import store from "../../images/store.svg"
import { useTheme } from "@mui/material"
import { styled } from "@mui/material/styles"

const MarketingButtons = () => {
  const theme = useTheme()

  const buttons = [
    { label: "Store", icon: store, link: "/hoodies" },
    { label: "More By Us", icon: moreByUs, href: "https://www.google.com" },
  ]

  const sx = {
    container: {
      margin: "15rem 0",
    },
    button: {
      backgroundImage: `url(${marketingAdornment})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "50rem",
      width: "50rem",
      textDecoration: "none",
      transition: "transform 0.5s ease",
      "&:hover": {
        transform: "scale(1.1)",
      },
      [theme.breakpoints.down("xxl")]: {
        height: "40rem",
        width: "40rem",
        margin: "3rem",
      },
      [theme.breakpoints.down("md")]: {
        height: "30rem",
        width: "30rem",
      },
      [theme.breakpoints.down("sm")]: {
        height: "20rem",
        width: "20rem",
        margin: "2rem 0",
        "&:hover": {
          transform: "scale(1)",
        },
      },
    },
    label: {
      [theme.breakpoints.down("md")]: {
        fontSize: "2.75rem",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "2.25rem",
      },
    },
  }

  const Icon = styled("img")(() => ({
    [theme.breakpoints.down("md")]: {
      height: "8rem",
      width: "8rem",
    },
    [theme.breakpoints.down("sm")]: {
      height: "5rem",
      width: "5rem",
    },
  }))

  return (
    <Grid container justifyContent="space-around" sx={sx.container}>
      {buttons.map(button => (
        <Grid key={button.label} item>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            sx={sx.button}
            component={button.link ? Link : "a"}
            to={button.link ? button.link : undefined}
            href={button.href ? button.href : undefined}
          >
            <Grid item>
              <Icon src={button.icon} alt={button.label} />
            </Grid>
            <Grid item>
              <Typography sx={sx.label} variant="h1">
                {button.label}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default MarketingButtons
