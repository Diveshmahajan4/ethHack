const fetch = require("node-fetch"); // Import the fetch library

async function getTokenBalances(walletAddress) {
  const endpoint = `https://api.1inch.dev/balance/v1.2/1/balances/${walletAddress}`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: "Bearer EoVAhHv1f701P3UsnBQa80UNBEgReFL9",
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    console.error(
      `Failed to fetch token balances. Error code: ${response.status}`
    );
    return null;
  }
}

async function main() {
  // Replace '0xYourWalletAddress' with the Ethereum wallet address you want to check
  const walletAddress = "0xYourWalletAddress";
  const tokenBalances = await getTokenBalances(walletAddress);

  if (tokenBalances) {
    console.log(`Token balances for wallet address ${walletAddress}:`);
    Object.entries(tokenBalances).forEach(([token, balance]) => {
      console.log(`${token}: ${balance}`);
    });
  } else {
    console.log(
      "Token balance fetch failed. Please check your wallet address."
    );
  }
}

// Execute the main function
main();
