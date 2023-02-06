import React, { useContext, useState, useEffect } from "react"
import { UserContext, FeedbackContext } from "../../contexts"
import { setSnackbar } from "../../contexts/actions"
import { DataGrid } from "@mui/x-data-grid"
import { Grid } from "@mui/material"
import axios from "axios"

const Favorites = () => {
  const { user } = useContext(UserContext)
  const [products, setProducts] = useState([])
  const { dispatchFeedback } = useContext(FeedbackContext)
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

  // useEffects
  useEffect(() => {
    axios
      .get(`${process.env.STRAPI_API_URL}/api/favorites/userFavorites`, {
        headers: { Authorization: `Bearer ${user.jwt}` },
      })
      .then(response => {
        setProducts(response.data)
      })
      .catch(error => {
        console.error(error)

        dispatchFeedback(
          setSnackbar({
            status: "error",
            message:
              "There was a problem getting your favorite products. Please try again.",
          })
        )
      })
  }, [])

  console.log(products)

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
