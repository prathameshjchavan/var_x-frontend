import React, { useContext, useState, useEffect, useCallback } from "react"
import { UserContext, FeedbackContext } from "../../contexts"
import { setSnackbar, setUser } from "../../contexts/actions"
import {
  Grid,
  IconButton,
  Chip,
  Typography,
  CircularProgress,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import axios from "axios"
import Sizes from "../product-list/Sizes"
import Swatches from "../product-list/Swatches"
import QtyButton from "../product-list/QtyButton"
import Delete from "../../images/Delete"
import SettingsGrid from "./SettingsGrid"

const Favorites = ({ setSelectedSetting }) => {
  const { user, dispatchUser } = useContext(UserContext)
  const [products, setProducts] = useState([])
  const [selectedVariants, setSelectedVariants] = useState({})
  const [selectedSizes, setSelectedSizes] = useState({})
  const [selectedColors, setSelectedColors] = useState({})
  const [loading, setLoading] = useState(null)
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
      data.map(item => {
        const selectedVariant = selectedVariants[item.id]

        return {
          id: item.id,
          item: {
            name: item.variant.product.name.split(" ")[0],
            image: item.variants[selectedVariant].images[0].url,
          },
          variant: { all: item.variants, current: item.variant },
          quantity: { variants: item.variants, variant: item.variant },
          price: item.variants[selectedVariant].price,
        }
      }),
    [selectedVariants]
  )

  const setSelectedHelper = (selectedFunction, values, value, row) => {
    selectedFunction({ ...values, [row]: value })

    const { variants } = products.find(favorite => favorite.id === row)
    const selectedVariant = selectedVariants[row]
    let newVariant

    if (value.includes("#")) {
      newVariant = variants.find(
        variant =>
          variant.size === selectedSizes[row] &&
          variant.style === variants[selectedVariant].style &&
          variant.color === value
      )
    } else {
      let newColors = []

      variants.forEach(variant => {
        if (
          !newColors.includes(variant.color) &&
          variant.size === value &&
          variants[selectedVariant].style === variant.style
        ) {
          newColors.push(variant.color)
        }
      })

      newVariant = variants.find(
        variant =>
          variant.size === value &&
          variant.style === variants[selectedVariant].style &&
          variant.color === newColors[0]
      )

      setSelectedColors({ ...selectedColors, [row]: newColors[0] })
    }

    setSelectedVariants({
      ...selectedVariants,
      [row]: variants.findIndex(variant => variant.id === newVariant.id),
    })
  }

  const handleDelete = row => {
    setLoading(row)

    axios
      .delete(`${process.env.STRAPI_API_URL}/api/favorites/${row}`, {
        headers: { Authorization: `Bearer ${user.jwt}` },
      })
      .then(repsonse => {
        const newProducts = products.filter(product => product.id !== row)
        const newFavorites = user.favorites.filter(
          favorite => favorite.id !== row
        )

        setProducts(newProducts)
        dispatchUser(setUser({ ...user, favorites: newFavorites }))

        dispatchFeedback(
          setSnackbar({
            status: "success",
            message: "Product Removed From Favorites.",
          })
        )
      })
      .catch(error => {
        console.error(error)

        dispatchFeedback(
          setSnackbar({
            status: "error",
            message:
              "There was a problem removing this product from your favorites. Please try again.",
          })
        )
      })
      .finally(() => {
        setLoading(null)
      })
  }

  // styled components
  const Image = styled("img")(() => ({
    height: "10rem",
    width: "10rem",
  }))
  const DeleteWrapper = styled("span")(() => ({
    height: "2rem",
    width: "2rem",
  }))

  // data
  const columns = [
    {
      field: "item",
      headerName: "Item",
      width: 250,
      renderCell: ({ value }) => (
        <Grid container direction="column" alignItems="center">
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
      renderCell: ({ value, row }) => {
        let sizes = []
        let colors = []

        value.all.forEach(variant => {
          if (variant.size) {
            sizes.push(variant.size)
          }

          if (
            !colors.includes(variant.color) &&
            variant.size === selectedSizes[row.id] &&
            variant.style === value.current.style
          ) {
            colors.push(variant.color)
          }
        })

        sizes = [...new Set(sizes)].sort().reverse()

        return (
          <Grid container direction="column">
            <Sizes
              sizes={sizes}
              selectedSize={selectedSizes[row.id]}
              setSelectedSize={size =>
                setSelectedHelper(setSelectedSizes, selectedSizes, size, row.id)
              }
            />
            <Swatches
              colors={colors}
              selectedColor={selectedColors[row.id]}
              setSelectedColor={color =>
                setSelectedHelper(
                  setSelectedColors,
                  selectedColors,
                  color,
                  row.id
                )
              }
            />
          </Grid>
        )
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 250,
      sortable: false,
      renderCell: ({ value, row }) => {
        const selectedVariant = selectedVariants[row.id]

        return (
          <QtyButton
            variant={value.variants[selectedVariant]}
            stock={{
              attributes: {
                quantity: value.variants[selectedVariant].quantity,
              },
            }}
            name={value.variant.product.name.split(" ")[0]}
          />
        )
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 250,
      renderCell: ({ value }) => (
        <Chip sx={sx.chip} label={`$${value}`} color="secondary" />
      ),
    },
    {
      field: "",
      width: 500,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <IconButton onClick={() => handleDelete(row.id)} disabled={!!loading}>
          {loading === row.id ? (
            <CircularProgress size="2rem" color="secondary" />
          ) : (
            <DeleteWrapper>
              <Delete color="#fff" />
            </DeleteWrapper>
          )}
        </IconButton>
      ),
    },
  ]
  const rows =
    Object.keys(selectedVariants).length > 0 ? createData(products) : []

  // useEffects
  useEffect(() => {
    axios
      .get(`${process.env.STRAPI_API_URL}/api/favorites/userFavorites`, {
        headers: { Authorization: `Bearer ${user.jwt}` },
      })
      .then(response => {
        setProducts(response.data)

        let newVariants = {}
        let newSizes = {}
        let newColors = {}

        response.data.forEach(favorite => {
          const index = favorite.variants.findIndex(
            variant => variant.id === favorite.variant.id
          )
          newVariants = { ...newVariants, [favorite.id]: index }
          newSizes = { ...newSizes, [favorite.id]: favorite.variant.size }
          newColors = { ...newColors, [favorite.id]: favorite.variant.color }
        })

        setSelectedVariants(newVariants)
        setSelectedSizes(newSizes)
        setSelectedColors(newColors)
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
      <SettingsGrid
        setSelectedSetting={setSelectedSetting}
        rows={rows}
        columns={columns}
        rowsPerPage={3}
      />
    </Grid>
  )
}

export default Favorites
