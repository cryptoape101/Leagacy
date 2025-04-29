import { adaptBlockchainLeagues } from '@leagacy/utils/adapters';

// Mock data file that simulates the structure of blockchain data
const mockData = {
  // League registry would return league addresses
  leagueAddresses: [
    "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e", // NFL league
    "0x2E1437F5fE3c72639092B4e2801517c35b4b0909", // NBA league
    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2", // MLB league (archived)
    "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", // E-Sports league (archived)
    "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db"  // NHL league (unpaid)
  ],
  
  // Each league would be its own contract with state variables
  leagues: {
    // NFL league - User is commissioner, has paid
    "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e": {
      name: "Crypto Gridiron",
      sportId: "1", // NFL
      seasonStartTimestamp: "1714521600", // Unix timestamp for 2024-05-01
      seasonEndTimestamp: "1746057600", // 2025-05-01
      archived: false,
      commissioner: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B", // User is commissioner
      entryFeeWei: "100000000000000000", // 0.1 ETH in wei
      currencyAddress: "0x4200000000000000000000000000000000000006", // ETH contract on Base
      chainId: "8453", // Base chain ID
      members: [
        "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B", // User (commissioner)
        "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
        "0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
        "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678",
        "0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC",
        "0x3E5e9111Ae8eB78Fe1CC3bb8915d5D461F3Ef9A9",
        "0x28a8746e75304c0780E011BEd21C72cD78cd535E", 
        "0xACa94ef8bD5ffEE41947b4585a84BdA5a3d3DA6E",
        "0x1dF62f291b2E969fB0849d99D9Ce41e2F137006e",
        "0x610Bb1573d1046FCb8A70BBfB4ecc8F8878c5B67",
        "0x855FA758c77D68a04990E992aA4dcdeF899F654A",
        "0xfA2435Eacf10Ca62ae6787ba2fB044f8733Ee843"
      ],
      maxMembers: "12", // Full league with 12 members
      paymentStatus: { // Mapping of address -> boolean
        "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B": true, // User has paid (commissioner)
        "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB": false,
        "0x617F2E2fD72FD9D5503197092aC168c91465E7f2": true,
        "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678": true,
        "0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC": true,
        "0x3E5e9111Ae8eB78Fe1CC3bb8915d5D461F3Ef9A9": false,
        "0x28a8746e75304c0780E011BEd21C72cD78cd535E": true,
        "0xACa94ef8bD5ffEE41947b4585a84BdA5a3d3DA6E": false,
        "0x1dF62f291b2E969fB0849d99D9Ce41e2F137006e": true,
        "0x610Bb1573d1046FCb8A70BBfB4ecc8F8878c5B67": false,
        "0x855FA758c77D68a04990E992aA4dcdeF899F654A": true,
        "0xfA2435Eacf10Ca62ae6787ba2fB044f8733Ee843": false
      }
    },
    
    // NBA league - User is NOT commissioner, has paid
    "0x2E1437F5fE3c72639092B4e2801517c35b4b0909": {
      name: "Blockchain Ballers",
      sportId: "2", // NBA
      seasonStartTimestamp: "1698796800", // 2023-11-01
      seasonEndTimestamp: "1730332800", // 2024-11-01
      archived: false,
      commissioner: "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", // Not user
      entryFeeWei: "20000000000000000000", // 20 ETH in wei
      currencyAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC contract
      chainId: "8453",
      members: [
        "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B", // User
        "0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
        "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB"
      ],
      maxMembers: "10",
      paymentStatus: {
        "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B": true, // User has paid
        "0x617F2E2fD72FD9D5503197092aC168c91465E7f2": true,
        "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB": false
      }
    },
    
    // MLB league (archived) - User is NOT commissioner, has paid
    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2": {
      name: "Diamond Chain",
      sportId: "3", // MLB
      seasonStartTimestamp: "1648771200", // 2022-04-01
      seasonEndTimestamp: "1680307200", // 2023-04-01
      archived: true, // Archived
      commissioner: "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678",
      entryFeeWei: "20000000000000000000", // 20 ETH in wei
      currencyAddress: "0xd6DF932A45C0f255f85145f286eA0b292B21C90B", // Tether contract
      chainId: "8453",
      members: [
        "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B", // User
        "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678"
      ],
      maxMembers: "14",
      paymentStatus: {
        "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B": true, // User has paid
        "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678": true
      }
    },
    
    // E-Sports league (archived) - User is commissioner, has paid
    "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4": {
      name: "NFT Arena Masters",
      sportId: "5", // E-Sports
      seasonStartTimestamp: "1609459200", // 2021-01-01
      seasonEndTimestamp: "1640995200", // 2021-12-31
      archived: true, // Archived
      commissioner: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B", // User is commissioner
      entryFeeWei: "20000000000000000000", // 20 ETH in wei
      currencyAddress: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", // Custom token
      chainId: "8453",
      members: [
        "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B", // User
        "0x617F2E2fD72FD9D5503197092aC168c91465E7f2"
      ],
      maxMembers: "8",
      paymentStatus: {
        "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B": true, // User has paid
        "0x617F2E2fD72FD9D5503197092aC168c91465E7f2": true
      }
    },
    
    // NHL league - User is commissioner, has NOT paid
    "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db": {
      name: "Crypto Ice Kings",
      sportId: "4", // NHL
      seasonStartTimestamp: "1717200000", // 2024-06-01
      seasonEndTimestamp: "1748736000", // 2025-06-01
      archived: false,
      commissioner: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B", // User is commissioner
      entryFeeWei: "15000000000000000000", // 15 ETH in wei
      currencyAddress: "0x4200000000000000000000000000000000000006", // ETH contract on Base
      chainId: "8453",
      members: [
        "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B", // User
        "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
        "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678"
      ],
      maxMembers: "10",
      paymentStatus: {
        "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B": false, // User has NOT paid
        "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB": true,
        "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678": false
      }
    }
  },
  
  // Events that were emitted (for transaction history)
  events: {
    "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e": [
      {
        eventName: "LeagueCreated",
        timestamp: "1712831242",
        transactionHash: "0x5c27e91a0e207286a912ca812dc6dac39554603b3fde1bb5e4eb29dacd59c9a3",
        creator: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
        fee: "100000000000000000"
      },
      {
        eventName: "MemberJoined",
        timestamp: "1712834842",
        transactionHash: "0x12456a0e207286a912ca812dc6dac39554603b3fde1bb5e4eb29dacd59c9a345",
        member: "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB"
      },
      {
        eventName: "MemberPaid",
        timestamp: "1712835842",
        transactionHash: "0xabc56a0e207286a912ca812dc6dac39554603b3fde1bb5e4eb29dacd59c9a987",
        member: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"
      }
    ],
    "0x2E1437F5fE3c72639092B4e2801517c35b4b0909": [
      {
        eventName: "LeagueCreated",
        timestamp: "1698796900",
        transactionHash: "0x8927e91a0e207286a912ca812dc6dac39554603b3fde1bb5e4eb29dacd59c112",
        creator: "0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
        fee: "20000000000000000000"
      },
      {
        eventName: "MemberJoined",
        timestamp: "1698897000",
        transactionHash: "0x9856a0e207286a912ca812dc6dac39554603b3fde1bb5e4eb29dacd59c9a789",
        member: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"
      },
      {
        eventName: "MemberPaid",
        timestamp: "1698897100",
        transactionHash: "0x3256a0e207286a912ca812dc6dac39554603b3fde1bb5e4eb29dacd59c9a123",
        member: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"
      }
    ],
    "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db": [
      {
        eventName: "LeagueCreated",
        timestamp: "1717200100",
        transactionHash: "0x1117e91a0e207286a912ca812dc6dac39554603b3fde1bb5e4eb29dacd59c333",
        creator: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
        fee: "15000000000000000000"
      }
      // No payment event for the user on this league
    ]
  }
};

export function fetchData() {
  return Promise.resolve({
    ...mockData,
    leagues: adaptBlockchainLeagues(mockData)
  });
}