import React from 'react'
import DashBoard from '../components/DashBoard'
import NFTList from '../components/NFTList'
import Navbar from '../components/Header/Navbar'

const Borrower = () => {
  return (
    <div className="flex flex-wrap gap-4 ml-12">
        <h1 className='m-12 mt-24 text-3xl font-semibold underline'>Your NFTs</h1>
        <div>
            <NFTList/>
        </div>
    </div>
  )
}

export default Borrower