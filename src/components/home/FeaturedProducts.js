import React, { useState } from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import { useStaticQuery, graphql } from "gatsby"
import { styled, useTheme } from "@mui/material/styles"
import Rating from "./Rating"
import featuredAdornment from "../../images/featured-adornment.svg"
import frame from "../../images/product-frame-grid.svg"
import explore from "../../images/explore.svg"

const FeaturedProducts = () => {
  const [expanded, setExpanded] = useState(null)
  const theme = useTheme()
  const data = useStaticQuery(graphql`
    query MyQuery {
      allStrapiProduct(filter: { featured: { eq: true } }) {
        edges {
          node {
            strapi_id
            name
            variants {
              price
              images {
                url
              }
            }
          }
        }
      }
    }
  `)

  const sx = {
    mainContainer: {
      backgroundImage: `url(${featuredAdornment})`,
      backgroundPosition: "top",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100%",
      height: "180rem",
      padding: "0 2.5rem",
    },
    frame: {
      backgroundImage: `url(${frame})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      borderRadius: 0,
      height: "24.8rem",
      width: "25rem",
      boxSizing: "border-box",
      boxShadow: theme.shadows[5],
      position: "absolute",
      zIndex: 1,
    },
    slide: {
      backgroundColor: theme.palette.primary.main,
      height: "20rem",
      width: "24.5rem",
      zIndex: 0,
      transition: "transform 0.5s ease",
      padding: "1rem 2rem",
    },
    productContainer: {
      margin: "5rem 0",
    },
    slideLeft: {
      transform: "translate(-24.5rem, 0)",
    },
    slideRight: {
      transform: "translate(24.5rem, 0)",
    },
    exploreContainer: {
      marginTop: "auto",
    },
    exploreButton: {
      textTransform: "none",
    },
    chip: {
      "&.MuiChip-root": {
        backgroundColor: theme.palette.secondary.main,
      },
      "& .MuiChip-label": {
        ...theme.typography.h5,
      },
    },
  }

  const Featured = styled("img")(() => ({
    height: "20rem",
    width: "20rem",
  }))

  const ExploreIcon = styled("img")(() => ({
    height: "1.5rem",
    marginLeft: "1rem",
  }))

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      sx={sx.mainContainer}
    >
      {data.allStrapiProduct.edges.map(({ node }, i) => {
        const alignment =
          i % 3 === 0 ? "flex-start" : i % 3 === 1 ? "center" : "flex-end"
        const slideSx =
          expanded === i && alignment === "flex-end"
            ? { ...sx.slide, ...sx.slideLeft }
            : expanded === i &&
              (alignment === "flex-start" || alignment === "center")
            ? { ...sx.slide, ...sx.slideRight }
            : sx.slide

        return (
          <Grid
            key={node.strapi_id}
            sx={sx.productContainer}
            item
            container
            justifyContent={alignment}
            alignItems="center"
          >
            <IconButton
              onClick={() =>
                expanded === i ? setExpanded(null) : setExpanded(i)
              }
              sx={sx.frame}
            >
              <Featured
                src={
                  process.env.STRAPI_API_URL + node.variants[0].images[0].url
                }
                alt={node.name}
              />
            </IconButton>
            <Grid container sx={slideSx} direction="column">
              <Grid item>
                <Typography variant="h4">{node.name.split("-")[0]}</Typography>
              </Grid>
              <Grid item>
                <Rating number={2.5} />
              </Grid>
              <Grid item>
                <Chip sx={sx.chip} label={`$${node.variants[0].price}`} />
              </Grid>
              <Grid item sx={sx.exploreContainer}>
                <Button sx={sx.exploreButton}>
                  <Typography variant="h5">Details</Typography>
                  <ExploreIcon src={explore} alt="go to product details" />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default FeaturedProducts
