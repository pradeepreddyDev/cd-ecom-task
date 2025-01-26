export const CART_ACTIONS = {
  ADD_ITEM_CART: 'add-item-cart',
  REMOVE_ITEM: 'remove-item',
  CLEAR_CART: 'clear-cart',
  INCREASE_AMOUNT: 'increase-amount',
  DECREASE_AMOUNT: 'decrease-amount',
  UPDATE_TOTAL_VALUES: 'update-total-values',
}

function removeCartItem(state, id) {
  return state.filter((item) => item.id !== id)
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case CART_ACTIONS.ADD_ITEM_CART: {
      const { id, color, amount, product } = payload

      const existingItem = state.cartItems.find(
        (item) => item.id === id + color
      )

      if (existingItem) {
        const updatedCart = state.cartItems.map((item) =>
          item.id === id + color
            ? { ...item, amount: Math.min(item.amount + amount, item.max) }
            : item
        )
        return { ...state, cartItems: updatedCart }
      }

      const newItem = {
        id: id + color,
        color,
        amount,
        name: product.name,
        img: product.images?.[0]?.url || '',
        price: product.price,
        max: product.stock,
      }

      return { ...state, cartItems: [...state.cartItems, newItem] }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      return { ...state, cartItems: removeCartItem(state.cartItems, payload) }
    }

    case CART_ACTIONS.CLEAR_CART: {
      return { ...state, cartItems: [] }
    }

    case CART_ACTIONS.INCREASE_AMOUNT: {
      const updatedCart = state.cartItems.map((item) =>
        item.id === payload
          ? { ...item, amount: Math.min(item.amount + 1, item.max) }
          : item
      )
      return { ...state, cartItems: updatedCart }
    }

    case CART_ACTIONS.DECREASE_AMOUNT: {
      const updatedCart = state.cartItems.map((item) =>
        item.id === payload
          ? { ...item, amount: Math.max(item.amount - 1, 1) }
          : item
      )
      return { ...state, cartItems: updatedCart }
    }

    case CART_ACTIONS.UPDATE_TOTAL_VALUES: {
      const { totalPrice, totalItems } = state.cartItems.reduce(
        (acc, cur) => {
          acc.totalItems += cur.amount
          acc.totalPrice += cur.amount * cur.price
          return acc
        },
        { totalPrice: 0, totalItems: 0 }
      )

      return { ...state, totalItems, totalPrice }
    }

    default: {
      return state
    }
  }
}

export default reducer
