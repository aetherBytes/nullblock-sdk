---
layout: default
title: API Reference
---

# API Reference

Comprehensive API documentation for Nullblock's trading systems, MCP integration, and agent interfaces.

## 🔌 MCP (Model Context Protocol)

### Connection
```python
import asyncio
from mcp import ClientSession, StdioServerParameters

async def connect():
    async with ClientSession(StdioServerParameters(
        command="python", 
        args=["-m", "mcp.server"]
    )) as session:
        await session.initialize()
        return session
```

### Available Tools

#### Market Data
```python
# Get real-time market data
result = await session.call_tool("get_market_data", {
    "symbol": "ETH/USD",
    "exchange": "binance"
})

# Response
```json
{
    "price": 2450.50,
    "volume": 1234567.89,
    "timestamp": "2024-01-15T10:30:00Z",
    "change_24h": 2.5
}
```

#### Trading Execution
```python
# Execute a trade
result = await session.call_tool("execute_trade", {
    "symbol": "ETH/USD",
    "side": "buy",
    "amount": 1.5,
    "price": 2450.00,
    "wallet_address": "your_wallet_address"
})

# Response
```json
{
    "tx_hash": "0x123...",
    "status": "confirmed",
    "executed_price": 2450.25,
    "timestamp": "2024-01-15T10:30:00Z"
}
```

#### Portfolio Management
```python
# Get portfolio information
result = await session.call_tool("get_portfolio", {
    "wallet_address": "your_wallet_address"
})

# Response
```json
{
    "total_value": 15000.00,
    "assets": [
        {
            "symbol": "ETH",
            "amount": 5.0,
            "value": 12250.00,
            "allocation": 81.67
        }
    ],
    "performance_24h": 2.3
}
```

#### Social Sentiment
```python
# Get social media sentiment
result = await session.call_tool("social_sentiment", {
    "symbol": "ETH",
    "sources": ["twitter", "reddit"],
    "timeframe": "24h"
})

# Response
```json
{
    "sentiment_score": 0.75,
    "mentions": 1250,
    "trending": true,
    "top_keywords": ["bullish", "moon", "hodl"]
}
```

#### Arbitrage Opportunities
```python
# Find arbitrage opportunities
result = await session.call_tool("arbitrage_opportunities", {
    "symbols": ["ETH/USD", "ETH/USDT"],
    "min_profit": 0.5
})

# Response
```json
{
    "opportunities": [
        {
            "symbol": "ETH/USD",
            "buy_exchange": "binance",
            "sell_exchange": "coinbase",
            "profit_percentage": 1.2,
            "estimated_profit": 29.40
        }
    ]
}
```

## 🌐 REST API Endpoints

### Base URL
```http
https://api.nullblock.io/v1
```

### Authentication
```http
Authorization: Bearer YOUR_API_KEY
```

### Market Data
```http
GET /market/price/{symbol}
GET /market/volume/{symbol}
GET /market/orderbook/{symbol}
```

### Trading
```http
POST /trade/order
GET /trade/orders
GET /trade/history
```

### Portfolio
```http
GET /portfolio/{wallet_address}
GET /portfolio/performance/{wallet_address}
```

## 🔐 Wallet Integration

### Phantom Wallet (Solana)
```javascript
// Connect to Phantom
const provider = window.phantom?.solana;
if (provider) {
    const response = await provider.connect();
    const publicKey = response.publicKey.toString();
    
    // Sign message for authentication
    const message = new TextEncoder().encode("Authenticate with Nullblock");
    const signature = await provider.signMessage(message, "utf8");
}
```

### MetaMask (Ethereum)
```javascript
// Connect to MetaMask
if (typeof window.ethereum !== 'undefined') {
    const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
    });
    const account = accounts[0];
    
    // Sign message for authentication
    const message = "Authenticate with Nullblock";
    const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, account]
    });
}
```

## 🤖 Agent Development

### Python Agent Template
```python
import asyncio
from mcp import ClientSession, StdioServerParameters

