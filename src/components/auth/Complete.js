import { Button, Grid, Typography, useTheme } from "@mui/material"
import React, { useEffect, Fragment } from "react"
import { styled } from "@mui/material/styles"
import checkmark from "../../images/checkmark-outline.svg"
import forward from "../../images/forward-outline.svg"
import { setUser } from "../../contexts/actions"

const Complete = ({ user, dispatchUser }) => {
  const theme = useTheme()

  useEffect(() => {
    return () => {
      dispatchUser(setUser({ ...user, onboarding: true }))
    }
  }, [dispatchUser, user])

  // sx prop
  const sx = {
    iconText: {
      marginTop: "10rem",
    },
    text: {
      color: theme.palette.secondary.main,
      fontWeight: 700,
      textTransform: "none",
    },
    shopContainer: {
      margin: "1rem",
    },
  }

  // styled component
  const ShopIcon = styled("img")(() => ({
    marginLeft: "1rem",
  }))

  return (
    <Fragment>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        sx={sx.iconText}
      >
        <Grid item>
          <img src={checkmark} alt="sign up finished" />
        </Grid>
        <Grid item>
          <Typography variant="h3" sx={sx.text}>
            Account Created!
          </Typography>
        </Grid>
      </Grid>
      <Grid item container justifyContent="flex-end">
        <Grid item sx={sx.shopContainer}>
          <Button>
            <Typography variant="h3" sx={sx.text}>
              Shop
            </Typography>
            <ShopIcon src={forward} alt="browse products" />
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Complete
