import chains from '@leagacy/mock/chains';
import currencies from '@leagacy/mock/currencies';
import { SPORT_CODES, CURRENCY_ADDRESSES } from '../constants';

export function adaptBlockchainLeagues(blockchainData) {
  if (!blockchainData || !blockchainData.leagues) {
    return [];
  }

  // Map from blockchain format to frontend format
  return Object.entries(blockchainData.leagues).map(([address, league]) => {
    // Parse numeric values from strings
    const entryFee = parseFloat(league.entryFeeWei) / 1e18; // Convert from wei to ETH
    
    // Map sport IDs to names (you'll need to create this mapping)
    const sportMap = Object.entries(SPORT_CODES).reduce((acc, [name, id]) => {
      acc[id] = name;
      return acc;
    }, {});
    
    // Parse year from timestamp
    const seasonStartDate = new Date(parseInt(league.seasonStartTimestamp) * 1000);
    const seasonEndDate = new Date(parseInt(league.seasonEndTimestamp) * 1000);
    const startYear = seasonStartDate.getFullYear();
    const endYear = seasonEndDate.getFullYear();
    const years = startYear === endYear ? [startYear] : [startYear, endYear];
    
    // Map currency addresses to your currency objects
    const currencyMap = Object.entries(CURRENCY_ADDRESSES).reduce((acc, [address, currencyId]) => {
      acc[address] = currencies[currencyId];
      return acc;
    }, {});

    // Check if user is commissioner
    const userAddress = getCurrentUserAddress(); // You'll need to implement this function
    const isCommish = userAddress.toLowerCase() === league.commissioner.toLowerCase();
    
    // Check if user has paid
    const paid = league.paymentStatus[userAddress] || false;
    
    return {
      id: address, // Use contract address as ID
      name: league.name,
      sport: sportMap[league.sportId] || "Unknown",
      year: years,
      archived: league.archived,
      commish: isCommish,
      fee: entryFee,
      currency: currencyMap[league.currencyAddress] || currencies.ether,
      chain: chains[league.chainId] || chains.base,
      paid: paid,
      maxMembers: parseInt(league.maxMembers),
      members: league.members
    };
  });
}

/**
 * Get current user's Ethereum address
 * @returns {String} User's address
 */
function getCurrentUserAddress() {
  // Get this from your auth context or wallet connection
  // For now return a placeholder
  return "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";
}

/**
 * Convert frontend league format to blockchain format
 * @param {Object} league - Frontend league object
 * @returns {Object} Blockchain format object
 */
export function adaptFrontendToBlockchain(league) {
  // Your conversion logic
}