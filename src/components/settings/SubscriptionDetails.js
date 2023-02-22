import {
  Typography,
  Button,
  Grid,
  Chip,
  SwipeableDrawer,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import React from "react"

const SubscriptionDetails = ({ subscription, open, setOpen }) => {
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)

  // sx prop
  const sx = {
    drawer: {
      "& .MuiPaper-root": {
        height: "100%",
        width: matchesSM ? "100%" : "30rem",
        backgroundColor: "transparent",
      },
    },
    spacer: {
      minHeight: "10rem",
      display: matchesSM ? undefined : "none",
    },
    dark: {
      backgroundColor: theme.palette.secondary.main,
    },
    light: {
      backgroundColor: theme.palette.primary.main,
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
    status: {
      marginLeft: "1rem",
    },
    bold: {
      fontWeight: 600,
    },
    padding: {
      padding: "1rem",
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
  }

  console.log(subscription)

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
            Subscription #{subscription?.id}
          </Typography>
        </Grid>
        <Grid item container sx={sx.dark}>
          <Grid item sx={sx.status}>
            <Chip label={subscription?.status} color="primary" sx={sx.chip} />
          </Grid>
          <Grid item>
            <Typography variant="body2" sx={sx.date}>{`${
              subscription?.createdAt.split("-")[1]
            }/${subscription?.createdAt.split("-")[2].split("T")[0]}/${
              subscription?.createdAt.split("-")[0]
            }`}</Typography>
          </Grid>
        </Grid>
        <Grid item sx={{ ...sx.padding, ...sx.detailContainer }}>
          <Typography variant="body2" sx={{ ...sx.bold }}>
            Billing
          </Typography>
          <Typography variant="body2" sx={sx.text}>
            {subscription?.billingInfo.name}
            <br />
            {subscription?.billingInfo.email}
            <br />
            {subscription?.billingInfo.phone}
            <br />
            <br />
            {subscription?.billingAddress.street}
            <br />
            {subscription?.billingAddress.city},{" "}
            {subscription?.billingAddress.state}{" "}
            {subscription?.billingAddress.zip}
          </Typography>
        </Grid>
        <Grid item sx={{ ...sx.padding, ...sx.dark, ...sx.detailContainer }}>
          <Typography variant="body2" sx={sx.bold}>
            Shipping
          </Typography>
          <Typography variant="body2" sx={sx.text}>
            {subscription?.shippingInfo.name}
            <br />
            {subscription?.shippingInfo.email}
            <br />
            {subscription?.shippingInfo.phone}
            <br />
            <br />
            {subscription?.shippingAddress.street}
            <br />
            {subscription?.shippingAddress.city},{" "}
            {subscription?.shippingAddress.state}{" "}
            {subscription?.shippingAddress.zip}
          </Typography>
        </Grid>
        {/* {prices.map((price, index) => (
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
        </Grid> */}
      </Grid>
    </SwipeableDrawer>
  )
}

export default SubscriptionDetails
