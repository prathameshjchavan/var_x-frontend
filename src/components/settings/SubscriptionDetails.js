import {
  Typography,
  Button,
  Grid,
  Chip,
  SwipeableDrawer,
  IconButton,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import React, { useState, useMemo, useContext, Fragment } from "react"
import OrderDetailItem from "./OrderDetailItem"
import editIcon from "../../images/edit.svg"
import Details from "./Details"
import Location from "./Location"
import { UserContext } from "../../contexts"

const SubscriptionDetails = ({ subscription, open, setOpen }) => {
  const theme = useTheme()
  const { user } = useContext(UserContext)
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  const [edit, setEdit] = useState(null)
  const [detailValues, setDetailValues] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [locationValues, setLocationValues] = useState({
    street: "",
    zip: "",
    city: "",
    state: "",
  })
  const [detailSlot, setDetailSlot] = useState(0)
  const [locationSlot, setLocationSlot] = useState(0)
  const [detailErrors, setDetailErrors] = useState({})
  const [locationErrors, setLocationErrors] = useState({})
  const [detailChangesMade, setDetailChangesMade] = useState(false)
  const [locationChangesMade, setLocationChangesMade] = useState(false)
  const details = useMemo(
    () => [
      {
        label: "Frequency",
        string: subscription?.frequency.split("_").join(" "),
      },
      {
        label: "Next Order",
        string: new Date(subscription?.next_delivery).toLocaleDateString(),
      },
      {
        label: "Total",
        value: (subscription?.variant.price * subscription?.quantity).toFixed(
          2
        ),
      },
      {
        label: "Payment Method",
        string: `${subscription?.paymentMethod.brand.toUpperCase()} ${
          subscription?.paymentMethod.last4
        }`,
      },
    ],
    [subscription]
  )
  const item = useMemo(
    () =>
      subscription
        ? {
            name: subscription.name,
            qty: subscription.quantity,
            variant: subscription.variant,
          }
        : null,
    [subscription]
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
      position: "relative",
    },
    text: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.25rem",
      },
    },
    details: {
      padding: "0.5rem 1rem",
    },
    detailValue: {
      maxWidth: "100%",
    },
    edit: {
      position: "absolute",
      top: 0,
      right: 0,
      margin: "1rem",
    },
    dialog: {
      "& .MuiPaper-root": {
        borderRadius: 0,
        backgroundColor: theme.palette.primary.main,
        width: "100%",
      },
      "& .MuiDialogTitle-root": {
        height: "4rem",
      },
    },
  }

  // styled components
  const EditIcon = styled("img")(() => ({
    height: "1.5rem",
    width: "1.5rem",
  }))

  console.log(subscription)

  return (
    <Fragment>
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
            <IconButton onClick={() => setEdit("billing")} sx={sx.edit}>
              <EditIcon src={editIcon} alt="edit" />
            </IconButton>
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
            <IconButton onClick={() => setEdit("shipping")} sx={sx.edit}>
              <EditIcon src={editIcon} alt="edit" />
            </IconButton>
          </Grid>
          {details.map((detail, index) => (
            <Grid
              key={index}
              item
              container
              justifyContent="space-between"
              sx={sx.details}
            >
              <Grid item>
                <Typography variant="body2" sx={sx.bold}>
                  {detail.label}
                </Typography>
              </Grid>
              <Grid item sx={sx.detailValue}>
                <Chip
                  label={detail.string || `$${detail.value}`}
                  color="secondary"
                  sx={sx.bold}
                />
              </Grid>
            </Grid>
          ))}
          {item && (
            <Grid item sx={{ ...sx.dark, ...sx.padding }}>
              <Typography variant="body2" sx={sx.bold} gutterBottom>
                Item
              </Typography>
              <OrderDetailItem item={item} />
            </Grid>
          )}
        </Grid>
      </SwipeableDrawer>
      <Dialog
        open={!!edit}
        sx={sx.dialog}
        maxWidth="lg"
        onClose={() => setEdit(null)}
      >
        <DialogTitle>
          <Typography variant="h2">Edit {edit} details</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" alignItems="center">
            <Grid item container>
              <Details
                user={user}
                values={detailValues}
                setValues={setDetailValues}
                slot={detailSlot}
                setSlot={setDetailSlot}
                errors={detailErrors}
                setErrors={setDetailErrors}
                setChangesMade={setDetailChangesMade}
                edit
              />
            </Grid>
            <Grid item container>
              <Location
                user={user}
                values={locationValues}
                setValues={setLocationValues}
                slot={locationSlot}
                setSlot={setLocationSlot}
                errors={locationErrors}
                setErrors={setLocationErrors}
                setChangesMade={setLocationChangesMade}
                edit
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default SubscriptionDetails
