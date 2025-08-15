---
layout: default
title: Getting Started
---

# Getting Started with Nullblock

Welcome to Nullblock! This guide will help you get started with the platform, whether you're a user looking to explore advanced trading features or a developer wanting to integrate with our systems.

## 🚪 For Users: Wallet Connection

### Step 1: Connect Your Wallet
1. Navigate to the Nullblock interface
2. Click the **door button (🚪)** in the top navigation
3. Choose your preferred wallet:
   - **Phantom** (Solana) - Recommended for Solana-based trading
   - **MetaMask** (Ethereum) - For Ethereum-based features

### Step 2: Access Advanced Features
Once connected:
- Click the **NullEye indicator** to access advanced trading systems
- Explore arbitrage opportunities, social trading, and DeFi automation
- Access portfolio management and risk assessment tools

## 🛠️ For Developers: System Integration

### Prerequisites
- Node.js 18+ and npm/yarn
- Git
- Web3 wallet (Phantom or MetaMask)
- Basic knowledge of TypeScript/JavaScript

### Step 1: Clone the Repository
```bash
git clone https://github.com/aetherBytes/nullblock.git
cd nullblock
```

### Step 2: Install Dependencies
```bash
# Install frontend dependencies
cd svc/hecate
npm install

# Install backend dependencies
cd ../nullblock-mcp
pip install -r requirements.txt
```

### Step 3: Environment Setup
Create environment files for each service:

**Hecate (Frontend)**
```bash
# svc/hecate/.env
VITE_API_URL=http://localhost:8000
VITE_MCP_URL=http://localhost:8001
```

**MCP Server**
```bash
# svc/nullblock-mcp/.env
MCP_PORT=8001
FLASHBOTS_RPC_URL=your_flashbots_url
```

### Step 4: Start Development Servers
```bash
# Start frontend
cd svc/hecate
npm run dev

# Start MCP server (in another terminal)
cd svc/nullblock-mcp
python -m mcp.server
```

## 🤖 For AI Agents: MCP Integration

### Model Context Protocol (MCP)
Nullblock uses the MCP standard for AI agent integration:

```python
import asyncio
from mcp import ClientSession, StdioServerParameters

async def connect_to_nullblock():
    async with ClientSession(StdioServerParameters(
        command="python", 
        args=["-m", "mcp.server"]
    )) as session:
        # Initialize connection
        await session.initialize()
        
        # List available tools
        tools = await session.list_tools()
        print("Available tools:", tools)
        
        # Use trading tools
        result = await session.call_tool("get_market_data", {"symbol": "ETH/USD"})
        print("Market data:", result)
```

### Available MCP Tools
- `get_market_data` - Real-time market data
- `execute_trade` - Execute trading orders
- `get_portfolio` - Portfolio information
- `social_sentiment` - Social media sentiment analysis
- `arbitrage_opportunities` - Find arbitrage opportunities

## 📊 System Components

### Frontend (Hecate)
- **Technology**: React + TypeScript + Vite
- **Features**: HUD interface, wallet integration, real-time data
- **Location**: `svc/hecate/`

### Smart Contracts (Erebus)
- **Technology**: Rust + Solana
- **Features**: Trading execution, portfolio management
- **Location**: `svc/erebus/`

### MCP Server
- **Technology**: Python + FastAPI
- **Features**: AI agent integration, trading APIs
- **Location**: `svc/nullblock-mcp/`

### Trading Agents
- **Technology**: Python
- **Features**: Automated arbitrage, social trading
- **Location**: `svc/nullblock-agents/`

## 🔧 Configuration

### Wallet Configuration
```javascript
// Supported wallets
const supportedWallets = {
  phantom: {
    name: 'Phantom',
    chain: 'solana',
    features: ['trading', 'portfolio', 'arbitrage']
  },
  metamask: {
    name: 'MetaMask', 
    chain: 'ethereum',
    features: ['trading', 'defi', 'social']
  }
}
```

### API Endpoints
```javascript
// Base URLs
const API_ENDPOINTS = {
  mcp: 'http://localhost:8001',
  trading: 'http://localhost:8002',
  portfolio: 'http://localhost:8003'
}
```

## 🚨 Troubleshooting

### Common Issues

**Wallet Connection Fails**
- Ensure wallet extension is installed and unlocked
- Check browser console for error messages
- Try refreshing the page and reconnecting

**MCP Connection Issues**
- Verify MCP server is running on correct port
- Check firewall settings
- Ensure Python dependencies are installed

**Trading Features Not Available**
- Confirm wallet is connected
- Check if you're on the correct network
- Verify sufficient balance for trading

### Getting Help
- **GitHub Issues**: [Create an issue](https://github.com/aetherBytes/nullblock/issues)
- **Documentation**: Check the [API Reference](api/) for detailed information
- **Community**: Join our Discord or Telegram channels

## 🎯 Next Steps

1. **Explore the Interface** - Familiarize yourself with the HUD and NullEye
2. **Review Architecture** - Understand the system design in the [Architecture](architecture/) section
3. **Build Agents** - Learn to create custom trading agents in the [Agents](agents/) guide
4. **API Integration** - Integrate with our APIs using the [API Reference](api/)

---

Ready to dive deeper? Check out the [Architecture Overview](architecture/) or [API Reference](api/) for detailed technical information.
