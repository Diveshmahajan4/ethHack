import React, { useState, useEffect } from "react";
// import { fetchNFTs } from "../../../server/api";
import axios from 'axios'

const NFTList = ({ address }) => {
    const [nfts, setNfts] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Replace 'YOUR_SERVER_URL' with the actual URL of your server
          const response = await axios.get('http://localhost:5000/fetchNfts', {
            params: {
              // Add any query parameters if needed
            },
          });
  
          // Assuming the response.data is an array of NFTs
          console.log(response.data)
          setNfts(response.data.assets);
        } catch (error) {
          console.error('Error fetching NFTs:', error);
          setError('Failed to fetch NFTs');
        }
      };
  
      fetchData();
    }, []);

  return (
    <div className="Nft-list">
      {nfts.map((nft) => (
        <div key={nft.id}>
          <img src={nft.image_url} alt={nft.name} width="150" />
          <h2>{nft.name}</h2>
          <p>{nft.description}</p>
        </div>
      ))}
    </div>
  );
};

export default NFTList;