
import axios from 'axios';

export async function getMPLXPrice(): Promise<number> {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=metaplex&vs_currencies=usd');
    return response.data.metaplex.usd;
  } catch (error) {
    console.error('Error fetching MPLX price:', error);
    return 0.1; // Fallback price if API fails
  }
}
