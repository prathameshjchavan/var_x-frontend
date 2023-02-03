import React, { useEffect, useState } from "react"
import {
  Grid,
  Typography,
  IconButton,
  Button,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import Rating from "./Rating"
import explore from "../../images/explore.svg"
import frame from "../../images/product-frame-grid.svg"
import { useQuery } from "@apollo/client"
import { GET_DETAILS } from "../../apollo/queries"

const FeaturedProduct = ({ node, index }) => {
  const theme = useTheme()
  const [rating, setRating] = useState(0)
  const [expanded, setExpanded] = useState(null)
  const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))
  const alignment = matchesLG
    ? "center"
    : index % 3 === 0
    ? "flex-start"
    : index % 3 === 1
    ? "center"
    : "flex-end"

  // sx prop
  const sx = {
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
      [theme.breakpoints.down("lg")]: {
        height: "19.8rem",
        width: "20rem",
      },
    },
    slide: {
      backgroundColor: theme.palette.primary.main,
      height: "20rem",
      width: "24.5rem",
      zIndex: 0,
      transition: "transform 0.5s ease",
      padding: "1rem 2rem",
      [theme.breakpoints.down("lg")]: {
        height: "15.2rem",
        width: "19.5rem",
      },
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
    slideDown: {
      transform: "translate(0, 17rem)",
    },
    exploreContainer: {
      marginTop: "auto",
    },
    exploreButton: {
      textTransform: "none",
    },
    chip: {
      "& .MuiChip-label": {
        ...theme.typography.h5,
      },
    },
  }

  const slideSx =
    !matchesLG && expanded === index && alignment === "flex-end"
      ? { ...sx.slide, ...sx.slideLeft }
      : !matchesLG &&
        expanded === index &&
        (alignment === "flex-start" || alignment === "center")
      ? { ...sx.slide, ...sx.slideRight }
      : matchesLG && expanded === index
      ? { ...sx.slide, ...sx.slideDown }
      : sx.slide
  const { data } = useQuery(GET_DETAILS, {
    variables: { id: node.strapi_id },
  })

  // styled components
  const Featured = styled("img")(() => ({
    height: "20rem",
    width: "20rem",
    [theme.breakpoints.down("lg")]: {
      height: "15rem",
      width: "15rem",
    },
  }))

  const ExploreIcon = styled("img")(() => ({
    height: "1.5rem",
    marginLeft: "1rem",
  }))

  // useEffects
  useEffect(() => {
    if (data) {
      setRating(data.product.data.attributes.rating)
    }
  }, [data])

  return (
    <Grid
      sx={sx.productContainer}
      item
      container
      justifyContent={alignment}
      alignItems="center"
    >
      <IconButton
        disableRipple
        onClick={() =>
          expanded === index ? setExpanded(null) : setExpanded(index)
        }
        sx={sx.frame}
      >
        <Featured
          src={process.env.STRAPI_API_URL + node.variants[0].images[0].url}
          alt={node.name}
        />
      </IconButton>
      <Grid container sx={slideSx} direction="column">
        <Grid item>
          <Typography variant="h4">{node.name.split("-")[0]}</Typography>
        </Grid>
        <Grid item>
          <Rating number={rating} />
        </Grid>
        <Grid item>
          <Chip
            sx={sx.chip}
            label={`$${node.variants[0].price}`}
            color="secondary"
          />
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
}

export default FeaturedProduct
