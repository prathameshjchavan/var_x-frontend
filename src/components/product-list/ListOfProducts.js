import { useQuery } from "@apollo/client"
import { Grid, useMediaQuery, useTheme } from "@mui/material"
import React, { useState, useEffect, useMemo } from "react"
import { GET_DETAILS } from "../../apollo/queries"
import ProductFrameGrid from "./ProductFrameGrid"
import ProductFrameList from "./ProductFrameList"

const ListOfProducts = ({
  products,
  content,
  layout,
  page,
  productsPerPage,
}) => {
  const theme = useTheme()
  const occupy3Items = useMediaQuery(theme.breakpoints.down("xxl"))
  const occupy2Items = useMediaQuery("(width <= 1370px)")
  const occupy1Item = useMediaQuery(theme.breakpoints.down("md"))
  const gridRowItems = occupy1Item ? 1 : occupy2Items ? 2 : occupy3Items ? 3 : 4

  // helper function : JSX
  const FrameHelper = ({ Frame, product, variant }) => {
    const [selectedSize, setSelectedSize] = useState(variant.size)
    const [selectedColor, setSelectedColor] = useState(variant.color)
    const [selectedVariant, setSelectedVariant] = useState(variant)
    const [stock, setStock] = useState(null)
    const hasStyles = useMemo(
      () => product.node.variants.some(variant => variant.style !== null),
      [product]
    )
    const { error, data } = useQuery(GET_DETAILS, {
      variables: { id: product.node.strapi_id },
    })
    const sizes = useMemo(
      () =>
        product.node.variants
          .reduce(
            (acc, { size }) =>
              size && !acc.includes(size) ? [...acc, size] : acc,
            []
          )
          .sort()
          .reverse(),
      [product.node.variants]
    )
    const colors = useMemo(
      () =>
        product.node.variants
          .reduce(
            (acc, { size, color, style }) =>
              !acc.includes(color) &&
              size === selectedSize &&
              style === variant.style
                ? [...acc, color]
                : acc,
            []
          )
          .sort(),
      [selectedSize, variant, product.node.variants]
    )

    // useEffect(() => {
    //   let productSizes = []
    //   let productColors = []

    //   product.node.variants.forEach(({ size, style, color }) => {
    //     if (!productSizes.includes(size)) {
    //       productSizes.push(size)
    //     }
    //     if (
    //       !productColors.includes(color) &&
    //       size === selectedSize &&
    //       style === variant.style
    //     ) {
    //       productColors.push(color)
    //     }
    //   })
    //   productSizes.sort()
    //   productSizes.reverse()
    //   productColors.sort()

    //   setSizes(productSizes)
    //   setColors(productColors)
    // }, [product, setSizes, setColors, selectedSize, variant])

    useEffect(() => {
      if (error) {
        setStock(-1)
      } else if (data) {
        setStock(data.product.data.attributes.variants.data)
      }
    }, [error, data])

    // functions
    const handleSizeChange = newSize => {
      setSelectedSize(newSize)
      setSelectedVariant(selectedVariant => {
        const newSelectedVariant = product.node.variants.find(
          ({ size, style }) =>
            size === newSize && style === selectedVariant.style
        )
        setSelectedColor(newSelectedVariant.color)
        return newSelectedVariant
      })
    }

    return (
      <Frame
        variant={selectedVariant}
        product={product}
        sizes={sizes}
        colors={colors}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        setSelectedSize={setSelectedSize}
        setSelectedColor={setSelectedColor}
        hasStyles={hasStyles}
        stock={stock}
        handleSizeChange={handleSizeChange}
      />
    )
  }

  // sx prop
  const sx = {
    productsContainer: {
      width: "95%",
      "& > *": {
        marginRight:
          layout === "grid"
            ? `calc((100% - (25rem * ${gridRowItems})) / ${gridRowItems - 1})`
            : 0,
        marginBottom: "5rem !important",
      },
      [`& > :nth-of-type(${gridRowItems}n)`]: {
        marginRight: 0,
      },
    },
  }

  return (
    <Grid
      item
      container
      direction={occupy1Item ? "column" : "row"}
      alignItems={occupy1Item ? "center" : undefined}
      sx={sx.productsContainer}
    >
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
