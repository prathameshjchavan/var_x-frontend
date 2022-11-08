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
import React, { useEffect, useState } from "react"
import Sizes from "./Sizes"
import Swatches from "./Swatches"

const QuickView = ({ open, setOpen, url, name, price, product }) => {
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])
  const [selectedSize, setSelectedSize] = useState(null)
  const theme = useTheme()

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
      height: "13rem",
      marginTop: "2rem",
      padding: "0.5rem 1rem",
    },
    infoContainer: {
      height: "100%",
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
      display: "flex",
      alignItems: "center",
    },
    chip: {
      transform: "scale(1.5)",
    },
  }

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

  useEffect(() => {
    let productSizes = []
    let productColors = []

    product.node.variants.forEach(({ size, color }) => {
      if (!productSizes.includes(size)) {
        productSizes.push(size)
      }
      if (!productColors.includes(color)) {
        productColors.push(color)
      }
    })
    productSizes.sort()
    productSizes.reverse()
    productColors.sort()

    setSizes(productSizes)
    setColors(productColors)
  }, [product, setSizes, setColors])

  return (
    <Dialog sx={sx.dialog} open={open} onClose={() => setOpen(false)}>
      <DialogContent sx={sx.selectedFrame}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <ProductImage src={url} alt="product" />
          </Grid>
          <Grid item container justifyContent="space-between" sx={sx.toolbar}>
            <Grid item>
              <Grid
                container
                direction="column"
                sx={sx.infoContainer}
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="h4">{name}</Typography>
                  <Rating number={4} />
                </Grid>
                <Grid item>
                  <Typography variant="h3" sx={sx.stock}>
                    12 Currently In Stock
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
              <Chip label={`$${price}`} sx={sx.chip} />
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Sizes
                  sizes={sizes}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                />
                <Swatches colors={colors} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default QuickView
