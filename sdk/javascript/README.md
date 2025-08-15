# Nullblock JavaScript SDK

Official JavaScript/TypeScript SDK for Nullblock - Advanced Web3 Trading & Agentic Systems.

## Installation

```bash
npm install @nullblock/sdk
```

## Quick Start

```javascript
import { NullblockClient } from '@nullblock/sdk';

// Initialize client
const client = new NullblockClient('YOUR_API_KEY');

// Get market data
const marketData = await client.getMarketData('ETH/USD');
console.log(`ETH Price: $${marketData.price}`);

// Execute a trade
const tradeResult = await client.executeTrade({
  symbol: 'ETH/USD',
  side: 'buy',
  amount: 1.0,
  price: 2450.00
});
console.log(`Trade executed: ${tradeResult.txHash}`);
```

## Features

- **Real-time Market Data** - Live price feeds and market information
- **Trading Execution** - Secure order execution with MEV protection
- **Portfolio Management** - Track and manage your positions
- **Social Sentiment** - AI-powered sentiment analysis
- **Arbitrage Detection** - Automated arbitrage opportunity detection
- **WebSocket Support** - Real-time data streaming
- **TypeScript Support** - Full type definitions included

## API Reference

### Market Data

```javascript
// Get current price
const price = await client.getPrice('ETH/USD');

// Get market depth
const orderbook = await client.getOrderbook('ETH/USD');

// Get 24h statistics
const stats = await client.getMarketStats('ETH/USD');
```

### Trading

```javascript
// Place a market order
const order = await client.placeOrder({
  symbol: 'ETH/USD',
  side: 'buy',
  type: 'market',
  amount: 1.0
});

// Place a limit order
const order = await client.placeOrder({
  symbol: 'ETH/USD',
  side: 'sell',
  type: 'limit',
  amount: 1.0,
  price: 2500.00
});

// Cancel order
await client.cancelOrder('order_123');
```

### Portfolio

```javascript
// Get portfolio overview
const portfolio = await client.getPortfolio();

// Get specific asset
const asset = await client.getAsset('ETH');

// Get transaction history
const transactions = await client.getTransactions({ limit: 50 });
```

### Social Sentiment

```javascript
// Get sentiment for a symbol
const sentiment = await client.getSentiment('ETH', {
  sources: ['twitter', 'reddit']
});

// Get trending topics
const trending = await client.getTrendingTopics();
```

### Arbitrage

```javascript
// Find arbitrage opportunities
const opportunities = await client.findArbitrage({
  symbols: ['ETH/USD', 'ETH/USDT'],
  minProfit: 0.5
});

// Execute arbitrage
const result = await client.executeArbitrage('arb_123');
```

## WebSocket Support

```javascript
import { NullblockWebSocket } from '@nullblock/sdk';

// Connect to real-time data
const ws = new NullblockWebSocket('YOUR_API_KEY');

// Subscribe to market data
ws.subscribe('market_data', 'ETH/USD', (data) => {
  console.log('Price update:', data.price);
});

// Subscribe to portfolio updates
ws.subscribe('portfolio', 'your_wallet_address', (data) => {
  console.log('Portfolio update:', data);
});

// Handle connection events
ws.on('connect', () => {
  console.log('Connected to Nullblock WebSocket');
});

ws.on('disconnect', () => {
  console.log('Disconnected from Nullblock WebSocket');
});
```

## Error Handling

```javascript
import { NullblockError, InsufficientFundsError } from '@nullblock/sdk';

try {
  const result = await client.executeTrade({
    symbol: 'ETH/USD',
    side: 'buy',
    amount: 1000.0
  });
} catch (error) {
  if (error instanceof InsufficientFundsError) {
    console.log('Insufficient funds for this trade');
  } else if (error instanceof NullblockError) {
    console.log(`Error: ${error.message}`);
  }
}
```

## Configuration

```javascript
import { NullblockClient } from '@nullblock/sdk';

// Custom configuration
const client = new NullblockClient('YOUR_API_KEY', {
  baseUrl: 'https://api.nullblock.io/v1',
  timeout: 30000,
  retries: 3
});
```

## React Integration

```jsx
import React, { useState, useEffect } from 'react';
import { NullblockClient } from '@nullblock/sdk';

function TradingComponent() {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const client = new NullblockClient('YOUR_API_KEY');
    
    const fetchPrice = async () => {
      try {
        const data = await client.getPrice('ETH/USD');
        setPrice(data.price);
      } catch (error) {
        console.error('Error fetching price:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPrice();
    const interval = setInterval(fetchPrice, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>ETH Price: ${price}</h2>
    </div>
  );
}
```

## Node.js Usage

```javascript
const { NullblockClient } = require('@nullblock/sdk');

async function main() {
  const client = new NullblockClient('YOUR_API_KEY');
  
  try {
    const marketData = await client.getMarketData('ETH/USD');
    console.log('Market data:', marketData);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```

## Examples

See the [examples](https://github.com/aetherBytes/nullblock-sdk/tree/main/examples) directory for complete examples:

- [Basic Trading](https://github.com/aetherBytes/nullblock-sdk/tree/main/examples/trading/basic_trading.js)
- [Arbitrage Bot](https://github.com/aetherBytes/nullblock-sdk/tree/main/examples/trading/arbitrage_bot.js)
- [Portfolio Tracker](https://github.com/aetherBytes/nullblock-sdk/tree/main/examples/trading/portfolio_tracker.js)
- [React Component](https://github.com/aetherBytes/nullblock-sdk/tree/main/examples/trading/react_component.jsx)

## TypeScript

The SDK includes full TypeScript support:

```typescript
import { NullblockClient, MarketData, TradeOrder } from '@nullblock/sdk';

const client = new NullblockClient('YOUR_API_KEY');

async function getMarketData(symbol: string): Promise<MarketData> {
  return await client.getMarketData(symbol);
}

async function placeOrder(order: TradeOrder): Promise<string> {
  return await client.placeOrder(order);
}
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/aetherBytes/nullblock-sdk/blob/main/CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License.
