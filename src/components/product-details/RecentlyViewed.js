import { Button, Grid, useTheme, useMediaQuery } from "@mui/material"
import ProductFrameGrid from "../product-list/ProductFrameGrid"
import React, { useCallback, useState } from "react"

const RecentlyViewed = ({ products }) => {
  const theme = useTheme()
  const [firstIndex, setFirstIndex] = useState(0)
  const matchesMD = useMediaQuery("(max-width: 1300px)")
  const matchesSingle = useMediaQuery("(max-width: 800px)")
  const matchesArrowSm = useMediaQuery("(max-width: 500px)")
  const displayNum = matchesSingle ? 1 : matchesMD ? 2 : 4

  // sx prop
  const sx = {
    recentContainer: {
      margin: "10rem 0",
      "& > :not(:last-child)": {
        marginRight: "2rem",
      },
    },
    arrow: {
      minWidth: 0,
      height: matchesArrowSm ? "1rem" : "4rem",
      width: matchesArrowSm ? "1rem" : "4rem",
      fontSize: "4rem",
      color: theme.palette.primary.main,
      borderRadius: 50,
    },
  }

  const handleNavigation = useCallback(
    direction => {
      if (direction === "backward" && firstIndex === 0) return false
      if (
        direction === "forward" &&
        firstIndex + displayNum === products.length
      )
        return false
      setFirstIndex(direction === "forward" ? firstIndex + 1 : firstIndex - 1)
    },
    [products, firstIndex, setFirstIndex, displayNum]
  )

  return products ? (
    <Grid
      item
      container
      justifyContent="center"
      alignItems="center"
      sx={sx.recentContainer}
    >
      <Grid item>
        <Button onClick={() => handleNavigation("backward")} sx={sx.arrow}>
          &lt;
        </Button>
      </Grid>
      {products.slice(firstIndex, firstIndex + displayNum).map(product => {
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
        <Button onClick={() => handleNavigation("forward")} sx={sx.arrow}>
          &gt;
        </Button>
      </Grid>
    </Grid>
  ) : null
}

export default RecentlyViewed
