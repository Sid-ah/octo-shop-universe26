# Octo Shop: Copilot instructions

- Node.js 24, CommonJS, no frameworks. Use only `node:` built-ins plus existing dependencies.
- Tests use the built-in runner: `npm test` (`node --test`). Add or update tests with every change.
- Prices are dollars as numbers; round money to cents at the edges (`Math.round(x * 100) / 100`).
- Keep functions small and pure where possible; the HTTP layer lives in `src/server.js`.
