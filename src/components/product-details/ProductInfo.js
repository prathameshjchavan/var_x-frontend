import {
  Button,
  Chip,
  Grid,
  Typography,
  IconButton,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material"
import Favorite from "../../images/Favorite"
import subscription from "../../images/subscription.svg"
import Rating from "../home/Rating"
import { styled } from "@mui/material/styles"
import Sizes from "../product-list/Sizes"
import Swatches from "../product-list/Swatches"
import QtyButton from "../product-list/QtyButton"
import { getColorIndex, getStockIndex } from "../../utils/productList"
import { UserContext, FeedbackContext } from "../../contexts"
import { setSnackbar, setUser } from "../../contexts/actions"
import React, { useState, useEffect, useMemo, useContext } from "react"
import axios from "axios"

export const getStockDisplay = (stock, variantId) => {
  switch (stock) {
    case undefined:
    case null:
      return "Loading Inventory..."
    case -1:
      return "Error Loading Inventory"
    default:
      const stockIndex = getStockIndex(stock, variantId)
      if (stockIndex === -1) {
        return "Cannot find Stock"
      } else if (stock[stockIndex].attributes.quantity === 0) {
        return "Out of Stock"
      } else {
        return `${stock[stockIndex].attributes.quantity} Currently In Stock`
      }
  }
}

const ProductInfo = ({
  product,
  name,
  description,
  variants,
  selectedVariant,
  setSelectedVariant,
  stock,
  rating,
  setEdit,
}) => {
  const [selectedSize, setSelectedSize] = useState(
    variants[selectedVariant].size
  )
  const [selectedColor, setSelectedColor] = useState(
    variants[selectedVariant].color
  )
  const [loading, setLoading] = useState(false)
  const theme = useTheme()
  const matchesVertical = useMediaQuery("(max-width: 1400px)")
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
  const imageIndex = getColorIndex(
    { node: { variants } },
    variants[selectedVariant],
    selectedColor
  )
  const { user, dispatchUser } = useContext(UserContext)
  const { dispatchFeedback } = useContext(FeedbackContext)

  const sizes = useMemo(
    () =>
      variants
        .reduce(
          (acc, { size }) =>
            size && !acc.includes(size) ? [...acc, size] : acc,
          []
        )
        .sort()
        .reverse(),
    [variants]
  )
  const colors = useMemo(
    () =>
      variants
        .reduce(
          (acc, { size, color, style }) =>
            !acc.includes(color) &&
            size === selectedSize &&
            style === variants[selectedVariant].style
              ? [...acc, color]
              : acc,
          []
        )
        .sort(),
    [selectedSize, selectedVariant, variants]
  )

  const stockDisplay = getStockDisplay(
    stock,
    variants[selectedVariant].strapi_id
  )
  const stockIndex = getStockIndex(stock, variants[selectedVariant].strapi_id)
  const existingFavorite = useMemo(
    () => user?.favorites.find(favorite => favorite.product === product),
    [user, product]
  )

  // sx prop
  const sx = {
    mainContainer: {
      width: matchesVertical ? "100%" : "50%",
      position: "relative",
    },
    background: {
      backgroundColor: theme.palette.secondary.main,
      height: "45rem",
      width: matchesVertical ? "100%" : "35rem",
      [theme.breakpoints.down("sm")]: {
        height: "48rem",
      },
    },
    center: {
      backgroundColor: theme.palette.primary.main,
      height: "35rem",
      width: "45rem",
      position: "absolute",
      [theme.breakpoints.down("xl")]: {
        width: matchesVertical ? "100%" : "40rem",
      },
      [theme.breakpoints.down("sm")]: {
        height: "48rem",
      },
    },
    sectionContainer: {
      height: "calc(100% / 3)",
    },
    detailsContainer: {
      padding: "0.5rem 1rem",
    },
    descriptionContainer: {
      backgroundColor: theme.palette.secondary.main,
      padding: "0.5rem 1rem",
      overflowY: "auto",
    },
    actionsContainer: {
      padding: "0 1rem",
    },
    name: {
      color: "#fff",
    },
    reviewButton: {
      textTransform: "none",
      marginLeft: "-8px",
    },
    chipContainer: {
      marginTop: "1rem",
      [theme.breakpoints.down("sm")]: {
        marginTop: 0,
        marginBottom: "1rem",
      },
    },
    chip: {
      height: "3rem",
      width: "fit-content",
      borderRadius: 50,
      "& .MuiChip-label": {
        fontSize: "2rem",
      },
    },
    stock: {
      color: "#fff",
    },
    icon: { height: "4rem", width: "4rem", margin: "0.5rem 1rem" },
    iconButton: {
      padding: 0,
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  }

  const Icon = styled("img")(() => ({
    height: "4rem",
    width: "4rem",
    margin: "0.5rem 1rem",
  }))

  useEffect(() => {
    if (imageIndex !== -1) {
      setSelectedVariant(imageIndex)
    }
  }, [imageIndex, setSelectedVariant])

  // functions
  const handleSizeChange = newSize => {
    setSelectedSize(newSize)
    setSelectedVariant(selectedVariant => {
      const newSelectedVariant = variants.findIndex(
        ({ size, style }) =>
          size === newSize && style === variants[selectedVariant].style
      )
      setSelectedColor(variants[newSelectedVariant].color)
      return newSelectedVariant
    })
  }

  const handleEdit = () => {
    if (user.name === "Guest") {
      dispatchFeedback(
        setSnackbar({
          status: "error",
          message: "You must be logged in to leave a review.",
        })
      )
      return
    }

    setEdit(true)
    const reviewsRef = document.getElementById("reviews")
    reviewsRef.scrollIntoView({ behavior: "smooth" })
  }

  const handleFavorite = () => {
    if (user.name === "Guest") {
      dispatchFeedback(
        setSnackbar({
          status: "error",
          message: "You must be logged in to add an item to favorites.",
        })
      )
      return
    }

    setLoading(true)

    const axiosFunction = existingFavorite ? axios.delete : axios.post
    const route = existingFavorite
      ? `/api/favorites/${existingFavorite.id}`
      : "/api/favorites"
    const auth = { Authorization: `Bearer ${user.jwt}` }

    axiosFunction(
      `${process.env.STRAPI_API_URL}${route}`,
      {
        product,
        headers: existingFavorite ? auth : undefined,
      },
      { headers: auth }
    )
      .then(response => {
        let newFavorites = [...user.favorites]

        if (existingFavorite) {
          newFavorites = newFavorites.filter(
            favorite => favorite.id !== existingFavorite.id
          )
        } else {
          newFavorites.push({
            id: response.data.id,
            product: response.data.product.id,
          })
        }

        dispatchUser(setUser({ ...user, favorites: newFavorites }))

        dispatchFeedback(
          setSnackbar({
            status: "success",
            message: `${existingFavorite ? "Deleted" : "Added"} Product ${
              existingFavorite ? "From" : "To"
            } Favorites`,
          })
        )
      })
      .catch(error => {
        console.error(error)
        dispatchFeedback(
          setSnackbar({
            status: "error",
            message: `There was a problem ${
              existingFavorite ? "removing" : "adding"
            } this item ${
              existingFavorite ? "from" : "to"
            } favorites. Please try again.`,
          })
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Grid
      item
      container
      sx={sx.mainContainer}
      direction="column"
      justifyContent="center"
      alignItems="flex-end"
    >
      <Grid item container sx={sx.background} justifyContent="flex-end">
        <Grid item>
          {loading ? (
            <CircularProgress size="4rem" />
          ) : (
            <IconButton sx={sx.iconButton} onClick={handleFavorite}>
              <Box sx={sx.icon}>
                <Favorite filled={existingFavorite} />
              </Box>
            </IconButton>
          )}
        </Grid>
        <Grid item>
          <Icon src={subscription} alt="add item to subscriptions" />
        </Grid>
      </Grid>
      <Grid item container sx={sx.center} direction="column">
        <Grid
          item
          container
          justifyContent="space-between"
          direction={matchesSM ? "column" : "row"}
          sx={{ ...sx.sectionContainer, ...sx.detailsContainer }}
        >
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h1" sx={sx.name}>
                  {name.split(" ")[0]}
                </Typography>
              </Grid>
              <Grid item>
                <Rating number={rating} />
              </Grid>
              <Grid item>
                <Button onClick={handleEdit}>
                  <Typography variant="body2" sx={sx.reviewButton}>
                    Leave a Review &gt;
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={sx.chipContainer}>
            <Chip
              color="secondary"
              label={`$${variants[selectedVariant].price}`}
              sx={sx.chip}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          sx={{ ...sx.sectionContainer, ...sx.descriptionContainer }}
        >
          <Grid item>
            <Typography variant="h5">Description</Typography>
            <Typography variant="body2">{description}</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent={matchesSM ? "space-around" : "space-between"}
          direction={matchesSM ? "column" : "row"}
          alignItems={matchesSM ? "flex-start" : "center"}
          sx={{ ...sx.sectionContainer, ...sx.actionsContainer }}
        >
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Sizes
                  sizes={sizes}
                  selectedSize={selectedSize}
                  handleSizeChange={handleSizeChange}
                />
                <Swatches
                  colors={colors}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
              </Grid>
              <Grid item>
                <Typography variant="h3" sx={sx.stock}>
                  {stockDisplay}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {stock && (
              <QtyButton
                variant={variants[selectedVariant]}
                stock={stock[stockIndex]}
                name={name}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProductInfo
