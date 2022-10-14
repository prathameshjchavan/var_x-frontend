import React from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import { styled, useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import facebook from "../../images/facebook.svg"
import twitter from "../../images/twitter.svg"
import instagram from "../../images/instagram.svg"
import { Link } from "gatsby"

const Footer = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down("footer"))
  const socialMedia = [
    { icon: facebook, alt: "facebook", link: "https://facebook.com" },
    { icon: twitter, alt: "twitter", link: "https://twitter.com" },
    { icon: instagram, alt: "instagram", link: "https://instagram.com" },
  ]
  const routes = {
    "Contact Us": [
      { label: "(555) 555-5555", href: "tel:(555) 555-5555" },
      { label: "zachary@var-x.com", href: "mailto: 'zachary@var-x.com" },
    ],
    "Customer Service": [
      { label: "Contact Us", link: "/contact" },
      { label: "My Account", link: "/account" },
    ],
    Information: [
      { label: "Privacy Policy", link: "/privacy-policy" },
      { label: "Terms & Conditions", link: "/terms-conditions" },
    ],
  }

  // sx prop
  const sx = {
    footerContainer: {
      flexDirection: matches ? "column" : undefined,
      alignItems: "flex-start",
    },
    body1: {
      color: "#fff",
      fontSize: "1.25rem",
    },
    linkColumn: {
      width: "20rem",
    },
    linkContainer: {
      marginBottom: matches ? "3rem" : undefined,
    },
    iconButton: {
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    link: {
      textDecoration: "none",
    },
  }

  const Footer = styled("footer")(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    padding: "2rem",
  }))

  return (
    <Footer>
      <Grid container sx={sx.footerContainer} justifyContent="space-between">
        {/* Links */}
        <Grid item sx={sx.linkContainer}>
          <Grid container>
            {Object.keys(routes).map((category, i) => (
              <Grid
                key={i}
                item
                container
                sx={sx.linkColumn}
                direction="column"
              >
                <Grid item>
                  <Typography variant="h5">{category}</Typography>
                </Grid>
                {routes[category].map(({ label, link, href }, i) => (
                  <Grid key={i} item>
                    <Typography
                      component={link ? Link : "a"}
                      to={link ? link : undefined}
                      href={href ? href : undefined}
                      sx={{ ...sx.body1, ...sx.link }}
                      variant="body1"
                    >
                      {label}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/* Social Media Icons */}
        <Grid item>
          <Grid container direction="column" alignItems="center">
            {socialMedia.map((platform, i) => (
              <Grid key={i} item>
                <IconButton
                  sx={sx.iconButton}
                  disableRipple
                  component="a"
                  href={platform.link}
                >
                  <img src={platform.icon} alt={platform.alt} />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Footer>
  )
}

export default Footer
