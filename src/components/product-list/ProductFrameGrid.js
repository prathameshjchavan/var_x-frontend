import { Grid, Typography } from "@mui/material"
import React from "react"
import { styled } from "@mui/material/styles"
import { useTheme } from "@mui/material/styles"
import frame from "../../images/product-frame-grid.svg"

const ProductFrameGrid = ({ product, variant }) => {
  const theme = useTheme()

  // sx prop
  const sx = {
    frame: {
      backgroundImage: `url(${frame})`,
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      height: "25rem",
      width: "25rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      backgroundColor: theme.palette.primary.main,
      height: "5rem",
      width: "25rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "-0.2rem",
    },
  }

  // styled components
  const Product = styled("img")(() => ({
    height: "20rem",
    width: "20rem",
  }))

  return (
    <Grid item>
      <Grid container direction="column">
        <Grid item sx={sx.frame}>
          <Product
            src={process.env.STRAPI_API_URL + variant.images[0].url}
            alt={product.node.name}
          />
        </Grid>
        <Grid item sx={sx.title}>
          <Typography variant="h5">
            {product.node.name.split(" ")[0]}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProductFrameGrid
