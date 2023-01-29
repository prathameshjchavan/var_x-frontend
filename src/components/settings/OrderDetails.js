import React, { useMemo } from "react"
import {
  Grid,
  SwipeableDrawer,
  Chip,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import OrderDetailItem from "./OrderDetailItem"

const OrderDetails = ({ orders, open, setOpen }) => {
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  const order = orders.find(order => order.id === open)
  const prices = useMemo(
    () => [
      { label: "Subtotal", value: order?.subtotal },
      { label: "Shipping", value: order?.shippingOption.price },
      { label: "Tax", value: order?.tax },
      { label: "Total", value: order?.total },
      {
        label: "Payment",
        string: `${order?.paymentMethod.brand.toUpperCase()} ${
          order?.paymentMethod.last4
        }`,
      },
      {
        label: "Transaction",
        string: order?.transaction,
      },
    ],
    [order]
  )

  // sx prop
  const sx = {
    drawer: {
      "& .MuiPaper-root": {
        height: "100%",
        width: matchesSM ? "100%" : "30rem",
        backgroundColor: "transparent",
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
    light: {
      backgroundColor: theme.palette.primary.main,
    },
    prices: {
      padding: "0.5rem 1rem",
    },
    detailContainer: {
      width: "100%",
    },
    text: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.25rem",
      },
    },
    priceValue: {
      maxWidth: "100%",
    },
    spacer: {
      minHeight: "10rem",
      display: matchesSM ? undefined : "none",
    },
  }

  return (
    <SwipeableDrawer
      open={!!open}
      onOpen={() => null}
      onClose={() => setOpen(null)}
      sx={sx.drawer}
      anchor={matchesSM ? "bottom" : "right"}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      <Grid
        item
        sx={sx.spacer}
        component={Button}
        disableRipple
        onClick={() => setOpen(null)}
      />
      <Grid container direction="column" sx={sx.light}>
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
        <Grid item sx={{ ...sx.padding, ...sx.detailContainer }}>
          <Typography variant="body2" sx={{ ...sx.bold }}>
            Billing
          </Typography>
          <Typography variant="body2" sx={sx.text}>
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
        <Grid item sx={{ ...sx.padding, ...sx.dark, ...sx.detailContainer }}>
          <Typography variant="body2" sx={sx.bold}>
            Shipping
          </Typography>
          <Typography variant="body2" sx={sx.text}>
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
        {prices.map((price, index) => (
          <Grid
            key={index}
            item
            container
            justifyContent="space-between"
            sx={sx.prices}
          >
            <Grid item>
              <Typography variant="body2" sx={sx.bold}>
                {price.label}
              </Typography>
            </Grid>
            <Grid item sx={sx.priceValue}>
              {price.string ? (
                <Typography variant="body2" sx={sx.text}>
                  {price.string}
                </Typography>
              ) : (
                <Chip
                  label={`$${price.value?.toFixed(2)}`}
                  color="secondary"
                  sx={sx.bold}
                />
              )}
            </Grid>
          </Grid>
        ))}
        <Grid item sx={{ ...sx.dark, ...sx.padding }}>
          <Typography variant="body2" sx={sx.bold} gutterBottom>
            Items
          </Typography>
          {order?.items.map(item => (
            <OrderDetailItem key={item.variant.id} item={item} />
          ))}
        </Grid>
      </Grid>
    </SwipeableDrawer>
  )
}

export default OrderDetails
