import React, { useState, useEffect, useContext } from "react"
import { Chip, Grid, Typography, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import axios from "axios"
import { UserContext, FeedbackContext } from "../../contexts"
import { setSnackbar } from "../../contexts/actions"
import SettingsGrid from "./SettingsGrid"
import QtyButton from "../product-list/QtyButton"
import DeleteIcon from "../../images/Delete"
import pauseIcon from "../../images/pause.svg"
import SubscriptionDetails from "./SubscriptionDetails"

const Subscriptions = ({ setSelectedSetting }) => {
  const { user } = useContext(UserContext)
  const { dispatchFeedback } = useContext(FeedbackContext)
  const [subscriptions, setSubscriptions] = useState([])
  const [open, setOpen] = useState(null)
  const subscription = subscriptions.find(
    subscription => subscription.id === open
  )

  // sx prop
  const sx = {
    item: {
      height: "100%",
      width: "100%",
    },
    bold: {
      fontWeight: 600,
    },
    method: {
      color: "#fff",
      textTransform: "uppercase",
      marginTop: "1rem",
    },
    lineHeight: {
      lineHeight: 1.1,
    },
    chip: {
      "& .MuiChip-label": {
        fontWeight: 600,
      },
    },
    iconButton: {
      "&:hover": {
        background: "transparent",
      },
    },
  }

  // functions
  const createData = data =>
    data.map(
      ({
        id,
        shippingInfo,
        shippingAddress,
        billingInfo,
        billingAddress,
        paymentMethod,
        name,
        variant,
        quantity,
        frequency,
        next_delivery,
      }) => ({
        id,
        details: {
          shippingInfo,
          shippingAddress,
          billingInfo,
          billingAddress,
          paymentMethod,
        },
        item: { name, variant },
        quantity: { quantity, variant, name },
        frequency,
        next_delivery,
        total: (variant.price * quantity * 1.075).toFixed(2),
      })
    )

  // styled components
  const ProductImage = styled("img")(() => ({
    height: "10rem",
    width: "10rem",
  }))

  const DeleteWrapper = styled("span")(() => ({
    height: "3rem",
    width: "2.5rem",
  }))

  const Pause = styled("img")(() => ({
    height: "3rem",
    width: "3rem",
  }))

  // data
  const columns = [
    {
      field: "details",
      headerName: "Details",
      width: 350,
      sortable: false,
      renderCell: ({ value }) => (
        <Grid container direction="column">
          <Grid item>
            <Typography variant="body2" sx={{ ...sx.bold, ...sx.lineHeight }}>
              {value.shippingInfo.name}
              <br />
              {value.shippingAddress.street}
              <br />
              {`${value.shippingAddress.city}, ${value.shippingAddress.state} ${value.shippingAddress.zip}`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3" sx={sx.method}>
              {value.paymentMethod.brand} {value.paymentMethod.last4}
            </Typography>
          </Grid>
        </Grid>
      ),
    },
    {
      field: "item",
      headerName: "Item",
      width: 250,
      sortable: false,
      renderCell: ({ value }) => (
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <ProductImage
              src={`${process.env.STRAPI_API_URL}${value.variant.images[0].url}`}
              alt={value.name}
            />
          </Grid>
          <Grid item>
            <Typography variant="body2" sx={sx.bold}>
              {value.name}
            </Typography>
          </Grid>
        </Grid>
      ),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 250,
      sortable: false,
      renderCell: ({ value }) => (
        <QtyButton
          stock={{ attributes: { quantity: value.variant.quantity } }}
          variant={value.variant}
          name={value.name}
          hideCartButton
          round
          white
        />
      ),
    },
    {
      field: "frequency",
      headerName: "Frequency",
      width: 250,
      sortable: false,
      renderCell: ({ value }) => (
        <Chip
          label={value.split("_").join(" ")}
          color="secondary"
          sx={sx.chip}
        />
      ),
    },
    {
      field: "next_delivery",
      headerName: "Next Order",
      width: 250,
      renderCell: ({ value }) => new Date(value).toLocaleDateString(),
    },
    {
      field: "total",
      headerName: "Total",
      width: 250,
      renderCell: ({ value }) => (
        <Chip
          label={`$${parseInt(value).toFixed(2)}`}
          sx={sx.chip}
          color="secondary"
        />
      ),
    },
    {
      field: "",
      width: 250,
      sortable: false,
      renderCell: () => (
        <Grid container>
          <Grid item>
            <IconButton sx={sx.iconButton}>
              <DeleteWrapper>
                <DeleteIcon />
              </DeleteWrapper>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton sx={sx.iconButton}>
              <Pause src={pauseIcon} alt="pause subscription" />
            </IconButton>
          </Grid>
        </Grid>
      ),
    },
  ]

  const rows = createData(subscriptions)

  // useEffects
  useEffect(() => {
    axios
      .get(`${process.env.STRAPI_API_URL}/api/subscriptions/me`, {
        headers: { Authorization: `Bearer ${user.jwt}` },
      })
      .then(response => {
        setSubscriptions(response.data)
      })
      .catch(error => {
        console.error(error)
        dispatchFeedback(
          setSnackbar({
            status: "error",
            message:
              "There was a problem retrieving your subscriptions. Please try again.",
          })
        )
      })
  }, [])

  return (
    <Grid item container sx={sx.item}>
      <SettingsGrid
        setSelectedSetting={setSelectedSetting}
        setOpen={setOpen}
        rows={rows}
        columns={columns}
        rowsPerPage={3}
      />
      <SubscriptionDetails
        subscription={subscription}
        open={open}
        setOpen={setOpen}
      />
    </Grid>
  )
}

export default Subscriptions
