import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material"
import { styled, useTheme } from "@mui/material/styles"
import Rating from "../home/Rating"
import frame from "../../images/selected-frame.svg"
import explore from "../../images/explore.svg"
import React, { useMemo } from "react"
import Sizes from "./Sizes"
import Swatches from "./Swatches"
import QtyButton from "./QtyButton"
import { Link } from "gatsby"
import { getStockDisplay } from "../product-details/ProductInfo"
import { getStockIndex } from "../../utils/productList"

const QuickView = ({
  open,
  setOpen,
  url,
  name,
  price,
  product,
  variant,
  sizes,
  colors,
  selectedSize,
  selectedColor,
  setSelectedSize,
  setSelectedColor,
  hasStyles,
  stock,
  rating,
  handleSizeChange,
}) => {
  const theme = useTheme()
  const redirectLink = useMemo(
    () =>
      `/${product.node.category.name.toLowerCase()}/${product.node.name
        .split(" ")[0]
        .toLowerCase()}${`?color=${variant.colorLabel}`}${
        hasStyles ? `&style=${variant.style}` : ""
      }`,
    [product, hasStyles, variant]
  )
  const stockDisplay = getStockDisplay(stock, variant.strapi_id)
  const stockIndex = getStockIndex(stock, variant.strapi_id)

  // sx prop
  const sx = {
    dialog: {
      "& .MuiPaper-root": {
        maxWidth: "100%",
      },
    },
    selectedFrame: {
      backgroundImage: `url(${frame})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "73.5rem",
      height: "60.4rem",
      padding: 0,
    },
    toolbar: {
      backgroundColor: theme.palette.primary.main,
      position: "relative",
      height: "13rem",
      marginTop: "2rem",
      padding: "0.5rem 1rem",
    },
    infoContainer: {
      height: "100%",
      textDecoration: "none",
    },
    stock: {
      color: "#fff",
    },
    detailButton: { padding: 0 },
    details: {
      color: "#fff",
      textTransform: "none",
      fontSize: "1.5rem",
    },
    chipContainer: {
      position: "absolute",
      alignSelf: "center",
      width: "calc(100% - 2rem)",
      textAlign: "center",
    },
    chip: {
      transform: "scale(1.5)",
    },
  }

  // styled components
  const ProductImage = styled("img")(() => ({
    width: "40rem",
    height: "40rem",
    marginTop: "5rem",
  }))

  const ExploreIcon = styled("img")(() => ({
    width: "2rem",
    height: "1.5rem",
    marginLeft: "0.5rem",
  }))

  const Spacer = styled("div")(() => ({
    height: "2.25rem",
  }))

  return (
    <Dialog
      sx={sx.dialog}
      open={open}
      onClose={() => {
        setOpen(false)
        setSelectedColor(null)
      }}
    >
      <DialogContent sx={sx.selectedFrame}>
        <Grid container direction="column" alignItems="center">
          <Grid item component={Link} to={redirectLink}>
            <ProductImage src={url} alt="product" />
          </Grid>
          <Grid item container justifyContent="space-between" sx={sx.toolbar}>
            <Grid item>
              <Grid
                container
                component={Link}
                to={redirectLink}
                direction="column"
                sx={sx.infoContainer}
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="h4">{name}</Typography>
                  <Rating number={rating} />
                </Grid>
                <Grid item>
                  <Typography variant="h3" sx={sx.stock}>
                    {stockDisplay}
                  </Typography>
                  <Button sx={sx.detailButton}>
                    <Typography variant="h3" sx={sx.details}>
                      Details
                    </Typography>
                    <ExploreIcon
                      src={explore}
                      alt="go to product details page"
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={sx.chipContainer}>
              <Chip label={`$${price}`} sx={sx.chip} color="secondary" />
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Sizes
                  sizes={sizes}
                  selectedSize={selectedSize}
                  setSelectedSize={handleSizeChange}
                />
                <Swatches
                  colors={colors}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
                <Spacer />
                {stock && (
                  <QtyButton
                    variant={variant}
                    stock={stock[stockIndex]}
                    name={name}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default QuickView
