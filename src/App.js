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

const App = () => (
  <Switch>
    <Route exact path="/" component={() => <Home cartList={cartList} />} />
    <Route
      exact
      path="/coupons"
      component={() => <Coupons cartList={cartList} />}
    />
  </Switch>
)

export default App
