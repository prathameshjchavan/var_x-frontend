import React from "react"
import { SwipeableDrawer, useTheme } from "@mui/material"

const OrderDetails = ({ open, setOpen }) => {
  const theme = useTheme()
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)

  // sx prop
  const sx = {
    drawer: {
      "& .MuiPaper-root": {
        height: "100%",
        width: "30rem",
        backgroundColor: theme.palette.primary.main,
      },
    },
  }

  return (
    <SwipeableDrawer
      open={!!open}
      onOpen={() => null}
      onClose={() => setOpen(null)}
      sx={sx.drawer}
      anchor="right"
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    ></SwipeableDrawer>
  )
}

export default OrderDetails
