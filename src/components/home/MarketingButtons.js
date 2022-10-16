import React from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { Link } from "gatsby"
import marketingAdornment from "../../images/marketing-adornment.svg"
import moreByUs from "../../images/more-by-us.svg"
import store from "../../images/store.svg"

const MarketingButtons = () => {
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
    },
  }

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
              <img src={button.icon} alt={button.label} />
            </Grid>
            <Grid item>
              <Typography variant="h1">{button.label}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default MarketingButtons
