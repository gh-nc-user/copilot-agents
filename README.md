# Project Name

Brief description of what this project does.

## Quick Start

```bash
# Install dependencies
npm install  # or pip install -r requirements.txt

# Run locally
npm run dev  # or python main.py

# Run tests
npm test     # or pytest
```

## Project Structure

```
.
├── src/                 # Source code
├── tests/               # Test files
├── docs/                # Documentation
│   ├── PROJECT_CONTEXT.md
│   ├── DECISION_LOG.md
│   └── IMPLEMENTATION_LOG.md
├── AGENTS.md            # AI agent context
└── README.md            # This file
```

## Documentation

- **[PROJECT_CONTEXT.md](docs/PROJECT_CONTEXT.md)** - Current state and architecture
- **[DECISION_LOG.md](docs/DECISION_LOG.md)** - Architecture decisions (ADRs)
- **[IMPLEMENTATION_LOG.md](docs/IMPLEMENTATION_LOG.md)** - Change history

## Development

### Prerequisites

- Node.js 20+ / Python 3.11+
- Docker (for local services)
- OpenCode CLI (for AI-assisted development)

### Getting Started

1. Clone this repository
2. Install dependencies
3. Copy `.env.example` to `.env` and configure
4. Run the application

### AI-Assisted Development

This project uses OpenCode for AI-assisted development:

```bash
# Start OpenCode in this directory
opencode

# Initialize project context (run once)
/init
```

## License

[Add license information]
