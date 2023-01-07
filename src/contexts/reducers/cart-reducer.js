import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../actions/action-types"

export default function cartReducer(state, action) {
  const { variant, qty, stock } = action.payload
  let newCart = [...state]
  let existingIndex

  if (action.payload) {
    existingIndex = state.findIndex(item => item.variant.id === variant.id)
  }

  const saveData = cart => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  switch (action.type) {
    case ADD_TO_CART:
      if (existingIndex !== -1) {
        let newQty = newCart[existingIndex].qty + qty

        if (newQty > stock) {
          newQty = stock
        }

        newCart[existingIndex] = { ...newCart[existingIndex], qty: newQty }
      } else {
        newCart.push(action.payload)
      }

      saveData(newCart)

      return newCart
    case REMOVE_FROM_CART:
      const newQty = newCart[existingIndex].qty - qty

      if (newQty <= 0) {
        newCart = newCart.filter(item => item.variant.id !== variant.id)
      } else {
        newCart[existingIndex] = { ...newCart[existingIndex], qty: newQty }
      }

      saveData(newCart)

      return newCart
    case CLEAR_CART:
      localStorage.removeItem("cart")

      return []
    default:
      return state
  }
}
