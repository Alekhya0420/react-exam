import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Product from '../component/product/Product'
import Cart from '../component/cart/Cart'
import Navbar from '../layout/Navbar'

const Routing = () => {
  return (
    <div>
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Product/>}/>
                <Route path='/cart' element={<Cart/>}/>
            </Routes>
        </Router>
    </div>
  )
}

export default Routing