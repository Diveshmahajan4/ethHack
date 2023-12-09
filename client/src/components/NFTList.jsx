import React, { useState, useEffect } from "react";
import axios from 'axios';

const NFTList = ({ address }) => {
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/fetchNfts', {
            params: {
              address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', // or use the actual address
              limit: 50,
              offset: 0,
              chainIds: 1,
            },
            headers: {
              Authorization: 'Bearer EoVAhHv1f701P3UsnBQa80UNBEgReFL9',
            },
          });
  
          // Update the state with the fetched NFTs
          setNfts(response.data);
          console.log(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Axios Error: ', error);
          // Handle error, set an error state, show a message, etc.
        }
      };
  
      fetchData();
  }, [address]);

  return (
    <div className="Nft-list">
      {Object.keys(nfts).map((nft) => (
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