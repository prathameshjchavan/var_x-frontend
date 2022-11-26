import { Grid } from "@mui/material"
import React, { useState, useEffect } from "react"
import ProductImages from "../components/product-details/ProductImages"
import ProductInfo from "../components/product-details/ProductInfo"
import RecentlyViewed from "../components/product-details/RecentlyViewed"
import Layout from "../components/ui/layout"

const ProductDetail = ({
  pageContext: { id, name, category, description, product, variants },
}) => {
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)

  // Get product according to style and color
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const styledVariant = variants.filter(
      variant =>
        variant.style === params.get("style") &&
        variant.colorLabel === params.get("color")
    )[0]

    setSelectedVariant(variants.indexOf(styledVariant))
  }, [variants])

  // Handling products in localStorage
  useEffect(() => {
    let recentlyViewed = JSON.parse(
      window.localStorage.getItem("recentlyViewed")
    )

    if (recentlyViewed) {
      if (!recentlyViewed.some(product => product.node.name === name)) {
        if (recentlyViewed.length === 10) recentlyViewed.shift()
        recentlyViewed.push(product)
      } else return
    } else {
      recentlyViewed = [product]
    }

    window.localStorage.setItem(
      "recentlyViewed",
      JSON.stringify(recentlyViewed)
    )
  }, [name, product])

  return (
    <Layout>
      <Grid container direction="column">
        <Grid item container>
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
