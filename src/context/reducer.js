export default function reducer ( state, action ) {
  switch (action.type) {
    case "login" :
      return {...state, user: action.payload, cart: []}
    case "logout" :
      return {...state, user: null, cart: []}
    case "init" :
      return action.payload
    case "ADD_ITEM":
      return {...state ,cart:[...state.cart, action.payload ]}
    case "REMOVE_ITEM":
      return {...state, cart: state.cart.filter(item => item.id !== action.payload.id)}
    default:
      return state
  }
}