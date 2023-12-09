import React from 'react'
import DashBoard from '../components/DashBoard'
import NFTList from '../components/NFTList'

const Borrower = () => {
  return (
    <div className='m-12'>
        <h1 className='m-12 text-3xl font-semibold underline'>Your NFTs</h1>
        <div>
            <NFTList/>
        </div>
    </div>
  )
}

export default Borrower