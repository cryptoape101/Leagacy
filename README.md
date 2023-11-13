# Leagacy Contract with React Truffle Box

This box comes with everything you need to start using Truffle to write, compile, test, and deploy smart contracts, and interact with them from a React app. It includes a custom smart contract, `Leagacy``, designed for managing Fantasy Football leagues.

## Leagacy Smart Contract

The `Leagacy` contract is a Fantasy Football Fee Manager DApp. It facilitates the creation and management of fantasy football leagues, including handling league fees, locking the league, and distributing payouts at the end of the season.

### Key Features of Leagacy

- Create and manage fantasy football leagues.
- Set and accept league fees from members.
- Distribute payouts at the end of the season according to predefined rules.

## Installation

First, ensure you are in an empty directory.

Run the unbox command using one of the two ways:

```sh
# Install Truffle globally and run `truffle unbox`
$ npm install -g truffle
$ truffle unbox react
```

```sh
# Alternatively, run `truffle unbox` via npx
$ npx truffle unbox react
```

Start the React dev server:

```sh
$ cd client
$ npm start
```

From there, follow the instructions on the hosted React app. It will walk you through using Truffle and Ganache to deploy the `Leagacy` contract, making calls to it, and sending transactions to change the contract's state.

## Interacting with Leagacy

After deploying the `Leagacy` contract using Truffle and Ganache, you can interact with it through the React app. The interface allows you to create leagues, deposit fees, and manage payouts.

## FAQ

- __How do I use this with Ganache (or any other network)?__

  The Truffle project is set to deploy to Ganache by default. If you'd like to change this, it's as easy as modifying the Truffle config file! Check out [our documentation on adding network configurations](https://trufflesuite.com/docs/truffle/reference/configuration/#networks). From there, you can run `truffle migrate` pointed to another network, restart the React dev server, and see the change take place.

- __Where can I find more resources?__

  This Box is a sweet combo of [Truffle](https://trufflesuite.com) and [Webpack](https://webpack.js.org), now enhanced with the Legacy smart contract. For more details on the contract, refer to the documentation in the `/truffle` directory.
