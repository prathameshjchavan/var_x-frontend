import React, { useContext, useMemo } from "react"
import accountIcon from "../../images/account.svg"
import settingsIcon from "../../images/settings.svg"
import orderHistoryIcon from "../../images/order-history.svg"
import favoritesIcon from "../../images/favorite.svg"
import subscriptionIcon from "../../images/subscription.svg"
import background from "../../images/toolbar-background.svg"
import { Button, Grid, Typography, useTheme } from "@mui/material"
import { styled } from "@mui/material/styles"
import { UserContext } from "../../contexts"

const SettingsPortal = () => {
  const { user } = useContext(UserContext)
  const theme = useTheme()
  const buttons = useMemo(
    () => [
      {
        label: "Settings",
        icon: settingsIcon,
      },
      {
        label: "Order History",
        icon: orderHistoryIcon,
      },
      {
        label: "Favorites",
        icon: favoritesIcon,
      },
      {
        label: "Subscriptions",
        icon: subscriptionIcon,
      },
    ],
    []
  )

  // sx prop
  const sx = {
    name: {
      color: theme.palette.secondary.main,
    },
    dashboard: {
      width: "100%",
      height: "30rem",
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderTop: `0.5rem solid ${theme.palette.primary.main}`,
      borderBottom: `0.5rem solid ${theme.palette.primary.main}`,
      margin: "5rem 0",
    },
    button: {
      height: "22rem",
      width: "22rem",
      borderRadius: "25px",
    },
  }
  // styled components
  const Icon = styled("img")(() => ({
    height: "12rem",
    width: "12rem",
  }))

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <img src={accountIcon} alt="settings page" />
      </Grid>
      <Grid item>
        <Typography variant="h4" sx={sx.name}>
          Welcome back, {user.username}
        </Typography>
      </Grid>
      <Grid
        item
        container
        sx={sx.dashboard}
        alignItems="center"
        justifyContent="space-around"
      >
        {buttons.map(button => (
          <Grid item key={button.label}>
            <Button variant="contained" color="primary" sx={sx.button}>
              <Grid container direction="column">
                <Grid item>
                  <Icon src={button.icon} alt={button.label} />
                </Grid>
                <Grid item>
                  <Typography variant="h5">{button.label}</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default SettingsPortal
