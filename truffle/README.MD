# Leagacy Smart Contract - Fantasy Football Fee Manager DApp

## Overview

The Leagacy smart contract is designed for managing a Fantasy Football League. It facilitates the setting and accepting of fees from league members, locks up the fees, and distributes the payouts at the end of the season.

### Key Features

- Create and manage fantasy football leagues.
- Handle fee deposits from league members.
- Lock leagues and manage payouts according to league rules.

## Development Setup

This project is developed using Truffle, an Ethereum development environment. Ensure that you have Truffle installed to compile and migrate the contracts.

### Prerequisites

- Node.js
- npm
- Truffle (`npm install -g truffle`)
- Ganache (for local blockchain setup)

### Installation

Clone the repository and install the dependencies.

```sh
$ git clone [repository_url]
$ cd [repository_name]/truffle
$ npm install
```

## Smart Contract

All smart contracts are located in the `contracts` directory.

### Leagacy.sol

`Leagacy.sol` is the core of the application.

### LeagacyFactory.sol

Located in the `contracts` directory, `LeagacyFactory.sol` generates multiple instances of `Leagacy.sol`.

### Key Structures and Functions

- `League`: A struct representing a fantasy football league.
- `createLeague(...)`: Sets up a new league.
- `depositFee(...)`: Handles fee deposits.
- `lockLeague(...)`: Locks the league, preventing further modifications.
- `assignPayouts(...)`: Assigns payout amounts to league members.
- `withdrawPayout(...)`: Enables members to withdraw their payouts.

### Compiling and Migrating

Compile and migrate the smart contract using Truffle.

```sh
$ truffle compile
$ truffle migrate
```

## Testing

Tests are located in the test directory. Run tests using Truffle.

```sh
$ truffle test

```

## Development Notes

- Ensure that Gas usage is optimized as some functions may involve iterating over arrays.
- Rigorous testing is crucial, especially for functions handling financial transactions.
- Be mindful of the security considerations, particularly for functions involving Ether transfers.

## Contributing

Contributions to the Leagacy contract are welcome. Please ensure that your code adheres to the project's coding standards and include tests for new features.

## License

Specify the license under which the project is released.
