import { Grid, Typography } from "@mui/material"
import React, { useState } from "react"
import { styled } from "@mui/material/styles"
import { useTheme } from "@mui/material/styles"
import frame from "../../images/product-frame-grid.svg"
import QuickView from "./QuickView"

const ProductFrameGrid = ({ product, variant }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const imgURL = process.env.STRAPI_API_URL + variant.images[0].url
  const productName = product.node.name.split(" ")[0]

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
      <Grid container direction="column" onClick={() => setOpen(true)}>
        <Grid item sx={sx.frame}>
          <Product src={imgURL} alt={product.node.name} />
        </Grid>
        <Grid item sx={sx.title}>
          <Typography variant="h5">{}</Typography>
        </Grid>
      </Grid>
      <QuickView
        open={open}
        setOpen={setOpen}
        url={imgURL}
        name={productName}
        price={variant.price}
      />
    </Grid>
  )
}

export default ProductFrameGrid
