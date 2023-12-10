const fetch = require("node-fetch"); // Import the fetch library

async function getWhitelistedTokenPrices() {
  const url = "https://api.1inch.dev/price/v1.1/1";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer YOUR_API_KEY",
    },
  });

  if (response.ok) {
    const prices = await response.json();
    console.log("Prices for whitelisted tokens:");
    Object.entries(prices).forEach(([tokenAddress, price]) => {
      console.log(`${tokenAddress}: ${price}`);
    });
  } else {
    console.log("Failed to fetch token prices.");
  }
}

async function getRequestedTokenPrices(tokens) {
  const url = "https://api.1inch.dev/price/v1.1/1";

  const payload = {
    tokens: tokens,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer EoVAhHv1f701P3UsnBQa80UNBEgReFL9",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const prices = await response.json();
    console.log("Prices for requested tokens:");
    Object.entries(prices).forEach(([tokenAddress, price]) => {
      console.log(`${tokenAddress}: ${price}`);
    });
  } else {
    console.log("Failed to fetch token prices.");
  }
}

async function getPricesForAddresses(addresses) {
  const url = `https://api.1inch.dev/price/v1.1/1/${addresses.join(",")}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer YOUR_API_KEY",
    },
  });

  if (response.ok) {
    const prices = await response.json();
    console.log("Prices for requested tokens:");
    Object.entries(prices).forEach(([tokenAddress, price]) => {
      console.log(`${tokenAddress}: ${price}`);
    });
  } else {
    console.log("Failed to fetch token prices.");
  }
}

// Test getWhitelistedTokenPrices
getWhitelistedTokenPrices();
// sleep one second because of RPS limit
await new Promise((resolve) => setTimeout(resolve, 1000));

// Test getRequestedTokenPrices
const tokensToRequest = ["0x111111111117dc0aa78b770fa6a738034120c302"];
getRequestedTokenPrices(tokensToRequest);
// sleep one second because of RPS limit
await new Promise((resolve) => setTimeout(resolve, 1000));

// Test getPricesForAddresses
const addressesToFetch = [
  "0x111111111117dc0aa78b770fa6a738034120c302",
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
];
getPricesForAddresses(addressesToFetch);
