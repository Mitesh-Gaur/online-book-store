import React from 'react'
import { baseUrl } from '../resources/api-constants'

// http://localhost:5000/static/image/neeraj_chopra.jpg


export default function FeaturedBooks({ bookList }: any) {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-4 md:px-20 py-8 md:py-24 mx-auto">
        <div className="flex flex-col">
          <div className="flex flex-wrap sm:flex-row flex-col py-6">
            <h1 className="sm:w-2/5 text-white font-medium title-font text-2xl mb-2 sm:mb-0">Featured Books</h1>
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 md:-mb-10 -mt-4">
          {
            bookList?.map((item: any) => {
              return <div key={item.book_id} className="p-4 md:w-1/3 sm:mb-0 mb-6">
                <div className="rounded-lg h-64 overflow-hidden relative">
                  <img alt="content" className="object-cover object-center md:h-full w-full" src={`${baseUrl}static/image/${item?.book_image}`} />
                  <div className='absolute top-0 right-0 h-8 w-20 bg-red-400 rounded-bl-lg flex items-center justify-center'>
                    <span className='text-white font-bold'>₹ {item?.book_price}</span>
                  </div>
                </div>
                <h2 className="text-xl md:h-22 lg:h-16 font-medium title-font text-white mt-5">{item?.book_name}</h2>
                <p className="text-base leading-relaxed mt-2">{item?.book_author}</p>
                <button
                  className="flex items-center me-auto mt-4 text-gray-800 bg-white border-gray-800 py-3 px-6 focus:outline-none rounded font-bold tracking-widest uppercase"
                >
                  Add to cart <span className='ml-2'>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            })
          }
        </div>
      </div>
    </section>
  )
}
