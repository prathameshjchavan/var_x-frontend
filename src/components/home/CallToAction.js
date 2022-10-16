import React from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Link } from "gatsby"
import cta from "../../images/cta.svg"

const CallToAction = () => {
  const sx = {
    container: {
      marginBottom: "15rem",
    },
    body: {
      maxWidth: "45rem !important",
      marginBottom: "3rem",
    },
    account: {
      color: "#fff",
      marginLeft: "2rem",
    },
  }

  return (
    <Grid
      container
      justifyContent="space-around"
      alignItems="center"
      sx={sx.container}
    >
      <Grid item>
        <img src={cta} alt="quality committed" />
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h1">Committed To Quality</Typography>
          </Grid>
          <Grid item sx={sx.body}>
            <Typography variant="body1">
              At VAR X our mission is to provide comfortable, durable, premium,
              designer clothing and clothing accessories to developers and
              technology enthusiasts.
            </Typography>
          </Grid>
          <Grid item container>
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
