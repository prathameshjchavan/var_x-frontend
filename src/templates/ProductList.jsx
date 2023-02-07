import { Fab, Grid } from "@mui/material"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import { graphql } from "gatsby"
import React, { useState, useEffect, useRef, useCallback } from "react"
import DynamicToolbar from "../components/product-list/DynamicToolbar"
import ListOfProducts from "../components/product-list/ListOfProducts"
import Layout from "../components/ui/layout"
import {
  alphabetic,
  time,
  price,
} from "../components/product-list/sortFunctions"
import Pagination from "../components/styled/Pagination"

const ProductList = ({
  pageContext: { filterOptions: options, name, description },
  data: {
    allStrapiProduct: { edges: products },
  },
}) => {
  const [layout, setLayout] = useState("grid")
  const [page, setPage] = useState(1)
  const [filterOptions, setFilterOptions] = useState(options)
  const [sortOptions, setSortOptions] = useState([
    { label: "A-Z", active: true, function: data => alphabetic(data, "asc") },
    { label: "Z-A", active: false, function: data => alphabetic(data, "desc") },
    { label: "NEWEST", active: false, function: data => time(data, "asc") },
    { label: "OLDEST", active: false, function: data => time(data, "desc") },
    { label: "PRICE ↑", active: false, function: data => price(data, "asc") },
    { label: "PRICE ↓", active: false, function: data => price(data, "desc") },
    { label: "REVIEWS", active: false, function: data => data },
  ])
  const scrollRef = useRef(null)
  const productsPerPage = layout === "grid" ? 16 : 6

  // sx prop
  const sx = {
    fab: {
      alignSelf: "flex-end",
      marginRight: "2rem",
      marginBottom: "2rem",
      color: "#fff",
      width: "5rem",
      height: "5rem",
    },
    fabIcon: {
      width: "4rem",
      height: "4rem",
    },
    pagination: {
      alignSelf: "flex-end",
      marginRight: "2%",
      marginTop: "-3rem",
      marginBottom: "4rem",
      "@media (900px <= width <= 1200px)": {
        marginTop: "1rem",
      },
    },
  }

  const selectedSort = sortOptions.filter(option => option.active)[0]
  const sortedProducts = selectedSort.function(products)
  let content = sortedProducts.reduce(
    (contents, product, index) =>
      contents.concat(
        product.node.variants.map(variant => ({
          productIndex: index,
          variant,
        }))
      ),
    []
  )
  let filters = {}
  let isFiltered = false
  let filteredProducts = content

  // Getting the active filters
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
        }
      })
    })

  // Filtering products
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
  const numPages = Math.ceil(content.length / productsPerPage)

  // functions
  const scroll = useCallback(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    setPage(1)
  }, [filterOptions, layout, setPage])

  return (
    <Layout>
      <Grid container direction="column" alignItems="center">
        {/* Ref for Dynamic Toolbar */}
        <div ref={scrollRef} />
        <DynamicToolbar
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          name={name}
          description={description}
          layout={layout}
          setLayout={setLayout}
          sortOptions={sortOptions}
          setSortOptions={setSortOptions}
        />
        <ListOfProducts
          page={page}
          productsPerPage={productsPerPage}
          products={products}
          content={content}
          layout={layout}
        />
        <Pagination
          sx={sx.pagination}
          count={numPages}
          page={page}
          color="primary"
          onChange={(e, n) => setPage(n)}
        />
        <Fab sx={sx.fab} color="primary" onClick={scroll}>
          <ArrowUpwardIcon sx={sx.fabIcon} />
        </Fab>
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query GetCategoryProducts($id: Int!) {
    allStrapiProduct(filter: { category: { strapi_id: { eq: $id } } }) {
      edges {
        node {
          strapi_id
          createdAt
          name
          category {
            name
          }
          variants {
            strapi_id
            color
            id
            size
            price
            style
            colorLabel
            images {
              url
            }
          }
        }
      }
    }
  }
`

export default ProductList
