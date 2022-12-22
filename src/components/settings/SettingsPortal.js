import React, { useCallback, useContext, useMemo, useState } from "react"
import accountIcon from "../../images/account.svg"
import settingsIcon from "../../images/settings.svg"
import orderHistoryIcon from "../../images/order-history.svg"
import favoritesIcon from "../../images/favorite.svg"
import subscriptionIcon from "../../images/subscription.svg"
import background from "../../images/repeating-smallest.svg"
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
      minHeight: "30rem",
      height: "auto",
      backgroundImage: `url(${background})`,
      backgroundPosition: "center",
      backgroundRepeat: "repeat",
      borderTop: `0.5rem solid ${theme.palette.primary.main}`,
      borderBottom: `0.5rem solid ${theme.palette.primary.main}`,
      margin: "5rem 0",
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
      to: async (next, cancel) => {
        const scale = {
          transform:
            selectedSetting === button.label || selectedSetting === null
              ? "scale(1)"
              : "scale(0)",
          delay: selectedSetting !== null ? 0 : 600,
        }
        const size = {
          height: selectedSetting === button.label ? "60rem" : "22rem",
          width:
            selectedSetting === button.label ? `${sizes.width}px` : "352px",
          borderRadius: selectedSetting === button.label ? "0px" : "25px",
          delay: selectedSetting !== null ? 600 : 0,
        }
        const hide = {
          display:
            selectedSetting === button.label || selectedSetting === null
              ? "flex"
              : "none",
          delay: 150,
        }

        await next(selectedSetting !== null ? scale : size)
        await next(hide)
        await next(selectedSetting !== null ? size : scale)
      },
    }))
  )

  return (
    <Grid
      container
      style={{ position: "relative" }}
      direction="column"
      alignItems="center"
    >
      {resizeListener}
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
        {springs.map((style, index) => (
          <Grid item key={index}>
            <AnimatedButton
              variant="contained"
              color="primary"
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
