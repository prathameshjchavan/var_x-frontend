import {
  Button,
  Chip,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import favorite from "../../images/favorite.svg"
import subscription from "../../images/subscription.svg"
import Rating from "../home/Rating"
import { styled } from "@mui/material/styles"
import Sizes from "../product-list/Sizes"
import Swatches from "../product-list/Swatches"
import QtyButton from "../product-list/QtyButton"
import { getColorIndex } from "../../utils/productList"
import React, { useState, useEffect } from "react"

const ProductInfo = ({
  name,
  description,
  variants,
  selectedVariant,
  setSelectedVariant,
}) => {
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const theme = useTheme()
  const matchesVertical = useMediaQuery("(max-width: 1400px)")
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
  const imageIndex = getColorIndex(
    { node: { variants } },
    variants[selectedVariant],
    selectedColor
  )
  const sizes = []
  const colors = []
  variants.forEach(({ size, color }) => {
    if (!sizes.includes(size)) {
      sizes.push(size)
    }

    if (!colors.includes(color)) {
      colors.push(color)
    }
  })
  sizes.sort()
  sizes.reverse()
  colors.sort()

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
    },
    chip: {
      height: "3rem",
      width: "fit-content",
      borderRadius: 50,
      "& .MuiChip-label": {
        fontSize: "2rem",
      },
    },
    sizesAndSwatches: {
      width: "fit-content",
    },
    stock: {
      color: "#fff",
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
          <Icon src={favorite} alt="add item to favorites" />
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
                <Rating number={4.5} />
              </Grid>
              <Grid item>
                <Button>
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
          justifyContent="space-between"
          direction={matchesSM ? "column" : "row"}
          alignItems="center"
          sx={{ ...sx.sectionContainer, ...sx.actionsContainer }}
        >
          <Grid item>
            <Grid container direction="column">
              <Grid item sx={sx.sizesAndSwatches}>
                <Sizes
                  sizes={sizes}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                />
                <Swatches
                  colors={colors}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
              </Grid>
              <Grid item>
                <Typography variant="h3" sx={sx.stock}>
                  12 Currently In Stock
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <QtyButton />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProductInfo
