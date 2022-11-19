import { Grid, useMediaQuery, useTheme } from "@mui/material"
import React, { useState, useEffect, useMemo } from "react"
import ProductFrameGrid from "./ProductFrameGrid"
import ProductFrameList from "./ProductFrameList"

const ListOfProducts = ({
  products,
  filterOptions,
  layout,
  page,
  productsPerPage,
}) => {
  const theme = useTheme()
  const occupy3Items = useMediaQuery(theme.breakpoints.down("xxl"))
  const occupy2Items = useMediaQuery("(width <= 1370px)")
  const occupy1Item = useMediaQuery(theme.breakpoints.down("md"))
  const gridRowItems = occupy1Item ? 1 : occupy2Items ? 2 : occupy3Items ? 3 : 4
  let content = useMemo(
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
  let filters = {}
  let isFiltered = false
  let filteredProducts = []

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

  Object.keys(filterOptions)
    .filter(option => filterOptions[option] !== null)
    .forEach(option => {
      filterOptions[option].forEach(value => {
        if (value.checked) {
          isFiltered = true

          if (filters[option] === undefined) {
            filters[option] = []
          }

          if (!filters[option].includes(value)) {
            filters[option].push(value)
          }

          content.forEach(item => {
            if (option === "Color") {
              if (
                item.variant.colorLabel === value.label &&
                !filteredProducts.includes(item)
              ) {
                filteredProducts.push(item)
              }
            } else if (
              item.variant[option.toLowerCase()] === value.label &&
              !filteredProducts.includes(item)
            ) {
              filteredProducts.push(item)
            }
          })
        }
      })
    })

  Object.keys(filters).forEach(filter => {
    filteredProducts = filteredProducts.filter(item => {
      let valid = false

      filters[filter].some(value => {
        if (filter === "Color") {
          if (item.variant.colorLabel === value.label) {
            valid = true
            return true
          }
        } else if (item.variant[filter.toLowerCase()] === value.label) {
          valid = true
          return true
        }
        return false
      })

      return valid
    })
  })

  if (isFiltered) content = filteredProducts

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
