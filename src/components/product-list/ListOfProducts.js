import { Grid } from "@mui/material"
import React, { useState, useEffect, useMemo } from "react"
import ProductFrameGrid from "./ProductFrameGrid"
import ProductFrameList from "./ProductFrameList"

const ListOfProducts = ({ products, layout, page, productsPerPage }) => {
  const content = useMemo(
    () =>
      products.reduce(
        (contents, product, index) =>
          contents.concat(
            product.node.variants.map(variant => ({
              productIndex: index,
              variant,
            }))
          ),
        []
      ),
    [products]
  )

  // helper function : JSX
  const FrameHelper = ({ Frame, product, variant }) => {
    const [sizes, setSizes] = useState([])
    const [colors, setColors] = useState([])
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)

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
      <Frame
        variant={variant}
        product={product}
        sizes={sizes}
        colors={colors}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        setSelectedSize={setSelectedSize}
        setSelectedColor={setSelectedColor}
      />
    )
  }

  // sx prop
  const sx = {
    productsContainer: {
      width: "95%",
      "& > *": {
        marginRight: layout === "grid" ? "calc((100% - (25rem * 4)) / 3)" : 0,
        marginBottom: "5rem !important",
      },
      "& > :nth-of-type(4n)": {
        marginRight: 0,
      },
    },
  }

  return (
    <Grid item container sx={sx.productsContainer}>
      {content
        .slice((page - 1) * productsPerPage, page * productsPerPage)
        .map(({ productIndex, variant }) => (
          <FrameHelper
            key={variant.id}
            Frame={layout === "grid" ? ProductFrameGrid : ProductFrameList}
            variant={variant}
            product={products[productIndex]}
          />
        ))}
    </Grid>
  )
}

export default ListOfProducts
