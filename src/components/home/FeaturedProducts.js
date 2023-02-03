import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Grid, useTheme, useMediaQuery } from "@mui/material"
import featuredAdornment from "../../images/featured-adornment.svg"
import FeaturedProduct from "./FeaturedProduct"

const FeaturedProducts = () => {
  const theme = useTheme()
  const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))
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
      [theme.breakpoints.down("lg")]: {
        paddingBottom: "15rem",
        height: "220rem",
        "& > :not(:last-of-type)": {
          marginBottom: "8rem",
        },
      },
    },
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent={matchesLG ? "space-between" : "center"}
      sx={sx.mainContainer}
    >
      {data.allStrapiProduct.edges.map(({ node }, index) => (
        <FeaturedProduct key={node.strapi_id} node={node} index={index} />
      ))}
    </Grid>
  )
}

export default FeaturedProducts