class NullblockAgent:
    def __init__(self):
        self.session = None
    
    async def connect(self):
        self.session = await ClientSession(StdioServerParameters(
            command="python", 
            args=["-m", "mcp.server"]
        )).__aenter__()
        await self.session.initialize()
    
    async def get_market_data(self, symbol):
        return await self.session.call_tool("get_market_data", {"symbol": symbol})
    
    async def execute_trade(self, symbol, side, amount, price):
        return await self.session.call_tool("execute_trade", {
            "symbol": symbol,
            "side": side,
            "amount": amount,
            "price": price
        })
    
    async def run_strategy(self):
        # Implement your trading strategy here
        market_data = await self.get_market_data("ETH/USD")
        
        if market_data["change_24h"] > 5:  # 5% gain in 24h
            await self.execute_trade("ETH/USD", "sell", 1.0, market_data["price"])

# Usage
async def main():
    agent = NullblockAgent()
    await agent.connect()
    await agent.run_strategy()

if __name__ == "__main__":
    asyncio.run(main())
```

### JavaScript Agent Template
```javascript
class NullblockAgent {
    constructor() {
        this.apiUrl = 'https://api.nullblock.io/v1';
        this.apiKey = 'YOUR_API_KEY';
    }
    
    async getMarketData(symbol) {
        const response = await fetch(`${this.apiUrl}/market/price/${symbol}`, {
            headers: {
                'Authorization': `Bearer ${this.apiKey}`
            }
        });
        return await response.json();
    }
    
    async executeTrade(order) {
        const response = await fetch(`${this.apiUrl}/trade/order`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        return await response.json();
    }
    
    async runStrategy() {
        const marketData = await this.getMarketData('ETH/USD');
        
        if (marketData.change_24h > 5) {
            await this.executeTrade({
                symbol: 'ETH/USD',
                side: 'sell',
                amount: 1.0,
                price: marketData.price
            });
        }
    }
}

// Usage
const agent = new NullblockAgent();
agent.runStrategy();
```

## 📊 WebSocket API

### Real-time Market Data
```javascript
const ws = new WebSocket('wss://api.nullblock.io/ws/market');

ws.onopen = () => {
    // Subscribe to market data
    ws.send(JSON.stringify({
        action: 'subscribe',
        channel: 'market_data',
        symbol: 'ETH/USD'
    }));
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Market update:', data);
};
```

### Real-time Portfolio Updates
```javascript
const ws = new WebSocket('wss://api.nullblock.io/ws/portfolio');

ws.onopen = () => {
    // Subscribe to portfolio updates
    ws.send(JSON.stringify({
        action: 'subscribe',
        channel: 'portfolio',
        wallet_address: 'your_wallet_address'
    }));
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Portfolio update:', data);
};
```

## 🚨 Error Handling

### Common Error Codes
```javascript
const ERROR_CODES = {
    400: 'Bad Request - Invalid parameters',
    401: 'Unauthorized - Invalid API key',
    403: 'Forbidden - Insufficient permissions',
    404: 'Not Found - Resource not found',
    429: 'Rate Limited - Too many requests',
    500: 'Internal Server Error - Server issue'
};
```

### Error Response Format
```json
{
    "error": {
        "code": 400,
        "message": "Invalid symbol parameter",
        "details": {
            "field": "symbol",
            "value": "INVALID",
            "expected": "Valid trading pair (e.g., ETH/USD)"
        }
    }
}
```

## 📈 Rate Limits

- **REST API**: 1000 requests per minute
- **WebSocket**: 10 connections per IP
- **MCP**: No rate limits (local connection)

## 🔗 SDKs and Libraries

### Python SDK
```bash
pip install nullblock-sdk
```

```python
from nullblock import NullblockClient

client = NullblockClient(api_key='YOUR_API_KEY')
market_data = client.get_market_data('ETH/USD')
```

### JavaScript SDK
```bash
npm install @nullblock/sdk
```

```javascript
import { NullblockClient } from '@nullblock/sdk';

const client = new NullblockClient('YOUR_API_KEY');
const marketData = await client.getMarketData('ETH/USD');
```

---

For more detailed examples and advanced usage, check out the [Getting Started](getting-started/) guide or [Architecture](architecture/) documentation.
