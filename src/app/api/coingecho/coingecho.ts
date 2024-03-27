import axios from 'axios';

// Define interfaces for API response data
interface TokenPriceResponse {
  [tokenId: string]: { usd: number };
}

interface TransactionDataResponse {
  data: string;
}

// Define base URL for the CoinGecko API
const BASE_URL = 'https://api.coingecko.com/api/v3';

// Cache to store fetched token prices and transaction data
const tokenPriceCache: Record<string, number> = {};
const transactionDataCache: Record<string, string> = {};

// Function to fetch token price from CoinGecko API
export async function fetchTokenPrice(tokenId: string): Promise<number> {
  // Check if token price is cached
  if (tokenId in tokenPriceCache) {
    return tokenPriceCache[tokenId];
  }

  try {
    const response = await axios.get<TokenPriceResponse>(`${BASE_URL}/simple/price?ids=${tokenId}&vs_currencies=usd`);

    // Extract token price from the response
    const price = response.data[tokenId]?.usd;

    if (price === undefined) {
      throw new Error('Token price not found in the response');
    }

    // Cache the fetched token price
    tokenPriceCache[tokenId] = price;

    return price;
  } catch (error) {
    throw new Error(`Error fetching token price: ${error.message}`);
  }
}

// Function to fetch transaction data from CoinGecko API
export async function fetchTransactionData(tokenId: string): Promise<string> {
  // Check if transaction data is cached
  if (tokenId in transactionDataCache) {
    return transactionDataCache[tokenId];
  }

  try {
    const response = await axios.get<TransactionDataResponse>(`${BASE_URL}/simple/token_price/${tokenId}`);

    // Extract transaction data from the response
    const data = response.data.data;

    if (!data) {
      throw new Error('Transaction data not found in the response');
    }

    // Cache the fetched transaction data
    transactionDataCache[tokenId] = data;

    return data;
  } catch (error) {
    throw new Error(`Error fetching transaction data: ${error.message}`);
  }
}
