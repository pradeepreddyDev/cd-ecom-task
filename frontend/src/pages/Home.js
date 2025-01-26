import React from 'react'
import HeroSection from '../components/HeroSection'
import FeaturedProduct from '../components/FeaturedProduct'

const data = {
  name: 'CG-ECOM Store',
}

const Home = () => {
  return (
    <>
      <HeroSection name={data.name} />
      <FeaturedProduct />
    </>
  )
}

export default Home
