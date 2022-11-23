import { Grid } from "@mui/material"
import React, { useState } from "react"
import ProductImages from "../components/product-details/ProductImages"
import ProductInfo from "../components/product-details/ProductInfo"
import Layout from "../components/ui/layout"

const ProductDetail = ({
  pageContext: { id, name, category, description, variants },
}) => {
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)

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
