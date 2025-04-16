import React from 'react'
import HeroSection from './components/HeroSection'
import ProductSlider from './components/t-product'
import ProductSlidertwo from './components/m-products'
import Banner from './components/banner'
import ShopBanner from './components/colage'

const page = () => {
  return (
    <div className='bg-gray-200'>
      <HeroSection />
      <div className='mt-[]'>
      <ProductSlider/>
      <ProductSlidertwo />
      </div>
      <div>
        <Banner />
        <ShopBanner  />
      </div>
    </div>
  )
}

export default page