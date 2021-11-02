import {Component} from 'react'

import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'

import Coupons from './components/Coupons'

import './App.css'

const cartList = [
  {
    cost: 135,
    quantity: 2,
    id: '1',
    name: 'Veg Salad',
  },
  {
    cost: 150,
    quantity: 1,
    id: '2',
    name: 'Breakfast combo',
  },
  {
    cost: 235,
    quantity: 3,
    id: '3',
    name: 'Biryani',
  },
  {
    cost: 30,
    quantity: 1,
    id: '4',
    name: 'beverage',
  },
]

class App extends Component {
  state = {total: '', discountAmount: 0}

  componentDidMount() {
    this.getTotal()
  }

  getCartItemTotal = (sum, item) => sum + item.cost * item.quantity

  getTotal = () => {
    const cartTotal = cartList.reduce(
      (sum, item) => this.getCartItemTotal(sum, item),
      0,
    )
    this.setState({total: cartTotal})
  }

  updateTotal = amount => {
    this.setState(prevState => ({
      total: prevState.total - amount,
      discountAmount: amount,
    }))
  }

  render() {
    const {total, discountAmount} = this.state
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <Home cartList={cartList} total={total} discount={discountAmount} />
          )}
        />
        <Route
          exact
          path="/coupons"
          component={() => (
            <Coupons
              cartList={cartList}
              total={total}
              updateTotal={this.updateTotal}
            />
          )}
        />
      </Switch>
    )
  }
}
export default App
