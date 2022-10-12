import React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { styled } from "@mui/material/styles"
import search from "../../images/search.svg"
import cart from "../../images/cart.svg"
import account from "../../images/account-header.svg"

const Header = ({ categories }) => {
  const routes = [
    ...categories.map(({ node }) => node),
    { name: "Contact Us", strapi_id: "contact" },
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
  }

  // styled components
  const LogoText = styled("span")(({ theme }) => ({
    color: theme.palette.common.offBlack,
  }))

  return (
    <header>
      <AppBar color="transparent" elevation={0}>
        <Toolbar>
          <Button>
            <Typography variant="h1">
              <LogoText>VAR</LogoText> X
            </Typography>
          </Button>
          <Tabs value={0} sx={sx.tabs}>
            {routes.map(route => (
              <Tab key={route.strapi_id} label={route.name} />
            ))}
          </Tabs>
          <IconButton>
            <img src={search} alt="search" />
          </IconButton>
          <IconButton>
            <img src={cart} alt="cart" />
          </IconButton>
          <IconButton>
            <img src={account} alt="account" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default Header
