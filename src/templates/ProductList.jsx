import { Fab, Grid, Pagination, useTheme } from "@mui/material"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import { graphql } from "gatsby"
import React, { useState, useRef, useMemo } from "react"
import DynamicToolbar from "../components/product-list/DynamicToolbar"
import ListOfProducts from "../components/product-list/ListOfProducts"
import Layout from "../components/ui/layout"

const ProductList = ({
  pageContext: { filterOptions: options, name, description },
  data: {
    allStrapiProduct: { edges: products },
  },
}) => {
  const [layout, setLayout] = useState("grid")
  const [page, setPage] = useState(1)
  const [filterOptions, setFilterOptions] = useState(options)
  const theme = useTheme()
  const scrollRef = useRef(null)
  const productsPerPage = layout === "grid" ? 16 : 6
  const numVariants = useMemo(
    () =>
      products.reduce(
        (count, product) => count + product.node.variants.length,
        0
      ),
    [products]
  )
  const numPages = Math.ceil(numVariants / productsPerPage)

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
      "& .MuiPaginationItem-text": {
        "&:not(.Mui-disabled)": {
          fontFamily: "Montserrat",
          fontSize: "2rem",
        },
        "&:not(.Mui-selected)": {
          color: theme.palette.primary.main,
        },
      },
      "& .Mui-selected": {
        color: "#fff !important",
      },
      "@media (900px <= width <= 1200px)": {
        marginTop: "1rem",
      },
    },
  }

  // functions
  const scroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" })
  }

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
          setPage={setPage}
        />
        <ListOfProducts
          page={page}
          productsPerPage={productsPerPage}
          products={products}
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
          name
          category {
            name
          }
          variants {
            color
            id
            size
            price
            style
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
