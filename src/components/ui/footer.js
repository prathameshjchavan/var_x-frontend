import React from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { styled, useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import facebook from "../../images/facebook.svg"
import twitter from "../../images/twitter.svg"
import instagram from "../../images/instagram.svg"

const Footer = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down("footer"))

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
    spacer: {
      margin: "2rem 0",
    },
    linkContainer: {
      marginBottom: matches ? "3rem" : undefined,
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
            <Grid item container sx={sx.linkColumn} direction="column">
              <Grid item>
                <Typography variant="h5">Contact Us</Typography>
              </Grid>
              <Grid item>
                <Typography sx={sx.body1} variant="body1">
                  (555) 555-5555
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={sx.body1} variant="body1">
                  zacahry@var-x.com
                </Typography>
              </Grid>
            </Grid>
            <Grid item container sx={sx.linkColumn} direction="column">
              <Grid item>
                <Typography variant="h5">Customer Service</Typography>
              </Grid>
              <Grid item>
                <Typography sx={sx.body1} variant="body1">
                  Contact Us
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={sx.body1} variant="body1">
                  My Account
                </Typography>
              </Grid>
            </Grid>
            <Grid item container sx={sx.linkColumn} direction="column">
              <Grid item>
                <Typography variant="h5">Information</Typography>
              </Grid>
              <Grid item>
                <Typography sx={sx.body1} variant="body1">
                  Privacy Policy
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={sx.body1} variant="body1">
                  Terms & Conditions
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* Social Media Icons */}
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <img src={facebook} alt="facebook" />
            </Grid>
            <Grid item sx={sx.spacer}>
              <img src={twitter} alt="twitter" />
            </Grid>
            <Grid item>
              <img src={instagram} alt="instagram" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Footer>
  )
}

export default Footer
