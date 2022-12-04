import { Grid, useMediaQuery } from "@mui/material"
import React, { useState, useEffect, useMemo } from "react"
import ProductImages from "../components/product-details/ProductImages"
import ProductInfo from "../components/product-details/ProductInfo"
import RecentlyViewed from "../components/product-details/RecentlyViewed"
import Layout from "../components/ui/layout"
import { useQuery } from "@apollo/client"
import { GET_DETAILS } from "../apollo/queries"

const ProductDetail = ({
  pageContext: { id, name, category, description, product, variants },
}) => {
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)
  const [stock, setStock] = useState(null)
  const searchParams = window.location.search
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  )
  const matchesVertical = useMediaQuery("(max-width: 1400px)")
  const { error, data } = useQuery(GET_DETAILS, { variables: { id } })

  useEffect(() => {
    // Get product according to style and color

    const styledVariant = variants.filter(
      variant =>
        variant.style === params.get("style") &&
        variant.colorLabel === params.get("color")
    )[0]
    const variantIndex = variants.indexOf(styledVariant)

    setSelectedVariant(variantIndex)

    // Handling products in localStorage
    let recentlyViewed = JSON.parse(
      window.localStorage.getItem("recentlyViewed")
    )

    if (recentlyViewed) {
      if (
        !recentlyViewed.some(
          product =>
            product.node.name === name &&
            product.selectedVariant === variantIndex
        )
      ) {
        if (recentlyViewed.length === 10) recentlyViewed.shift()
        recentlyViewed.push({ ...product, selectedVariant: variantIndex })
      } else return
    } else {
      recentlyViewed = [{ ...product, selectedVariant: variantIndex }]
    }

    window.localStorage.setItem(
      "recentlyViewed",
      JSON.stringify(recentlyViewed)
    )
  }, [variants, name, product, params])

  useEffect(() => {
    if (error) {
      setStock(-1)
    } else if (data) {
      setStock(data.product.data.attributes.variants.data)
    }
  }, [error, data])

  return (
    <Layout>
      <Grid container direction="column">
        <Grid item container direction={matchesVertical ? "column" : "row"}>
          <ProductImages
            images={variants[selectedVariant].images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          <ProductInfo
            name={name}
            description={description}
            variants={variants}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            stock={stock}
          />
        </Grid>
        <RecentlyViewed
          products={JSON.parse(window.localStorage.getItem("recentlyViewed"))}
        />
      </Grid>
    </Layout>
  )
}

export default ProductDetail
