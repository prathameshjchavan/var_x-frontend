import { Button, Grid, useTheme } from "@mui/material"
import ProductFrameGrid from "../product-list/ProductFrameGrid"
import React from "react"

const RecentlyViewed = ({ products }) => {
  const theme = useTheme()
  const sx = {
    recentContainer: {
      margin: "10rem 0",
      "& > :not(:last-child)": {
        marginRight: "5rem",
      },
    },
    arrow: {
      minWidth: 0,
      height: "4rem",
      width: "4rem",
      fontSize: "4rem",
      color: theme.palette.primary.main,
      borderRadius: 50,
    },
  }

  return (
    <Grid
      item
      container
      justifyContent="center"
      alignItems="center"
      sx={sx.recentContainer}
    >
      <Grid item>
        <Button sx={sx.arrow}>&lt;</Button>
      </Grid>
      {products?.map(product => {
        const hasStyles = product.node.variants.some(
          variant => variant.style !== null
        )

        return (
          <ProductFrameGrid
            key={product.node.variants[product.selectedVariant].id}
            product={product}
            variant={product.node.variants[product.selectedVariant]}
            disableQuickView
            small
            hasStyles={hasStyles}
          />
        )
      })}
      <Grid item>
        <Button sx={sx.arrow}>&gt;</Button>
      </Grid>
    </Grid>
  )
}

export default RecentlyViewed
