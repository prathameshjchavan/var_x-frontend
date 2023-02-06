import React, { useContext, useState, useEffect, useCallback } from "react"
import { UserContext, FeedbackContext } from "../../contexts"
import { setSnackbar } from "../../contexts/actions"
import { DataGrid } from "@mui/x-data-grid"
import { Grid, IconButton, Chip, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import axios from "axios"
import Sizes from "../product-list/Sizes"
import Swatches from "../product-list/Swatches"
import QtyButton from "../product-list/QtyButton"
import Delete from "../../images/Delete"

const Favorites = () => {
  const { user } = useContext(UserContext)
  const [products, setProducts] = useState([])
  const { dispatchFeedback } = useContext(FeedbackContext)

  // sx prop
  const sx = {
    container: {
      height: "100%",
      width: "100%",
    },
    name: { color: "#fff" },
    chip: {
      height: "3rem",
      width: "10rem",
      borderRadius: 50,
    },
  }

  // functions
  const createData = useCallback(
    data =>
      data.map(item => ({
        id: item.id,
        item: {
          name: item.variant.product.name.split(" ")[0],
          image: item.variant.images[0].url,
        },
        variant: { all: item.variants, current: item.variant },
        quantity: item.variant.quantity,
        price: item.variant.price,
      })),
    []
  )

  // styled components
  const Image = styled("img")(() => ({
    height: "10rem",
    width: "10rem",
  }))
  const DeleteWrapper = styled("span")(() => ({
    height: "2rem",
    width: "2rem",
  }))

  const columns = [
    {
      field: "item",
      headerName: "Item",
      width: 250,
      renderCell: ({ value }) => (
        <Grid container direction="column">
          <Grid item>
            <Image
              src={`${process.env.STRAPI_API_URL}${value.image}`}
              alt={value.name}
            />
          </Grid>
          <Grid item>
            <Typography variant="h3" sx={sx.name}>
              {value.name}
            </Typography>
          </Grid>
        </Grid>
      ),
    },
    {
      field: "variant",
      headerName: "Variant",
      width: 275,
      sortable: false,
      renderCell: ({ value }) => (
        <Grid container direction="column">
          {value.current.id}
        </Grid>
      ),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 250,
      sortable: false,
      renderCell: ({ value }) => <div>{value}</div>,
    },
    {
      field: "price",
      headerName: "Price",
      width: 250,
      renderCell: ({ value }) => <Chip sx={sx.chip} label={`$${value}`} />,
    },
    {
      field: "",
      width: 500,
      sortable: false,
      renderCell: ({ value }) => (
        <IconButton>
          <DeleteWrapper>
            <Delete color="#fff" />
          </DeleteWrapper>
        </IconButton>
      ),
    },
  ]
  const rows = createData(products)

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

  return (
    <Grid item container sx={sx.container}>
      <DataGrid
        hideFooterSelectedRowCount
        rows={rows}
        columns={columns}
        pageSize={5}
      />
    </Grid>
  )
}

export default Favorites
