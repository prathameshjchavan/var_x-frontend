import { Grid, Typography, useTheme } from "@mui/material"
import { styled } from "@mui/material/styles"
import React from "react"

const Item = ({ item }) => {
  const theme = useTheme()

  // sx prop
  const sx = {
    name: {
      color: theme.palette.secondary.main,
    },
  }

  // styled components
  const ProductImage = styled("img")(() => ({
    height: "10rem",
    width: "10rem",
  }))

  return (
    <Grid item container>
      <Grid item>
        <ProductImage
          src={`${process.env.STRAPI_API_URL}${item.variant.images[0].url}`}
          alt={item.variant.id}
        />
      </Grid>
      <Grid item container direction="column">
        <Grid item container justifyContent="space-between">
          <Grid item>
            <Typography variant="h5" sx={sx.name}>
              {item.name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Item
