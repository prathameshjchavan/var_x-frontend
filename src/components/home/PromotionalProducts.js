import React, { useState } from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Carousel from "react-spring-3d-carousel"
import { useStaticQuery, graphql } from "gatsby"
import { styled } from "@mui/material/styles"
import promoAdornment from "../../images/promo-adornment.svg"
import explore from "../../images/explore.svg"
import { useTheme, useMediaQuery } from "@mui/material"

const PromotionalProducts = () => {
  const [selectedSlide, setSelectedSlide] = useState(0)
  const theme = useTheme()
  const matchesVertical = useMediaQuery("(max-width: 1290px)")
  const data = useStaticQuery(graphql`
    query GetPromo {
      allStrapiProduct(filter: { promo: { eq: true } }) {
        edges {
          node {
            name
            strapi_id
            description
            variants {
              images {
                url
              }
            }
          }
        }
      }
    }
  `)

  // sx prop
  const sx = {
    mainContainer: {
      backgroundImage: `url(${promoAdornment})`,
      backgroundPosition: "top",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100%",
      height: "70rem",
      padding: "30rem 10rem 10rem 10rem",
      [theme.breakpoints.down("xl")]: {
        padding: "20rem 2rem 2rem 2rem",
      },
    },
    productName: {
      color: "#fff",
    },
    iconButton: {
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    carouselContainer: {
      height: "30rem",
      marginLeft: matchesVertical ? 0 : "20rem",
    },
    space: {
      margin: "0 15rem 10rem 15rem",
      [theme.breakpoints.down("md")]: {
        margin: "0 10rem 10rem 10rem",
      },
    },
    explore: {
      textTransform: "none",
      marginRight: "2rem",
    },
    descriptionContainer: {
      textAlign: matchesVertical ? "center" : "right",
    },
  }

  const CarouselImage = styled("img")(({ theme }) => ({
    height: "30rem",
    width: "25rem",
    backgroundColor: "#fff",
    borderRadius: 20,
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down("md")]: {
      height: "25rem",
      width: "20rem",
    },
    [theme.breakpoints.down("sm")]: {
      height: "20rem",
      width: "15rem",
    },
  }))

  const slides = data.allStrapiProduct.edges.map(({ node }, i) => {
    let iconButtonSx = sx.iconButton
    if (selectedSlide !== i) iconButtonSx = { ...iconButtonSx, ...sx.space }

    return {
      key: i,
      content: (
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <IconButton
              sx={iconButtonSx}
              onClick={() => setSelectedSlide(i)}
              disableRipple
            >
              <CarouselImage
                src={
                  process.env.STRAPI_API_URL + node.variants[0].images[0].url
                }
                alt={`img-${i}`}
              />
            </IconButton>
          </Grid>
          <Grid item>
            {selectedSlide === i ? (
              <Typography variant="h1" sx={sx.productName}>
                {node.name.split("-")[0]}
              </Typography>
            ) : null}
          </Grid>
        </Grid>
      ),
      description: node.description,
    }
  })

  return (
    <Grid
      container
      sx={sx.mainContainer}
      justifyContent={matchesVertical ? "space-around" : "space-between"}
      alignItems="center"
      direction={matchesVertical ? "column" : "row"}
    >
      <Grid item sx={sx.carouselContainer}>
        <Carousel slides={slides} goToSlide={selectedSlide} />
      </Grid>
      <Grid item sx={sx.descriptionContainer}>
        <Typography variant="h2" paragraph>
          {slides[selectedSlide].description}
        </Typography>
        <Button>
          <Typography variant="h4" sx={sx.explore}>
            Explore
          </Typography>
          <img src={explore} alt="go to product page" />
        </Button>
      </Grid>
    </Grid>
  )
}

export default PromotionalProducts
