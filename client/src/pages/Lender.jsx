import React, { useState } from 'react'
import DashBoard from '../components/DashBoard'
import axios from 'axios';
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

const Lender = () => {

  const [items, setItems] = useState([]);
  const findItems = async () => {
    const response = await axios.get('http://localhost:5000/items');
     setItems(response.data);
  }
  findItems();

  const chain = EvmChain.ETHEREUM;

const address = "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB";

const tokenId = "1";

async function startMoralis() {
  try {
    const start = await Moralis.start({
      apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImRjNTFhZWI1LTdjMTQtNDQ0OC1hZGQ5LTA5NDM0MmU1NjFlYSIsIm9yZ0lkIjoiMzY3NDgzIiwidXNlcklkIjoiMzc3Njc3IiwidHlwZUlkIjoiMzM5ZjQ0NWQtMTY0Ny00YWFjLTgzMTUtZjM5YmQyNzc5MGZkIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDIwOTY1MDIsImV4cCI6NDg1Nzg1NjUwMn0.2ivuPEmDJR3eFfDKWMYrqMrHfHuegUs_ZCP7LwNtiKo",
      // ...and any other configuration
    });
    console.log('Moralis started successfully:', start);
  } catch (error) {
    console.error('Error starting Moralis:', error);
  }
}
startMoralis();


async function getNFTMetadata(address, chain, tokenId) {
  try {
    const response = await Moralis.EvmApi.nft.getNFTMetadata({
      address,
      chain,
      tokenId,
      normalizeMetadata: true,
    });
    console.log('NFT Metadata:', response);
    return response;
  } catch (error) {
    console.error('Error getting NFT metadata:', error);
    throw error; // Re-throw the error to handle it further if needed
  }
}

getNFTMetadata(address, chain, tokenId);

  return (
    <div className='m-12'>
        <h1 className='m-12 text-3xl font-semibold underline'>Available NFTs</h1>
        <div className='bg-sky-200 rounded-sm text-black'>
           <div>
           <div>
                <div className="flex flex-col max-w-sm w-auto h-auto col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-lg border border-slate-200 dark:border-slate-700">
                <div>
                    <img src={nft.image_url} alt={nft.name} className='w-auto h-auto object-cover'/>
                </div>
                <div className="px-5 pt-5 flex flex-col">
                    {/* <header className="flex justify-between items-start mb-2">
                    <img src={Select} width="32" height="32" alt="Icon 01" />
                    </header> */}
                    <div className="text-xs font-semibold text-green-400 dark:text-green-500 uppercase mb-1">{nft.token_id}</div>
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">{nft.name}</h2>
                    <div className="flex flex-col items-start mb-4">
                    <div className="text-lg  text-slate-800 dark:text-slate-100 mr-2">{nft.description}</div>
                    <div className=" flex text-lg pt-3 pb-3 text-slate-800 dark:text-slate-100 mr-2"><p className="text-pink-400">Expected Value : </p></div>
                    <button onClick={handleClick} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Morgage
                    </button>
                    <div className="text-sm font-semibold text-white px-1.5 bg-emerald-500 rounded-full"></div>
                    </div>
                </div>
            </div>
            </div>
           </div>
        </div>
    </div>
  )
}

export default Lender