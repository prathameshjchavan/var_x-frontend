import React, { useContext } from "react"
import { UserContext } from "../../contexts"
import { DataGrid } from "@mui/x-data-grid"
import { Grid } from "@mui/material"

const Favorites = () => {
  const { user } = useContext(UserContext)
  const columns = [
    { field: "item", headerName: "Item", width: 250 },
    { field: "variant", headerName: "Variant", width: 275, sortable: false },
    { field: "quantity", headerName: "Quantity", width: 250, sortable: false },
    { field: "price", headerName: "Price", width: 250 },
    { field: "", width: 500, sortable: false },
  ]

  // sx prop
  const sx = {
    container: {
      height: "100%",
      width: "100%",
    },
  }

  return (
    <Grid item container sx={sx.container}>
      <DataGrid
        hideFooterSelectedRowCount
        rows={[]}
        columns={columns}
        pageSize={5}
      />
    </Grid>
  )
}

export default Favorites
