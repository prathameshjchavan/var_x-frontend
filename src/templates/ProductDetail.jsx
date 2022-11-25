import { Grid } from "@mui/material"
import React, { useState, useEffect } from "react"
import ProductImages from "../components/product-details/ProductImages"
import ProductInfo from "../components/product-details/ProductInfo"
import Layout from "../components/ui/layout"

const ProductDetail = ({
  pageContext: { id, name, category, description, variants },
}) => {
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const styledVariant = variants.filter(
      variant =>
        variant.style === params.get("style") &&
        variant.colorLabel === params.get("color")
    )[0]

    setSelectedVariant(variants.indexOf(styledVariant))
  }, [variants])

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
      </Grid>
    </Layout>
  )
}

export default ProductDetail
