import {Component} from 'react'

import {withRouter} from 'react-router-dom'

import CartItems from '../CartItems'

import {
  CartListContainerLarge,
  CartIndexHeading,
  CartIndexContainer,
  CartHorizontalLine,
  OrderTotalContainer,
  CartItemsList,
  ApplyCouponButton,
  CouponButtonContainer,
  CartViewContainer,
  Discount,
} from './StyledComponents'

const indexItemsList = [
  {
    indexId: 'ITEM',
    displayText: 'Item',
  },
  {
    indexId: 'QUANTITY',
    displayText: 'Quantity',
  },
  {
    indexId: 'PRICE',
    displayText: 'Price',
  },
]

class Home extends Component {
  goToCoupons = () => {
    const {history} = this.props
    history.replace('/coupons')
  }

  render() {
    const {cartList, total, discount} = this.props

    return (
      <CartViewContainer>
        <CartListContainerLarge>
          <CartIndexContainer>
            {indexItemsList.map(index => (
              <CartIndexHeading key={index.indexId}>
                {index.displayText}
              </CartIndexHeading>
            ))}
          </CartIndexContainer>
          <CartItemsList>
            {cartList.map(cartItem => (
              <CartItems key={cartItem.id} cartItemDetails={cartItem} />
            ))}
          </CartItemsList>
          <CartHorizontalLine />
          <OrderTotalContainer>
            <CartIndexHeading>Order Total:</CartIndexHeading>
            <CartIndexHeading>{total}</CartIndexHeading>
          </OrderTotalContainer>
          <CouponButtonContainer>
            {discount === 0 ? '' : <Discount>Discount:{discount}</Discount>}
            <ApplyCouponButton type="button" onClick={this.goToCoupons}>
              Apply Coupons
            </ApplyCouponButton>
          </CouponButtonContainer>
        </CartListContainerLarge>
      </CartViewContainer>
    )
  }
}
export default withRouter(Home)
