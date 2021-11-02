import {Component} from 'react'

import {withRouter} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import {
  CouponsContainer,
  CouponsList,
  CouponListItem,
  CouponName,
  ApplyButton,
} from './StyledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Coupons extends Component {
  state = {total: '', apiStatus: apiStatusConstants.initial, offers: []}

  componentDidMount() {
    this.getCoupons()
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

  renderLoadingView = () => (
    <div className="loading-view-container">
      <Loader type="TailSpin" color="#FFCC00" height="50" width="50" />
    </div>
  )

  getCoupons = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const offersUrl = 'https://ant-stack-node.herokuapp.com/offers/user'
    try {
      const response = await fetch(offersUrl)
      if (response.status === 200) {
        const data = await response.json()
        const formattedData = data.map(offer => ({
          id: offer.id,
          couponCode: offer.coupon_code,
          maxDiscount: offer.max_discount,
          minAmount: offer.min_amount,
        }))
        this.setState({
          offers: formattedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (err) {
      console.log(err)
    }
  }

  applyCoupon = async id => {
    const {offers, total} = this.state
    const couponObject = offers.filter(offer => offer.id === id)
    if (total < couponObject[0].minAmount) {
      this.setState({apiStatus: apiStatusConstants.inProgress})
      const offersUrl = 'https://ant-stack-node.herokuapp.com/offers/user'
      const data = {
        total,
        id,
      }
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
      const response = await fetch(offersUrl, options)
      const amount = await response.json()
      if (response.status === 200) {
        console.log(amount)
      } else {
        alert('try agian')
      }
    } else {
      alert('insufficient cart total')
    }
  }

  renderCouponsList = () => {
    const {offers} = this.state

    return (
      <CouponsList>
        {offers.map(offer => (
          <CouponListItem key={offer.id}>
            <CouponName>{offer.couponCode}</CouponName>
            <ApplyButton
              type="button"
              onClick={() => {
                this.applyCoupon(offer.id)
              }}
            >
              Apply
            </ApplyButton>
          </CouponListItem>
        ))}
      </CouponsList>
    )
  }

  renderApiView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCouponsList()
      case apiStatusConstants.failure:
        return <h1>Data Fetch failed reload</h1>
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <CouponsContainer>{this.renderApiView()}</CouponsContainer>
  }
}
export default withRouter(Coupons)
