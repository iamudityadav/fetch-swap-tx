# Fetch all swap transactions occurring on the USDC/WETH pool

This repository allows fetching all the swap transactions occurring in the USDC/WETH pool in Uniswap V3.

## Description
This repository listens to swap events in the USDC/WETH Uniswap V3 pool on the Ethereum mainnet using WebSocket. It creates a "Swap" object and prints that object. It determines if a transaction is a buy or sell transaction with respect to ETH.


## Installation

Follow these steps to get this project up and running locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/iamudityadav/fetch-swap-tx

2. Navigate into the project directory:
   ```bash
   cd repository

3. Install dependencies::
   ```bash
    npm install

## Running the Project
```bash
    node src/index.js
