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
import React, {
  useState,
  useMemo,
  useContext,
  Fragment,
  useCallback,
} from "react"
import OrderDetailItem from "./OrderDetailItem"
import editIcon from "../../images/edit.svg"
import Details from "./Details"
import Location from "./Location"
import { UserContext, FeedbackContext } from "../../contexts"
import { setSnackbar, setUser } from "../../contexts/actions"
import Actions from "../cart/Actions"
import axios from "axios"
import validate from "../ui/validate"

const SubscriptionDetails = ({ subscription, open, setOpen }) => {
  const theme = useTheme()
  const { user } = useContext(UserContext)
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
  const { dispatchFeedback } = useContext(FeedbackContext)
  const { dispatchUser } = useContext(UserContext)
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
  const [loading, setLoading] = useState(null)
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
        backgroundColor: theme.palette.secondary.main,
        padding: "2rem",
      },
      "& .MuiDialogContent-root": {
        padding: 0,
      },
    },
    editWrapper: { width: "100%", margin: "1rem 0" },
    editContainer: {
      width: "100%",
      height: "30rem",
      position: "relative",
    },
    dialogContent: {
      padding: 0,
    },
    dialogSpacer: {
      height: "4px",
      width: "100%",
      backgroundColor: "#fff",
    },
    actionButtonContainer: {
      backgroundColor: theme.palette.secondary.main,
      padding: "2rem",
    },
    button: {
      color: "#fff",
      fontSize: "1.25rem",
      fontWeight: "600",
    },
  }

  // functions
  const handleClose = () => {
    setDetailErrors({})
    setLocationErrors({})
    setEdit(null)
  }

  const errorHelper = useCallback(values => {
    const valid = validate(values)

    return Object.keys(valid).some(value => !valid[value])
  }, [])

  const handleAction = (action, type) => {
    if (
      type === "details"
        ? errorHelper(detailValues)
        : errorHelper(locationValues) && action !== "delete"
    ) {
      dispatchFeedback(
        setSnackbar({
          status: "error",
          message: "All fields must be valid before saving",
        })
      )
      return
    }
    setLoading(`${type}-${action}`)
    axios
      .put(
        `${process.env.STRAPI_API_URL}/api/user/settings`,
        {
          details:
            detailChangesMade && action !== "delete" ? detailValues : undefined,
          detailSlot: detailChangesMade ? detailSlot : undefined,
          location:
            locationChangesMade && action !== "delete"
              ? locationValues
              : undefined,
          locationSlot: locationChangesMade ? locationSlot : undefined,
        },
        {
          headers: { Authorization: `Bearer ${user.jwt}` },
        }
      )
      .then(response => {
        dispatchFeedback(
          setSnackbar({
            status: "success",
            message: `Information ${
              action === "delete" ? "Deleted" : "Saved"
            } Successfully`,
          })
        )
        dispatchUser(
          setUser({ ...response.data, jwt: user.jwt, onboarding: true })
        )
        if (action === "delete") {
          if (type === "details") {
            setDetailErrors({})
          } else {
            setLocationErrors({})
          }
        }
      })
      .catch(error => {
        console.error(error)
        dispatchFeedback(
          setSnackbar({
            status: "error",
            message: `There was a problem ${
              action === "delete" ? "deleting" : "saving"
            } your information, please try again.`,
          })
        )
      })
      .finally(() => {
        setLoading(null)
      })
  }

  // styled components
  const EditIcon = styled("img")(() => ({
    height: "1.5rem",
    width: "1.5rem",
  }))

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
      <Dialog open={!!edit} sx={sx.dialog} maxWidth="lg" onClose={handleClose}>
        <DialogTitle variant="h2">Change {edit} details</DialogTitle>
        <DialogContent>
          <Grid container direction="column">
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Grid item sx={sx.editWrapper}>
                  <Grid container justifyContent="center" sx={sx.editContainer}>
                    <Actions
                      loading={loading}
                      handleAction={handleAction}
                      type="details"
                    />
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
                      checkout
                      subscription
                    />
                  </Grid>
                </Grid>
                <Grid item sx={sx.dialogSpacer} />
                <Grid item sx={sx.editWrapper}>
                  <Grid container justifyContent="center" sx={sx.editContainer}>
                    <Actions
                      loading={loading}
                      handleAction={handleAction}
                      type="location"
                    />
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
                      checkout
                      subscription
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  sx={sx.actionButtonContainer}
                  justifyContent="flex-end"
                >
                  <Grid item>
                    <Button sx={sx.button} onClick={handleClose}>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button sx={sx.button} variant="contained">
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default SubscriptionDetails
