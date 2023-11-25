import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
  return (
    <>
    <header className=" z-50 absolute w-11/12 p-1 top-5 left-1/2 -translate-x-1/2 text-white flex items-center justify-between
         border-indigo-600"
          style={{
            background: ' rgba( 10, 66, 255, 0.5 )',
        backdropFilter: 'blur( 4px )',
        borderRadius: '100px',
        boxShadow: 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba( 10, 60, 255, 0.2 ) 0px 32px 16px',
        fontFamily : 'Poppins'
      }}>
        <div className=" text-2xl p-2">
          <h1 className="">MLOW</h1>
        </div>
        <nav className=" flex gap-5 mr-4">
          <li className=" list-none text-xl border-r-2 pr-3  outline outline-offset-4"><Link to="/">Home</Link></li>
          <li className=" list-none text-xl border-r-2 pr-3"><Link to={'/pricing'}>Pricing</Link></li>
          <li className=" list-none text-xl"><Link to={"/help"}>Help</Link></li>
        </nav>
        <ul>
        <li className=" list-none text-xl bg-purple-500 transition delay-100 hover:bg-pink-400 shadow-purple-500 px-4 rounded-3xl p-3"
        style={{ boxShadow : '0 0 15px 5px rgba(240, 46, 170, 0.3)'}}><a href="#">Connect</a></li>
        </ul>
      </header>

      <div className='w-full h-screen grid place-items-center bg-black'>
          <h1 className=' text-4xl text-white'>Bhai please abhi kuch help nhi kar sakte.</h1>
      </div>
    </>
  )
}
