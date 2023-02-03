import { Chip, Grid, Typography, useTheme } from "@mui/material"
import frame from "../../images/product-frame-list.svg"
import { styled } from "@mui/material/styles"
import React, { useMemo } from "react"
import Rating from "../home/Rating"
import Sizes from "./Sizes"
import Swatches from "./Swatches"
import QtyButton from "./QtyButton"
import { getColorIndex, getStockIndex } from "../../utils/productList"
import { Link } from "gatsby"
import { getStockDisplay } from "../product-details/ProductInfo"

function ProductFrameList({
  product,
  variant,
  sizes,
  colors,
  selectedSize,
  selectedColor,
  setSelectedColor,
  hasStyles,
  stock,
  rating,
  handleSizeChange,
}) {
  const theme = useTheme()
  const imageIndex = getColorIndex(product, variant, selectedColor)
  const images =
    imageIndex !== -1
      ? product.node.variants[imageIndex].images
      : variant.images
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
    frame: {
      backgroundImage: `url(${frame})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "28rem",
    },
    info: {
      backgroundColor: theme.palette.primary.main,
      height: "100%",
      width: "100%",
      padding: "1rem",
      [theme.breakpoints.down("lg")]: {
        height: "50%",
      },
      [theme.breakpoints.down("md")]: {
        height: "26rem",
      },
    },
    productInfo: { textDecoration: "none" },
    chip: {
      cursor: "pointer",
      "& .MuiChip-label": {
        fontSize: "2rem",
      },
    },
    sizesAndSwatches: {
      maxWidth: "15rem !important",
    },
    stock: {
      color: "#fff",
    },
  }

  const ProductImage = styled("img")(() => ({
    height: "20rem",
    width: "20rem",
  }))

  return (
    <Grid item container>
      <Grid
        item
        container
        alignItems="center"
        justifyContent="space-around"
        lg={9}
        sx={sx.frame}
      >
        {images.map(image => (
          <Grid key={image.url} item component={Link} to={redirectLink}>
            <ProductImage
              src={process.env.STRAPI_API_URL + image.url}
              alt={image.url}
            />
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        container
        lg={3}
        direction="column"
        justifyContent="space-between"
        sx={sx.info}
      >
        <Grid
          item
          container
          sx={sx.productInfo}
          component={Link}
          to={redirectLink}
          direction="column"
        >
          <Grid item>
            <Typography variant="h4">
              {product.node.name.split(" ")[0]}
            </Typography>
          </Grid>
          <Grid item>
            <Rating number={rating} />
          </Grid>
          <Grid item>
            <Chip sx={sx.chip} label={`$${variant.price}`} color="secondary" />
          </Grid>
          <Grid item>
            <Typography variant="h3" sx={sx.stock}>
              {stockDisplay}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container direction="column" sx={sx.sizesAndSwatches}>
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
        {stock && (
          <QtyButton
            variant={variant}
            stock={stock[stockIndex]}
            name={product.node.name.split(" ")[0]}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default ProductFrameList
