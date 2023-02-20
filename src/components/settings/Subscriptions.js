import React, { useState, useEffect, useContext } from "react"
import { Grid, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import axios from "axios"
import { UserContext, FeedbackContext } from "../../contexts"
import { setSnackbar } from "../../contexts/actions"
import SettingsGrid from "./SettingsGrid"
import QtyButton from "../product-list/QtyButton"

const Subscriptions = ({ setSelectedSetting }) => {
  const { user } = useContext(UserContext)
  const { dispatchFeedback } = useContext(FeedbackContext)
  const [subscriptions, setSubscriptions] = useState([])

  // sx prop
  const sx = {
    bold: {
      fontWeight: 600,
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

  // data
  const columns = [
    {
      field: "details",
      headerName: "Details",
      width: 350,
      sortable: false,
      renderCell: ({ value }) => (
        <Typography variant="body2" sx={sx.bold}>
          {value.shippingInfo.name}
          <br />
          {value.shippingAddress.street}
          <br />
          {`${value.shippingAddress.city}, ${value.shippingAddress.state} ${value.shippingAddress.zip}`}
        </Typography>
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
    },
    { field: "next_delivery", headerName: "Next Order", width: 250 },
    { field: "total", headerName: "Total", width: 250 },
    { field: "", width: 250, sortable: false },
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
    <SettingsGrid
      setSelectedSetting={setSelectedSetting}
      rows={rows}
      columns={columns}
      rowsPerPage={3}
    />
  )
}

export default Subscriptions
