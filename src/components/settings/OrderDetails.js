import React from "react"
import {
  Grid,
  SwipeableDrawer,
  Chip,
  Typography,
  useTheme,
} from "@mui/material"

const OrderDetails = ({ orders, open, setOpen }) => {
  const theme = useTheme()
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  const order = orders.find(order => order.id === open)

  // sx prop
  const sx = {
    drawer: {
      "& .MuiPaper-root": {
        height: "100%",
        width: "30rem",
        backgroundColor: theme.palette.primary.main,
      },
    },
    id: {
      fontSize: "2.5rem",
      fontWeight: 600,
      marginTop: "1rem",
      marginLeft: "1rem",
    },
    chip: {
      "& .MuiChip-label": {
        fontWeight: 600,
      },
    },
    date: {
      fontWeight: 600,
      marginLeft: "1rem",
      marginBottom: "1rem",
    },
    bold: {
      fontWeight: 600,
    },
    padding: {
      padding: "1rem",
    },
    status: {
      marginLeft: "1rem",
    },
    dark: {
      backgroundColor: theme.palette.secondary.main,
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
    >
      <Grid container direction="column">
        <Grid item sx={sx.dark}>
          <Typography variant="h2" sx={sx.id}>
            Order #{order?.id}
          </Typography>
        </Grid>
        <Grid item container sx={sx.dark}>
          <Grid item sx={sx.status}>
            <Chip label={order?.status} color="primary" sx={sx.chip} />
          </Grid>
          <Grid item>
            <Typography variant="body2" sx={sx.date}>{`${
              order?.createdAt.split("-")[1]
            }/${order?.createdAt.split("-")[2].split("T")[0]}/${
              order?.createdAt.split("-")[0]
            }`}</Typography>
          </Grid>
        </Grid>
        <Grid item sx={sx.padding}>
          <Typography variant="body2" sx={sx.bold}>
            Billing
          </Typography>
          <Typography variant="body2">
            {order?.billingInfo.name}
            <br />
            {order?.billingInfo.email}
            <br />
            {order?.billingInfo.phone}
            <br />
            <br />
            {order?.billingAddress.street}
            <br />
            {order?.billingAddress.city}, {order?.billingAddress.state}{" "}
            {order?.billingAddress.zip}
          </Typography>
        </Grid>
        <Grid item sx={{ ...sx.padding, ...sx.dark }}>
          <Typography variant="body2" sx={sx.bold}>
            Shipping
          </Typography>
          <Typography variant="body2">
            {order?.shippingInfo.name}
            <br />
            {order?.shippingInfo.email}
            <br />
            {order?.shippingInfo.phone}
            <br />
            <br />
            {order?.shippingAddress.street}
            <br />
            {order?.shippingAddress.city}, {order?.shippingAddress.state}{" "}
            {order?.shippingAddress.zip}
          </Typography>
        </Grid>
      </Grid>
    </SwipeableDrawer>
  )
}

export default OrderDetails
