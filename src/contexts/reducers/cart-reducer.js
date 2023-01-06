import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../actions/action-types"

export default function cartReducer(state, action) {
  let newCart = [...state]

  let existingIndex

  if (action.payload) {
    existingIndex = state.findIndex(
      item => item.variant === action.payload.variant
    )
  }

  const saveData = cart => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  switch (action.type) {
    case "ADD_TO_CART":
    case "REMOVE_FROM_CART":
    case "CLEAR_CART":
    default:
      return state
  }
}
