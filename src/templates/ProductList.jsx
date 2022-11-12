import { Fab, Grid, Pagination } from "@mui/material"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import { graphql } from "gatsby"
import React, { useState, useRef, useMemo } from "react"
import DynamicToolbar from "../components/product-list/DynamicToolbar"
import ListOfProducts from "../components/product-list/ListOfProducts"
import Layout from "../components/ui/layout"

const ProductList = ({
  pageContext: { filterOptions, name, description },
  data: {
    allStrapiProduct: { edges: products },
  },
}) => {
  const [layout, setLayout] = useState("grid")
  const [page, setPage] = useState(1)
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
          name={name}
          description={description}
          layout={layout}
          setLayout={setLayout}
        />
        <ListOfProducts
          page={page}
          productsPerPage={productsPerPage}
          products={products}
          layout={layout}
        />
        <Pagination
          count={numPages}
          page={page}
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
