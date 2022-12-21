import React, { useCallback, useContext, useMemo, useState } from "react"
import accountIcon from "../../images/account.svg"
import settingsIcon from "../../images/settings.svg"
import orderHistoryIcon from "../../images/order-history.svg"
import favoritesIcon from "../../images/favorite.svg"
import subscriptionIcon from "../../images/subscription.svg"
import background from "../../images/toolbar-background.svg"
import { Button, Grid, Typography, useTheme } from "@mui/material"
import { styled } from "@mui/material/styles"
import { UserContext } from "../../contexts"
import { useSprings, animated } from "@react-spring/web"
import useResizeAware from "react-resize-aware"

const SettingsPortal = () => {
  const { user } = useContext(UserContext)
  const theme = useTheme()
  const [selectedSetting, setSelectedSetting] = useState(null)
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
  const AnimatedButton = useMemo(() => animated(Button), [])
  const [resizeListener, sizes] = useResizeAware()

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

  // functions
  const handleClick = useCallback(
    setting => {
      if (selectedSetting === setting) {
        setSelectedSetting(null)
      } else {
        setSelectedSetting(setting)
      }
    },
    [selectedSetting, setSelectedSetting]
  )

  // springs
  const springs = useSprings(
    buttons.length,
    buttons.map(button => ({
      transform:
        selectedSetting === button.label || selectedSetting === null
          ? "scale(1)"
          : "scale(0)",
    }))
  )

  return (
    <Grid container direction="column" alignItems="center">
      {resizeListener}
      <Grid item>
        <img src={accountIcon} alt="settings page" />
      </Grid>
      {sizes.width} X {sizes.height}
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
        {springs.map((style, index) => (
          <Grid item key={index}>
            <AnimatedButton
              variant="contained"
              color="primary"
              sx={sx.button}
              onClick={() => handleClick(buttons[index].label)}
              style={style}
            >
              <Grid container direction="column">
                <Grid item>
                  <Icon src={buttons[index].icon} alt={buttons[index].label} />
                </Grid>
                <Grid item>
                  <Typography variant="h5">{buttons[index].label}</Typography>
                </Grid>
              </Grid>
            </AnimatedButton>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default SettingsPortal
