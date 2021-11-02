import {CartListItems, CartItemAttribute} from './StyledComponents'

const CartItems = ({cartItemDetails}) => (
  <CartListItems>
    <CartItemAttribute>{cartItemDetails.name}</CartItemAttribute>
    <CartItemAttribute>{cartItemDetails.quantity}</CartItemAttribute>
    <CartItemAttribute>{cartItemDetails.cost}</CartItemAttribute>
  </CartListItems>
)

export default CartItems
