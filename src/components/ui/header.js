import React, { useState, useContext } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Tabs,
  Tab,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Badge,
  useMediaQuery,
} from "@mui/material"
import { styled, useTheme } from "@mui/material/styles"
import { Link } from "gatsby"
import searchIcon from "../../images/search.svg"
import cartIcon from "../../images/cart.svg"
import accountIcon from "../../images/account-header.svg"
import menuIcon from "../../images/menu.svg"
import { CartContext } from "../../contexts/index"

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
    { icon: searchIcon, alt: "search", visible: true },
    { icon: cartIcon, alt: "cart", visible: true, link: "/cart" },
    {
      icon: accountIcon,
      alt: "account",
      visible: !matchesSmall,
      link: "/account",
    },
    {
      icon: menuIcon,
      alt: "menu",
      visible: matchesSmall,
      onClick: () => setDrawerOpen(true),
    },
  ]
  const { cart } = useContext(CartContext)

  const activeIndex = () => {
    const found = routes.indexOf(
      routes.filter(
        ({ name, link }) =>
          (link || `/${name.toLowerCase()}`) ===
          `/${window.location.pathname.split("/")[1]}`
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
      fontWeight: 500,
    },
    badge: {
      "& .MuiBadge-badge": {
        fontSize: "1rem",
        color: "#fff",
        minWidth: 0,
        [theme.breakpoints.down("sm")]: {
          fontSize: "0.75rem",
          height: "1.1rem",
          width: "1.1rem",
        },
      },
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
            .map(({ icon, alt, link, onClick }, i) => {
              const image = <Icon src={icon} alt={alt} />

              return (
                <IconButton
                  component={link ? Link : undefined}
                  to={link}
                  key={i}
                  onClick={onClick}
                >
                  {alt === "cart" ? (
                    <Badge
                      overlap="circular"
                      color="secondary"
                      sx={sx.badge}
                      badgeContent={cart.length}
                    >
                      {image}
                    </Badge>
                  ) : (
                    image
                  )}
                </IconButton>
              )
            })}
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default Header
