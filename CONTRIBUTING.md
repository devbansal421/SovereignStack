# Contributing to SovereignStack

Thank you for contributing to SovereignStack! We welcome contributions to expand our jurisdictional telemetry database, supply-chain provenance scanners, and DPDP Act compliance rules.

## Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/SovereignStack.git
   cd SovereignStack
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   npm start
   ```

3. **Setup Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Guidelines

- **Ubiquitous Language**: Adhere strictly to the domain terms defined in [`CONTEXT.md`](./CONTEXT.md).
- **Architectural Changes**: When making hard-to-reverse decisions, record an Architectural Decision Record in `docs/adr/`.
- **Code Standards**: Write clean, modular, and well-typed code. Avoid generic AI writing patterns in documentation.
