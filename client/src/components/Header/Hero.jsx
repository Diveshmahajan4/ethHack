import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col items-center align-center'>
        <h1 className='pt-12 ml-72 mr-72 mt-4 text-4xl text-center text-black font-bold'>
        <p className='text-purple-600'>CryptoCanvas</p> Empowering NFT Owners through On-Chain Collateral Lending
        </h1>
        <h3 className='pt-10 ml-64 mr-64 text-lg text-center font-semibold text-gray-500'>
        Unlock the Value of Your NFT Portfolio, Secure On-Chain Loans with CryptoCanvas, Where Your Digital Assets Become Financial Opportunities.
        </h3>

        <div className='flex justify-center items-center gap-8'>
        <button type="button" class="m-4 mt-10 py-6 p-16 inline-flex items-center gap-x-2 text-xl font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ">
                Borrow
        </button>
        <button type="button" class="m-4 mt-10 py-6 p-16 inline-flex items-center gap-x-2 text-xl font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ">
                Lend
        </button>
        </div>
    </div>
  )
}

export default Hero