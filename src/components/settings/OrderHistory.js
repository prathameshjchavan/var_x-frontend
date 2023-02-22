import React, { useCallback, useContext, useEffect, useState } from "react"
import axios from "axios"
import { UserContext } from "../../contexts"
import { Grid, Chip, IconButton } from "@mui/material"
import detailsIcon from "../../images/details.svg"
import OrderDetails from "./OrderDetails"
import SettingsGrid from "../settings/SettingsGrid"

const OrderHistory = ({ setSelectedSetting }) => {
  const [orders, setOrders] = useState([])
  const [open, setOpen] = useState(null)
  const { user } = useContext(UserContext)
  const order = orders.find(order => order.id === open)

  // sx prop
  const sx = {
    item: {
      height: "100%",
      width: "100%",
    },
    chip: {
      "& .MuiChip-label": {
        fontWeight: 600,
      },
    },
  }

  // functions
  const createData = useCallback(
    data =>
      data.map(item => ({
        id: item.id,
        shipping: `${item.shippingInfo.name}\n${item.shippingAddress.street}\n${item.shippingAddress.city}, ${item.shippingAddress.state} ${item.shippingAddress.zip} `,
        order: `#${item.id}`,
        status: item.status,
        date: `${item.createdAt.split("-")[1]}/${
          item.createdAt.split("-")[2].split("T")[0]
        }/${item.createdAt.split("-")[0]}`,
        total: item.total,
      })),
    []
  )

  // DataGrid data
  const columns = [
    { field: "shipping", headerName: "Shipping", sortable: false, width: 400 },
    { field: "order", headerName: "Order", width: 250 },
    {
      field: "status",
      headerName: "Status",
      width: 250,
      renderCell: ({ value }) => (
        <Chip label={value} sx={sx.chip} color="secondary" />
      ),
    },
    { field: "date", headerName: "Date", type: "date", width: 250 },
    {
      field: "total",
      headerName: "Total",
      width: 250,
      renderCell: ({ value }) => (
        <Chip label={`$${value}`} sx={sx.chip} color="secondary" />
      ),
    },
    {
      field: "",
      disableColumnMenu: true,
      sortable: false,
      width: 350,
      renderCell: () => (
        <IconButton>
          <img src={detailsIcon} alt="order details" />
        </IconButton>
      ),
    },
  ]
  const rows = createData(orders)

  // useEffect
  useEffect(() => {
    axios
      .get(`${process.env.STRAPI_API_URL}/api/orders/history`, {
        headers: { Authorization: `Bearer ${user.jwt}` },
      })
      .then(response => {
        setOrders(response.data.data.attributes.orders)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <Grid item container sx={sx.item}>
      <SettingsGrid
        setSelectedSetting={setSelectedSetting}
        setOpen={setOpen}
        rows={rows}
        columns={columns}
      />
      <OrderDetails order={order} open={open} setOpen={setOpen} />
    </Grid>
  )
}

export default OrderHistory
