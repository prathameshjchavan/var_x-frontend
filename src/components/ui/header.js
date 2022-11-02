import React, { useState } from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { styled, useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemButton from "@mui/material/ListItemButton"
import { Link } from "gatsby"
import search from "../../images/search.svg"
import cart from "../../images/cart.svg"
import account from "../../images/account-header.svg"
import menu from "../../images/menu.svg"

const Header = ({ categories }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const matchesSmall = useMediaQuery("(max-width: 1100px)")
  const theme = useTheme()
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  const routes = [
    ...categories.map(({ node }) => node),
    { name: "Contact Us", strapi_id: "contact", link: "/contact" },
  ]
  const actions = [
    { icon: search, alt: "search", visible: true },
    { icon: cart, alt: "cart", visible: true, link: "/cart" },
    { icon: account, alt: "account", visible: !matchesSmall, link: "/account" },
    {
      icon: menu,
      alt: "menu",
      visible: matchesSmall,
      onClick: () => setDrawerOpen(true),
    },
  ]

  const activeIndex = () => {
    const found = routes.indexOf(
      routes.filter(
        ({ name, link }) =>
          (link || `/${name.toLowerCase()}`) === window.location.pathname
      )[0]
    )

    return found === -1 ? false : found
  }

  // sx prop
  const sx = {
    logoContainer: {
      marginRight: matchesSmall ? "auto" : undefined,
    },
    logo: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "3rem",
      },
    },
    tabs: {
      margin: "0 auto",
      "& .MuiTabs-indicator": {
        backgroundColor: "#fff",
      },
    },
    accountButton: {
      display: { xs: "none", md: "block" },
    },
    drawer: {
      "& .MuiPaper-root": {
        backgroundColor: theme.palette.primary.main,
      },
      "& .Mui-selected": {
        backgroundColor: `${theme.palette.primary.dark} !important`,
      },
    },
    listItem: {
      "&.MuiListItem-root": {
        padding: 0,
      },
    },
    listItemText: {
      "&.MuiListItemText-root": {
        padding: "8px 16px",
      },
      "& .MuiTypography-root": {
        color: "#fff",
      },
    },
    tab: {
      ...theme.typography.body1,
      fontWeight: 600,
    },
  }

  // styled components
  const LogoText = styled("span")(({ theme }) => ({
    color: theme.palette.common.offBlack,
  }))

  const Icon = styled("img")(() => ({
    height: "3rem",
    width: "3rem",
    [theme.breakpoints.down("sm")]: {
      height: "2rem",
      width: "2rem",
    },
  }))

  return (
    <header>
      <AppBar color="transparent" elevation={0} position="static">
        <Toolbar>
          <Button component={Link} to="/" sx={sx.logoContainer} disableRipple>
            <Typography variant="h1" sx={sx.logo}>
              <LogoText>VAR</LogoText> X
            </Typography>
          </Button>
          {matchesSmall ? (
            <SwipeableDrawer
              sx={sx.drawer}
              anchor="right"
              open={drawerOpen}
              onOpen={() => setDrawerOpen(true)}
              onClose={() => setDrawerOpen(false)}
              disableBackdropTransition={!iOS}
              disableDiscovery={iOS}
            >
              <List disablePadding>
                {routes.map((route, i) => (
                  <ListItem
                    selected={activeIndex() === i}
                    sx={sx.listItem}
                    component={Link}
                    to={route.link || `/${route.name.toLowerCase()}`}
                    divider
                    key={route.strapi_id}
                  >
                    <ListItemButton disableRipple>
                      <ListItemText sx={sx.listItemText} primary={route.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </SwipeableDrawer>
          ) : (
            <Tabs value={activeIndex()} sx={sx.tabs}>
              {routes.map(route => (
                <Tab
                  sx={sx.tab}
                  component={Link}
                  to={route.link || `/${route.name.toLowerCase()}`}
                  key={route.strapi_id}
                  label={route.name}
                />
              ))}
            </Tabs>
          )}
          {actions
            .filter(action => action.visible)
            .map(({ icon, alt, link, onClick }, i) => (
              <IconButton
                component={link ? Link : undefined}
                to={link}
                key={i}
                onClick={onClick}
              >
                <Icon src={icon} alt={alt} />
              </IconButton>
            ))}
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default Header
