import React, { useState, useContext, useMemo } from "react"
import axios from "axios"
import { UserContext, FeedbackContext } from "../../contexts"
import { setSnackbar, setUser } from "../../contexts/actions"
import { IconButton, CircularProgress } from "@mui/material"
import { styled } from "@mui/material/styles"
import FavoriteIcon from "../../images/Favorite"

const Favorite = ({ color, size, product }) => {
  const { user, dispatchUser } = useContext(UserContext)
  const { dispatchFeedback } = useContext(FeedbackContext)
  const [loading, setLoading] = useState(false)
  const existingFavorite = useMemo(
    () => user?.favorites.find(favorite => favorite.product === product),
    [user, product]
  )

  // sx prop
  const sx = {
    iconButton: {
      padding: 0,
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  }

  // functions
  const handleFavorite = () => {
    if (user.name === "Guest") {
      dispatchFeedback(
        setSnackbar({
          status: "error",
          message: "You must be logged in to add an item to favorites.",
        })
      )
      return
    }

    setLoading(true)

    const axiosFunction = existingFavorite ? axios.delete : axios.post
    const route = existingFavorite
      ? `/api/favorites/${existingFavorite.id}`
      : "/api/favorites"
    const auth = { Authorization: `Bearer ${user.jwt}` }

    axiosFunction(
      `${process.env.STRAPI_API_URL}${route}`,
      {
        product,
        headers: existingFavorite ? auth : undefined,
      },
      { headers: auth }
    )
      .then(response => {
        let newFavorites = [...user.favorites]

        if (existingFavorite) {
          newFavorites = newFavorites.filter(
            favorite => favorite.id !== existingFavorite.id
          )
        } else {
          newFavorites.push({
            id: response.data.id,
            product: response.data.product.id,
          })
        }

        dispatchUser(setUser({ ...user, favorites: newFavorites }))

        dispatchFeedback(
          setSnackbar({
            status: "success",
            message: `${existingFavorite ? "Deleted" : "Added"} Product ${
              existingFavorite ? "From" : "To"
            } Favorites`,
          })
        )
      })
      .catch(error => {
        console.error(error)
        dispatchFeedback(
          setSnackbar({
            status: "error",
            message: `There was a problem ${
              existingFavorite ? "removing" : "adding"
            } this item ${
              existingFavorite ? "from" : "to"
            } favorites. Please try again.`,
          })
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // styled components
  const Icon = styled("span")(() => ({
    height: `${size || 2}rem`,
    width: `${size || 2}rem`,
  }))

  return loading ? (
    <CircularProgress size={`${size || 2}rem`} />
  ) : (
    <IconButton sx={sx.iconButton} onClick={handleFavorite}>
      <Icon>
        <FavoriteIcon color={color} filled={existingFavorite} />
      </Icon>
    </IconButton>
  )
}

export default Favorite
