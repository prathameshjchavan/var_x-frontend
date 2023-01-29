import React, { Fragment } from "react"
import fullStar from "../../images/full-star.svg"
import halfStar from "../../images/half-star.svg"
import emptyStar from "../../images/empty-star.svg"
import { styled } from "@mui/material/styles"

const Rating = ({ number, size }) => {
  const diff = 5 - Math.ceil(number)

  const Star = styled("img")(() => ({
    height: `${size || 2}rem`,
    width: `${size || 2}rem`,
  }))

  return (
    <Fragment>
      {[...Array(Math.floor(number))].map((el, i) => (
        <Star key={i} src={fullStar} alt="full star" />
      ))}
      {number % 1 !== 0 && <Star src={halfStar} alt="half start" />}
      {[...Array(diff)].map((el, i) => (
        <Star key={i} src={emptyStar} alt="empty start" />
      ))}
    </Fragment>
  )
}

export default Rating
