# 🚀 Nullblock SDK

**Official SDKs and documentation for Nullblock - Advanced Web3 Trading & Agentic Systems**

[![Documentation](https://img.shields.io/badge/docs-available-brightgreen)](https://aetherbytes.github.io/nullblock-sdk/)
[![Python SDK](https://img.shields.io/pypi/v/nullblock-sdk)](https://pypi.org/project/nullblock-sdk/)
[![JavaScript SDK](https://img.shields.io/npm/v/@nullblock/sdk)](https://www.npmjs.com/package/@nullblock/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📚 Documentation

**[📖 Complete Documentation](https://aetherbytes.github.io/nullblock-sdk/)** - API reference, guides, and examples

## 🛠️ Quick Installation

### Python SDK
```bash
pip install nullblock-sdk
```

### JavaScript/TypeScript SDK
```bash
npm install @nullblock/sdk
```

### Rust SDK
```bash
cargo add nullblock-sdk
```

## 🚀 Quick Start

### Python
```python
from nullblock import NullblockClient

# Initialize client
client = NullblockClient(api_key='YOUR_API_KEY')

# Get market data
market_data = client.get_market_data('ETH/USD')
print(f"ETH Price: ${market_data['price']}")

# Execute a trade
trade_result = client.execute_trade(
    symbol='ETH/USD',
    side='buy',
    amount=1.0,
    price=2450.00
)
print(f"Trade executed: {trade_result['tx_hash']}")
```

### JavaScript/TypeScript
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

## 🌟 Features

- **Real-time Market Data** - Live price feeds and market information
- **Trading Execution** - Secure order execution with MEV protection
- **Portfolio Management** - Track and manage your positions
- **Social Sentiment** - AI-powered sentiment analysis
- **Arbitrage Detection** - Automated arbitrage opportunity detection
- **MCP Integration** - Model Context Protocol for AI agents
- **Multi-chain Support** - Ethereum, Solana, and more
- **WebSocket Support** - Real-time data streaming

## 🤖 AI Agent Integration

Nullblock provides comprehensive support for AI agents through the Model Context Protocol (MCP):

```python
import asyncio
from nullblock.mcp import NullblockMCPServer

async def main():
    # Start MCP server
    server = NullblockMCPServer(api_key='YOUR_API_KEY')
    
    # Available tools
    tools = await server.list_tools()
    print("Available tools:", tools)
    
    # Use a tool
    result = await server.call_tool("get_market_data", {
        "symbol": "ETH/USD"
    })
    print("Market data:", result)

if __name__ == "__main__":
    asyncio.run(main())
```

## 📖 Documentation Sections

- **[Getting Started](https://aetherbytes.github.io/nullblock-sdk/guides/getting-started/)** - Setup and basic usage
- **[API Reference](https://aetherbytes.github.io/nullblock-sdk/api/)** - Complete API documentation
- **[Architecture](https://aetherbytes.github.io/nullblock-sdk/guides/architecture/)** - System overview
- **[Agent Development](https://aetherbytes.github.io/nullblock-sdk/guides/agents/)** - Building AI agents
- **[Trading Systems](https://aetherbytes.github.io/nullblock-sdk/guides/trading/)** - Arbitrage and DeFi
- **[Examples](https://github.com/aetherBytes/nullblock-sdk/tree/main/examples/)** - Code examples and templates

## 🔗 SDK Packages

### Python SDK (`sdk/python/`)
- **PyPI**: `pip install nullblock-sdk`
- **Features**: Full API support, MCP integration, async/await
- **Requirements**: Python 3.8+

### JavaScript SDK (`sdk/javascript/`)
- **NPM**: `npm install @nullblock/sdk`
- **Features**: TypeScript support, WebSocket, React integration
- **Requirements**: Node.js 16+

### Rust SDK (`sdk/rust/`)
- **Crates.io**: `cargo add nullblock-sdk`
- **Features**: High-performance, async, memory-safe
- **Requirements**: Rust 1.70+

## 📊 Examples

### Trading Bot
```python
# examples/trading/arbitrage_bot.py
from nullblock import NullblockClient

class ArbitrageBot:
    def __init__(self, api_key):
        self.client = NullblockClient(api_key)
    
    async def find_opportunities(self):
        opportunities = await self.client.find_arbitrage(
            symbols=['ETH/USD', 'ETH/USDT'],
            min_profit=0.5
        )
        return opportunities
    
    async def execute_arbitrage(self, opportunity):
        return await self.client.execute_arbitrage(opportunity['id'])
```

### AI Agent
```python
# examples/agents/simple_agent.py
import asyncio
from nullblock.mcp import NullblockMCPServer

class TradingAgent:
    def __init__(self, api_key):
        self.server = NullblockMCPServer(api_key)
    
    async def analyze_market(self):
        # Get market data
        market_data = await self.server.call_tool("get_market_data", {
            "symbol": "ETH/USD"
        })
        
        # Get sentiment
        sentiment = await self.server.call_tool("social_sentiment", {
            "symbol": "ETH"
        })
        
        # Make trading decision
        if sentiment['sentiment_score'] > 0.7 and market_data['change_24h'] > 5:
            await self.server.call_tool("execute_trade", {
                "symbol": "ETH/USD",
                "side": "buy",
                "amount": 1.0
            })
```

## 🚨 Security & Best Practices

- **API Key Security**: Never expose API keys in client-side code
- **Rate Limiting**: Respect API rate limits (1000 requests/minute)
- **Error Handling**: Always implement proper error handling
- **Testing**: Use testnet/sandbox for development
- **Wallet Security**: Use hardware wallets for production

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
```bash
# Clone repository
git clone https://github.com/aetherBytes/nullblock-sdk.git
cd nullblock-sdk

# Install dependencies
cd sdk/python && pip install -e .
cd ../javascript && npm install
cd ../rust && cargo build

# Run tests
pytest sdk/python/tests/
npm test --prefix sdk/javascript/
cargo test --manifest-path sdk/rust/Cargo.toml
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **📖 Documentation**: [https://aetherbytes.github.io/nullblock-sdk/](https://aetherbytes.github.io/nullblock-sdk/)
- **🐛 Issues**: [GitHub Issues](https://github.com/aetherBytes/nullblock-sdk/issues)
- **💬 Discord**: [Join our community](https://discord.gg/nullblock)
- **📧 Email**: support@nullblock.io

## 🔗 Related Projects

- **[Nullblock Platform](https://github.com/aetherBytes/nullblock)** - Main platform repository (private)
- **[Nullblock Docs](https://aetherbytes.github.io/nullblock-sdk/)** - Documentation site
- **[Examples Repository](https://github.com/aetherBytes/nullblock-sdk/tree/main/examples)** - Code examples

---

**Built with ❤️ by the Nullblock Team**

*Empowering the future of decentralized agentic workflows*