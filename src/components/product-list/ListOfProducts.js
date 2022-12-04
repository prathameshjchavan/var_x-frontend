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
    const [sizes, setSizes] = useState([])
    const [colors, setColors] = useState([])
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const [stock, setStock] = useState(null)
    const hasStyles = useMemo(
      () => product.node.variants.some(variant => variant.style !== null),
      [product]
    )
    const { error, data } = useQuery(GET_DETAILS, {
      variables: { id: product.node.strapi_id },
    })

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

    useEffect(() => {
      if (error) {
        setStock(-1)
      } else if (data) {
        setStock(data.product.data.attributes.variants.data)
      }
    }, [error, data])

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
        hasStyles={hasStyles}
        stock={stock}
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
