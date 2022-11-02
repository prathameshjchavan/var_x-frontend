import React from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Link } from "gatsby"
import cta from "../../images/cta.svg"
import { useMediaQuery, useTheme } from "@mui/material"
import { styled } from "@mui/material/styles"

const CallToAction = () => {
  const theme = useTheme()
  const matchesVertical = useMediaQuery("(max-width: 1300px)")

  const sx = {
    container: {
      marginBottom: "15rem",
    },
    headingContainer: {
      [theme.breakpoints.down("md")]: {
        padding: "0 1rem",
      },
      [theme.breakpoints.down("sm")]: {
        padding: 0,
      },
    },
    body: {
      maxWidth: "45rem !important",
      marginBottom: "3rem",
      [theme.breakpoints.down("md")]: {
        padding: "0 1rem",
      },
      [theme.breakpoints.down("sm")]: {
        padding: 0,
      },
    },
    account: {
      color: "#fff",
      marginLeft: "2rem",
    },
  }

  const Icon = styled("img")(() => ({
    marginLeft: matchesVertical ? undefined : "2rem",
    [theme.breakpoints.down("sm")]: {
      height: "18rem",
      width: "20rem",
    },
  }))

  return (
    <Grid
      container
      justifyContent="space-around"
      alignItems="center"
      direction={matchesVertical ? "column" : "row"}
      sx={sx.container}
    >
      <Grid item>
        <Icon src={cta} alt="quality committed" />
      </Grid>
      <Grid item>
        <Grid
          container
          direction="column"
          align={matchesVertical ? "center" : undefined}
        >
          <Grid item sx={sx.headingContainer}>
            <Typography variant="h1">Committed To Quality</Typography>
          </Grid>
          <Grid item sx={sx.body}>
            <Typography variant="body1">
              At VAR X our mission is to provide comfortable, durable, premium,
              designer clothing and clothing accessories to developers and
              technology enthusiasts.
            </Typography>
          </Grid>
          <Grid
            item
            container
            justifyContent={matchesVertical ? "center" : undefined}
          >
            <Grid item>
              <Button variant="outlined" component={Link} to="/contact">
                Contact Us
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                component={Link}
                to="/account"
                sx={sx.account}
                color="primary"
              >
                Create Account
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CallToAction
