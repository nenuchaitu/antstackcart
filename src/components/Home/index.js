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
  state = {total: ''}

  componentDidMount() {
    this.getTotal()
  }

  getCartItemTotal = (sum, item) => sum + item.cost * item.quantity

  getTotal = () => {
    const {cartList} = this.props
    const cartTotal = cartList.reduce(
      (sum, item) => this.getCartItemTotal(sum, item),
      0,
    )
    this.setState({total: cartTotal})
  }

  updateTotal = amount => {
    this.setState(prevState => ({total: prevState.total + amount}))
  }

  goToCoupons = () => {
    const {history} = this.props
    history.replace('/coupons')
  }

  render() {
    const {cartList} = this.props
    const {total} = this.state
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
              <CartItems
                key={cartItem.id}
                cartItemDetails={cartItem}
                updateTotal={this.updateTotal}
              />
            ))}
          </CartItemsList>
          <CartHorizontalLine />
          <OrderTotalContainer>
            <CartIndexHeading>Order Total:</CartIndexHeading>
            <CartIndexHeading>{total}</CartIndexHeading>
          </OrderTotalContainer>
          <CouponButtonContainer>
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
