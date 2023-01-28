import { Grid, Typography, Chip } from "@mui/material"
import { styled } from "@mui/material/styles"
import React from "react"

const OrderDetailItem = ({ item }) => {
  // sx prop
  const sx = {
    itemInfo: {
      textAlign: "right",
      flex: 1,
    },
    container: {
      height: "10rem",
    },
  }

  // styled components
  const ProductImage = styled("img")(() => ({
    height: "8rem",
    width: "8rem",
  }))

  return (
    <Grid
      item
      container
      sx={sx.container}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <ProductImage
          src={`${process.env.STRAPI_API_URL}${item.variant.images[0].url}`}
          alt={item.name}
        />
      </Grid>
      <Grid item sx={sx.itemInfo}>
        <Typography variant="body2">
          {item.name} - x{item.qty}
        </Typography>
        {item.variant.style && (
          <Typography variant="body2">Style: {item.variant.style}</Typography>
        )}
        {item.variant.size && (
          <Typography variant="body2">Size: {item.variant.size}</Typography>
        )}
        <Chip label={`$${item.variant.price}`} color="primary" />
      </Grid>
    </Grid>
  )
}

export default OrderDetailItem
