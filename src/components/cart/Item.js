import React, { useCallback, useContext } from "react"
import {
  Grid,
  Typography,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import QtyButton from "../product-list/QtyButton"
import SubscriptionIcon from "../../images/Subscription"
import DeleteIcon from "../../images/Delete"
import { CartContext } from "../../contexts"
import { removeFromCart } from "../../contexts/actions"
import Favorite from "../ui/favorite"

const Item = ({ item }) => {
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
  const { dispatchCart } = useContext(CartContext)

  // sx prop
  const sx = {
    itemContainer: {
      margin: "2rem 0 2rem 2rem",
      [theme.breakpoints.down("xl")]: {
        margin: "2rem 0",
      },
    },
    infoContainer: {
      width: "35rem",
      position: "relative",
      height: "8rem",
      marginLeft: "1rem",
    },
    chipWrapper: {
      position: "absolute",
      top: "3.5rem",
    },
    actionButton: {
      "&:hover": {
        backgroundColor: "transparent",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "8px 6px",
      },
    },
    name: {
      color: theme.palette.secondary.main,
    },
    id: {
      color: theme.palette.secondary.main,
      fontSize: "1rem",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
      },
    },
  }

  // functions
  const handleDelete = useCallback(() => {
    dispatchCart(removeFromCart(item.variant, item.qty))
  }, [dispatchCart, item])

  // actions
  const actions = [
    {
      component: Favorite,
      props: {
        color: theme.palette.secondary.main,
        size: matchesSM ? 2 : 3,
        buttonSx: sx.actionButton,
        variant: item.variant.strapi_id,
      },
    },
    {
      icon: SubscriptionIcon,
      alt: "subscription",
      color: theme.palette.secondary.main,
    },
    {
      icon: DeleteIcon,
      alt: "delete",
      color: theme.palette.error.main,
      size: matchesSM ? "1.75rem" : "2.5rem",
      onClick: handleDelete,
    },
  ]

  // styled components
  const ProductImage = styled("img")(() => ({
    height: "10rem",
    width: "10rem",
  }))

  const ActionWrapper = styled("span")(({ style }) => ({
    height: "3rem",
    width: "3rem",
    marginBottom: "-8px",
    ...style,
    [theme.breakpoints.down("sm")]: {
      height: "2rem",
      width: "2rem",
    },
  }))

  return (
    <Grid item container sx={sx.itemContainer}>
      <Grid item>
        <ProductImage
          src={`${process.env.STRAPI_API_URL}${item.variant.images[0].url}`}
          alt={item.variant.id}
        />
      </Grid>
      <Grid
        item
        container
        direction={matchesSM ? "row" : "column"}
        justifyContent="space-between"
        sx={sx.infoContainer}
      >
        <Grid item container justifyContent="space-between">
          <Grid item>
            <Typography variant="h5" sx={sx.name}>
              {item.name}
            </Typography>
          </Grid>
          <Grid item>
            <QtyButton
              variant={item.variant}
              name={item.name}
              stock={{ attributes: { quantity: item.stock } }}
              isCart
              white
              hideCartButton
            />
          </Grid>
        </Grid>
        <Grid item sx={sx.chipWrapper}>
          <Chip label={`$${item.variant.price}`} color="secondary" />
        </Grid>
        <Grid
          item
          container
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Grid item xs={7} sm={8}>
            <Typography variant="body1" sx={sx.id}>
              ID: {item.variant.id}
            </Typography>
          </Grid>
          <Grid item container justifyContent="flex-end" xs={5} sm={4}>
            {actions.map((action, index) => (
              <Grid item key={index}>
                {action.component ? (
                  <action.component {...action.props} />
                ) : (
                  <IconButton
                    onClick={() => action.onClick && action.onClick()}
                    disableRipple
                    sx={sx.actionButton}
                  >
                    <ActionWrapper
                      style={
                        action.size
                          ? { height: action.size, width: action.size }
                          : undefined
                      }
                    >
                      <action.icon color={action.color} />
                    </ActionWrapper>
                  </IconButton>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Item
