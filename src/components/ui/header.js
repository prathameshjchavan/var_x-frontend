import React, { useState } from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { styled } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemButton from "@mui/material/ListItemButton"
import search from "../../images/search.svg"
import cart from "../../images/cart.svg"
import account from "../../images/account-header.svg"
import menu from "../../images/menu.svg"

const Header = ({ categories }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  const routes = [
    ...categories.map(({ node }) => node),
    { name: "Contact Us", strapi_id: "contact" },
  ]
  const actions = [
    { icon: search, alt: "search", visible: true },
    { icon: cart, alt: "cart", visible: true },
    { icon: account, alt: "account", visible: !matchesMD },
    {
      icon: menu,
      alt: "menu",
      visible: matchesMD,
      onClick: () => setDrawerOpen(true),
    },
  ]

  // sx prop
  const sx = {
    tabs: {
      margin: "0 auto",
      "& .MuiTabs-indicator": {
        backgroundColor: "#fff",
      },
      "& .Mui-selected": {
        color: "",
      },
    },
    accountButton: {
      display: { xs: "none", md: "block" },
    },
  }

  // styled components
  const LogoText = styled("span")(({ theme }) => ({
    color: theme.palette.common.offBlack,
  }))

  const Icon = styled("img")(() => ({
    height: "3rem",
    width: "3rem",
  }))

  return (
    <header>
      <AppBar color="transparent" elevation={0}>
        <Toolbar>
          <Button disableRipple>
            <Typography variant="h1">
              <LogoText>VAR</LogoText> X
            </Typography>
          </Button>
          {matchesMD ? (
            <SwipeableDrawer
              anchor="right"
              open={drawerOpen}
              onOpen={() => setDrawerOpen(true)}
              onClose={() => setDrawerOpen(false)}
              disableBackdropTransition={!iOS}
              disableDiscovery={iOS}
            >
              <List disablePadding>
                {routes.map(route => (
                  <ListItem divider key={route.strapi_id}>
                    <ListItemButton>
                      <ListItemText primary={route.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </SwipeableDrawer>
          ) : (
            <Tabs value={0} sx={sx.tabs}>
              {routes.map(route => (
                <Tab key={route.strapi_id} label={route.name} />
              ))}
            </Tabs>
          )}
          {actions
            .filter(action => action.visible)
            .map((action, i) => (
              <IconButton key={i} onClick={action.onClick}>
                <Icon src={action.icon} alt={action.alt} />
              </IconButton>
            ))}
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default Header
