# faucet-rpc

# Sui Faucet RPC Service

A RPC service for Sui blockchain faucet that handles token distribution requests.

## Features

- RESTful API endpoints for faucet requests
- Rate limiting and request validation
- Support for multiple networks (devnet, testnet)
- Request logging and monitoring
- TypeScript implementation for type safety

## Prerequisites

- Node.js (v22 or higher)
- pnpm (v7 or higher)
- TypeScript (v4.5 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/faucet-rpc.git
cd faucet-rpc
```


2. Install dependencies:

```bash
pnpm install
```


3. Run server

```bash

pnpm dev
```

4. run client to call rpc

request faucet sui on testnet.
the recipient address should be a address have at lease 0.1 sui balance on mainnet

```bash
curl --location --request POST 'http://localhost:3001/v1/gas' \
--header 'Content-Type: application/json' \
--data-raw '{
    "FixedAmountRequest": {
        "recipient": "${sui address}"
    }
}'

```

- example
```bash
curl --location --request POST 'http://localhost:3001/v1/gas' \
--header 'Content-Type: application/json' \
--data-raw '{
    "FixedAmountRequest": {
        "recipient": "0x540105a7d2f5f54a812c630f2996f1790ed0e60d1f9a870ce397f03e4cec9b38"
    }
}'

```