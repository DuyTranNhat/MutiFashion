import React from 'react'
import Slider from '../../Component/Silder/Slider'
import Feature from './Feature/Feature'
import ProductList from '../../Component/Product/ProductList'

const Home = () => {
  return (
    <div>
      <Slider />
      <Feature />
      <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Common Products</span>
          </h2>
        <ProductList col={3} activePage={true} />
       </div>
    </div>
  )
}

export default Home
