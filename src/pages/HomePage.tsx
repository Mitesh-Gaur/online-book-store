import React, { useEffect, useState } from 'react'
import { FeaturedBooks, HeroSection, Navbar } from '../components'
import { featuredBooksApi } from '../utility/ApiConfigurations'

const HomePage: React.FC = () => {
  const [info, setInfo] = useState<any>([])
  useEffect(()=>{
    getBooks();
  }, [])

  const getBooks = async() => {
    const res = await featuredBooksApi();
    setInfo(res.data)
  }

  return (
    <>
      <Navbar />
      <HeroSection />
      {
        info ? <FeaturedBooks bookList={info} />
        : null
      }
    </>
  )
}

export default HomePage
