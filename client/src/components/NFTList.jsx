import React, { useState, useEffect } from "react";
// import { fetchNFTs } from "../../../server/api";
import axios from 'axios'
import Moralis from 'moralis';
import Select from '../assets/tick.png'
import { useNavigate } from "react-router-dom";

const NFTList = () => {
    const [nfts, setNfts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/form');
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
        const response = await axios.get('http://localhost:5100/fetchNfts', {
            params: {
              // Add any query parameters if needed
            },
          });
  
          // Assuming the response.data is an array of NFTs
          console.log(response.data)
          setNfts(response.data.assets);
        } catch (error) {
          // /console.error('Error fetching NFTs:', error);
          setError('Failed to fetch NFTs');
        }
      };
  
      fetchData();
    }, []);

    
        // const fetchPrice = async ( ) => {
        //     try {
        //         await Moralis.start({
        //           apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImRjNTFhZWI1LTdjMTQtNDQ0OC1hZGQ5LTA5NDM0MmU1NjFlYSIsIm9yZ0lkIjoiMzY3NDgzIiwidXNlcklkIjoiMzc3Njc3IiwidHlwZUlkIjoiMzM5ZjQ0NWQtMTY0Ny00YWFjLTgzMTUtZjM5YmQyNzc5MGZkIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDIwOTY1MDIsImV4cCI6NDg1Nzg1NjUwMn0.2ivuPEmDJR3eFfDKWMYrqMrHfHuegUs_ZCP7LwNtiKo"
        //         });
              
        //         const response = await Moralis.EvmApi.nft.getNFTLowestPrice({
        //           "chain": "0x1",
        //           "marketplace": "opensea",
        //           "address": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
        //         });
              
        //         console.log(response.raw);

        //       } catch (e) {
        //         console.error(e);
        //       }
        // }

        // fetchPrice();
    


  return (
    <div className="flex flex-wrap gap-4 ">
      {nfts.map((nft) => (
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
      ))}
      
    </div>
  );
};

export default NFTList;