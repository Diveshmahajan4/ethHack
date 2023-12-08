import React from 'react'
import DashBoard from '../components/DashBoard'

const Lender = () => {
  return (
    <div className='m-12'>
        <h1 className='m-12 text-3xl font-semibold underline'>Your NFTs</h1>
        <div>
            <DashBoard/>
        </div>
    </div>
  )
}

export default Lender