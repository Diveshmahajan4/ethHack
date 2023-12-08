import React from 'react'

const Navbar = () => {
  return (
    <header>
        <nav className='flex justify-between pl-24 pr-24 bg-sky-100 h-16'>
            <div>
                <p className='m-4 p-2 display-flex items-center text-lg text-bold'>NFTs</p>
            </div>
            <div>
                <button type="button" class="mt-4 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ">
                Login
                </button>
            </div>
        </nav>
    </header>
  )
}

export default Navbar