import React, { useState } from 'react'

const Navbar = () => {

  const [wallet, setWallet] = useState("");
  const [isLogin, setLogin] = useState(false);

  async function requestAccount(){
    if(window.ethereum){
      console.log("Detected")

      try{
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        setWallet(accounts);
        setLogin(true);

      }catch(error){
        console.log("MetaMask Error" , error)
      }
    }else{
      alert("Meta mask not detected")
    }
  }

  return (
    <header>
        <nav className='flex justify-between pl-24 pr-24 bg-sky-100 h-16'>
            <div>
                <p className='m-4 p-2 display-flex items-center text-2xl font-bold text-purple-700'>CryptoCanvas</p>
            </div>
            <div>
            {isLogin === false ? 
                <button onClick={requestAccount} type="button" class="mt-4 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ">
                Login
                </button>
                :
                <p className='m-4 p-2 display-flex items-center text-m font-bold text-black'>{wallet}</p>}
            </div>
        </nav>
    </header>
  )
}

export default Navbar