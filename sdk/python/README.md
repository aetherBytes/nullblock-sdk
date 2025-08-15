# Nullblock Python SDK

Official Python SDK for Nullblock - Advanced Web3 Trading & Agentic Systems.

## Installation

```bash
pip install nullblock-sdk
```

## Quick Start

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

## Features

- **Real-time Market Data** - Live price feeds and market information
- **Trading Execution** - Secure order execution with MEV protection
- **Portfolio Management** - Track and manage your positions
- **Social Sentiment** - AI-powered sentiment analysis
- **Arbitrage Detection** - Automated arbitrage opportunity detection
- **MCP Integration** - Model Context Protocol for AI agents

## API Reference

### Market Data

```python
# Get current price
price = client.get_price('ETH/USD')

# Get market depth
orderbook = client.get_orderbook('ETH/USD')

# Get 24h statistics
stats = client.get_market_stats('ETH/USD')
```

### Trading

```python
# Place a market order
order = client.place_order(
    symbol='ETH/USD',
    side='buy',
    type='market',
    amount=1.0
)

# Place a limit order
order = client.place_order(
    symbol='ETH/USD',
    side='sell',
    type='limit',
    amount=1.0,
    price=2500.00
)

# Cancel order
client.cancel_order(order_id='order_123')
```

### Portfolio

```python
# Get portfolio overview
portfolio = client.get_portfolio()

# Get specific asset
asset = client.get_asset('ETH')

# Get transaction history
transactions = client.get_transactions(limit=50)
```

### Social Sentiment

```python
# Get sentiment for a symbol
sentiment = client.get_sentiment('ETH', sources=['twitter', 'reddit'])

# Get trending topics
trending = client.get_trending_topics()
```

### Arbitrage

```python
# Find arbitrage opportunities
opportunities = client.find_arbitrage(
    symbols=['ETH/USD', 'ETH/USDT'],
    min_profit=0.5
)

# Execute arbitrage
result = client.execute_arbitrage(opportunity_id='arb_123')
```

## MCP Integration

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

## Error Handling

```python
from nullblock.exceptions import NullblockError, InsufficientFundsError

try:
    result = client.execute_trade(symbol='ETH/USD', side='buy', amount=1000.0)
except InsufficientFundsError:
    print("Insufficient funds for this trade")
except NullblockError as e:
    print(f"Error: {e.message}")
```

## Configuration

```python
from nullblock import NullblockClient

# Custom configuration
client = NullblockClient(
    api_key='YOUR_API_KEY',
    base_url='https://api.nullblock.io/v1',
    timeout=30,
    retries=3
)
```

## Examples

See the [examples](https://github.com/aetherBytes/nullblock-sdk/tree/main/examples) directory for complete examples:

- [Basic Trading](https://github.com/aetherBytes/nullblock-sdk/tree/main/examples/trading/basic_trading.py)
- [Arbitrage Bot](https://github.com/aetherBytes/nullblock-sdk/tree/main/examples/trading/arbitrage_bot.py)
- [Portfolio Tracker](https://github.com/aetherBytes/nullblock-sdk/tree/main/examples/trading/portfolio_tracker.py)
- [AI Agent](https://github.com/aetherBytes/nullblock-sdk/tree/main/examples/agents/simple_agent.py)

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/aetherBytes/nullblock-sdk/blob/main/CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License.
