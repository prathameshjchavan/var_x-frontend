import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import accountIcon from "../../images/account.svg"
import settingsIcon from "../../images/settings.svg"
import orderHistoryIcon from "../../images/order-history.svg"
import favoritesIcon from "../../images/favorite.svg"
import subscriptionIcon from "../../images/subscription.svg"
import background from "../../images/repeating-smallest.svg"
import { Button, Grid, Typography, useTheme } from "@mui/material"
import { styled } from "@mui/material/styles"
import { UserContext } from "../../contexts"
import { useSpring, useSprings, animated } from "@react-spring/web"
import useResizeAware from "react-resize-aware"
import Settings from "./Settings"

const SettingsPortal = () => {
  const { user } = useContext(UserContext)
  const theme = useTheme()
  const [selectedSetting, setSelectedSetting] = useState(null)
  const [showComponent, setShowComponent] = useState(false)
  const buttons = useMemo(
    () => [
      {
        label: "Settings",
        icon: settingsIcon,
        component: Settings,
      },
      {
        label: "Order History",
        icon: orderHistoryIcon,
        component: Settings,
      },
      {
        label: "Favorites",
        icon: favoritesIcon,
        component: Settings,
      },
      {
        label: "Subscriptions",
        icon: subscriptionIcon,
        component: Settings,
      },
    ],
    []
  )
  const animatedGridStyles = useSpring({
    opacity: selectedSetting === null || showComponent ? 1 : 0,
    delay: selectedSetting === null || showComponent ? 0 : 1350,
  })
  const AnimatedGrid = useMemo(() => animated(Grid), [])
  const [resizeListener, sizes] = useResizeAware()

  // sx prop
  const sx = {
    name: {
      color: theme.palette.secondary.main,
    },
    button: {
      backgroundColor: theme.palette.primary.main,
      "&:hover": !showComponent
        ? {
            cursor: "pointer",
            backgroundColor: theme.palette.secondary.main,
          }
        : undefined,
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

  useEffect(() => {
    if (selectedSetting === null) return setShowComponent(false)

    const timer = setTimeout(() => setShowComponent(true), 2000)

    return () => clearTimeout(timer)
  }, [selectedSetting])

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
        {springs.map((style, index) => {
          const button = buttons[index]

          return (
            <AnimatedGrid
              key={index}
              sx={sx.button}
              item
              onClick={() => (showComponent ? null : handleClick(button.label))}
              style={style}
            >
              <AnimatedGrid
                style={animatedGridStyles}
                alignItems="center"
                justifyContent="center"
                container
                direction="column"
              >
                {selectedSetting === button.label && showComponent ? (
                  <button.component />
                ) : (
                  <Fragment>
                    <Grid item>
                      <Icon src={button.icon} alt={button.label} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5">{button.label}</Typography>
                    </Grid>
                  </Fragment>
                )}
              </AnimatedGrid>
            </AnimatedGrid>
          )
        })}
      </Grid>
    </Grid>
  )
}

export default SettingsPortal
