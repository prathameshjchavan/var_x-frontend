import React, { useCallback, useContext, useEffect, useState } from "react"
import axios from "axios"
import { UserContext } from "../../contexts"
import { DataGrid } from "@mui/x-data-grid"
import { Grid, Chip, IconButton, useTheme } from "@mui/material"
import { styled } from "@mui/material/styles"
import BackwardsIcon from "../../images/BackwardsOutline"

const OrderHistory = ({ setSelectedSetting }) => {
  const theme = useTheme()
  const [orders, setOrders] = useState([])
  const { user } = useContext(UserContext)

  // sx prop
  const sx = {
    item: {
      height: "100%",
      width: "100%",
    },
    dataGrid: {
      "& .MuiDataGrid-columnHeaderTitle": {
        fontWeight: 600,
        textAlign: "center",
      },
      "& .MuiDataGrid-columnSeparator": {
        display: "none",
      },
      "& .MuiDataGrid-columnHeader": {
        position: "relative",
      },
      "& .MuiDataGrid-columnHeaderTitleContainer": {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        paddingLeft: "27.975px",
      },
      "& .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-iconButtonContainer":
        {
          width: "27.975px",
        },
      "& .MuiDataGrid-menuIcon": {
        marginLeft: "auto",
      },
      "& .MuiDataGrid-columnHeader--moving": {
        backgroundColor: "transparent",
      },
      "& .MuiDataGrid-cell": {
        whiteSpace: "pre-wrap !important",
        maxHeight: "100% !important",
        lineHeight: "initial !important",
        padding: "1rem",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 600,
        borderBottom: "3px solid #fff",
      },
      "& .MuiDataGrid-row": {
        maxHeight: "100% !important",
      },
      "& .MuiDataGrid-footerContainer": {
        marginTop: "-11rem",
        border: "none",
      },
      "& .MuiTablePagination-displayedRows": {
        color: "#fff ",
        fontWeight: 600,
      },
      "& .MuiSvgIcon-root": {
        fill: "#fff",
      },
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: theme.palette.secondary.main,
        border: "none",
      },
      "&.MuiDataGrid-root": {
        border: "none !important",
        borderRadius: 0,
      },
      "& .MuiTablePagination-actions .MuiButtonBase-root .MuiSvgIcon-root": {
        width: "2rem",
        height: "2rem",
      },
      "& .MuiDataGrid-selectedRowCount": {
        fontWeight: 600,
      },
    },
    chip: {
      "& .MuiChip-label": {
        fontWeight: 600,
      },
    },
    header: {
      height: "8rem",
      width: "100%",
      backgroundColor: theme.palette.secondary.main,
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
    { field: "shipping", headerName: "Shipping", sortable: false, flex: 1 },
    { field: "order", headerName: "Order", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ value }) => (
        <Chip label={value} sx={sx.chip} color="secondary" />
      ),
    },
    { field: "date", headerName: "Date", type: "date", flex: 1 },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      renderCell: ({ value }) => (
        <Chip label={`$${value}`} sx={sx.chip} color="secondary" />
      ),
    },
    { field: "", flex: 1.5, disableColumnMenu: true, sortable: false },
  ]
  const rows = createData(orders)

  // styled components
  const Icon = styled("div")(() => ({
    height: "4rem",
    width: "4rem",
  }))

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
      <Grid item sx={sx.header}>
        <IconButton onClick={() => setSelectedSetting(null)}>
          <Icon>
            <BackwardsIcon color="#fff" />
          </Icon>
        </IconButton>
      </Grid>
      <DataGrid sx={sx.dataGrid} columns={columns} rows={rows} pageSize={5} />
    </Grid>
  )
}

export default OrderHistory
