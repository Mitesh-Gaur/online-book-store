import React from 'react'

export default function HeroSection() {
  return (
    <section className="body-font overflow-hidden">
      <div className="container px-4 md:px-20 py-4 pb-10 md:py-24 mx-auto">
        <div className="lg:w-full mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full pr-6 lg:py-6 md:mt-6 lg:mt-0 order-2 lg:order-1">
            <h1 className="text-gray-800 text-5xl title-font font-bold mb-4 leading-tight">The Biggest Online Book Store</h1>
            <ul className='list-disc pl-5 text-xl'>
              <li className='mb-1'>New Books every week</li>
              <li className='mb-1'>Bestsellers</li>
              <li className='mb-1'>Renowned Authors</li>
            </ul>
            <div className="flex">
              <button className="flex me-auto mt-4 text-white bg-gray-800 border-0 py-3 px-6 focus:outline-none hover:bg-gray-700 rounded font-bold tracking-widest uppercase">Check Books</button>
            </div>
          </div>
          <img alt="ecommerce" className="order-1 lg:order-2 lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg" />
        </div>
      </div>
    </section>
  )
}
