import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { UserContext } from "../../contexts"
import { DataGrid } from "@mui/x-data-grid"
import { Grid } from "@mui/material"

const OrderHistory = () => {
  const [orders, setOrders] = useState([])
  const { user } = useContext(UserContext)

  // DataGrid data
  const columns = [
    { field: "shipping", headerName: "Shipping", flex: 1 },
    { field: "order", headerName: "Order", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "total", headerName: "Total", flex: 1 },
  ]
  const rows = []

  // sx prop
  const sx = {
    item: {
      height: "100%",
      width: "100%",
    },
  }

  // useEffect
  useEffect(() => {
    axios
      .get(`${process.env.STRAPI_API_URL}/api/orders/history`, {
        headers: { Authorization: `Bearer ${user.jwt}` },
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <Grid item sx={sx.item}>
      <DataGrid columns={columns} rows={rows} pageSize={5} />
    </Grid>
  )
}

export default OrderHistory
