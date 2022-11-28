import { Grid, IconButton, useMediaQuery } from "@mui/material"
import { styled } from "@mui/material/styles"
import React from "react"

const ProductImages = ({ images, selectedImage, setSelectedImage }) => {
  const matchesVertical = useMediaQuery("(max-width: 1400px)")
  const matchesImageSm = useMediaQuery("(max-width: 700px)")

  // sx prop
  const sx = {
    mainContainer: {
      width: matchesVertical ? "100%" : "50%",
    },
    selected: {
      height: matchesImageSm ? "30rem" : "40rem",
      width: matchesImageSm ? "30rem" : "40rem",
    },
    small: {
      height: "5rem",
      width: "5rem",
    },
    imageItem: {
      margin: "1rem",
    },
  }

  // styled components
  const ProductImage = styled("img")(() => ({}))

  return (
    <Grid
      item
      container
      sx={sx.mainContainer}
      direction="column"
      alignItems="center"
    >
      <Grid item>
        <ProductImage
          src={process.env.STRAPI_API_URL + images[selectedImage].url}
          sx={sx.selected}
          alt="product_large"
        />
      </Grid>
      <Grid item container justifyContent="center">
        {images.map(({ url }, index) => (
          <Grid key={url} sx={sx.imageItem} item>
            <IconButton onClick={() => setSelectedImage(index)}>
              <ProductImage
                src={process.env.STRAPI_API_URL + url}
                sx={sx.small}
                alt={`product_small_${index}`}
              />
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default ProductImages
