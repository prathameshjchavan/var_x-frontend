import React, { useMemo } from "react"
import { Grid, Typography, Chip, IconButton, useTheme } from "@mui/material"
import { styled } from "@mui/material/styles"
import QtyButton from "../product-list/QtyButton"
import FavoriteIcon from "../../images/Favorite"
import SubscriptionIcon from "../../images/Subscription"
import DeleteIcon from "../../images/Delete"

const Item = ({ item }) => {
  const theme = useTheme()
  const actions = useMemo(
    () => [
      {
        icon: FavoriteIcon,
        alt: "favorite",
        color: theme.palette.secondary.main,
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
        size: "2.5rem",
      },
    ],
    [theme]
  )

  // sx prop
  const sx = {
    name: {
      color: theme.palette.secondary.main,
    },
    id: {
      color: theme.palette.secondary.main,
      fontSize: "1rem",
    },
  }

  // styled components
  const ProductImage = styled("img")(() => ({
    height: "10rem",
    width: "10rem",
  }))

  const ActionWrapper = styled("span")(({ style }) => ({
    height: "3rem",
    width: "3rem",
    ...style,
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
          <Grid item>
            <QtyButton
              variant={item.variant}
              name={item.name}
              stock={{ attributes: { quantity: item.stock } }}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Chip label={`$${item.variant.price}`} color="secondary" />
        </Grid>
        <Grid item container justifyContent="space-between">
          <Grid item>
            <Typography variant="body1" sx={sx.id}>
              ID: {item.variant.id}
            </Typography>
          </Grid>
          <Grid item container>
            {actions.map((action, index) => (
              <Grid item key={index}>
                <IconButton>
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
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Item
