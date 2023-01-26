import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { UserContext } from "../../contexts"

const OrderHistory = () => {
  const [order, setOrder] = useState([])
  const { user } = useContext(UserContext)
  // sx prop
  const sx = {}

  // useEffect
  useEffect(() => {
    axios
      .get(`${process.env.STRAPI_API_URL}/api/orders/history`, {
        headers: { Authorization: `Bearer ${user.jwt}` },
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return <div>OrderHistory</div>
}

export default OrderHistory
