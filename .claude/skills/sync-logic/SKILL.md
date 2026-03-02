# Claude Skill: Local-First & Sync Logic — Actual Budget

**Purpose**: Assist developers in understanding, implementing, and troubleshooting Actual’s local-first architecture and synchronization mechanisms.

---

## 🔹 Core Principles

- **Local-First by Design**: Actual is designed as a local application where all data resides on the user’s device by default. The app functions fully without internet connectivity[^3].
- **Seamless Syncing**: When a network connection is available, data is automatically synced across devices in the background[^4].
- **End-to-End Encryption (E2EE)**: Optional E2EE ensures data privacy during sync, with encryption keys derived from a user-defined passphrase[^1].

## 🔹 Sync Architecture

| Component | Description |
|---------|-------------|
| **Sync Server** | Requires `actual-server` for multi-device sync. Bank sync and inter-device sync depend on this backend[^1]. |
| **Data Flow** | Changes are saved locally immediately, then pushed to the server when online. Conflicts are resolved using timestamp-based or logical clock strategies[^2]. |
| **Hybrid Logical Clocks** | Used to order events across devices in a distributed manner, ensuring consistency without relying solely on wall-clock time[^2]. |

## 🔹 Developer Guidance

- ✅ **Offline Support**: Ensure all UI interactions work without network access. Data must be written to local storage (e.g., IndexedDB) instantly.
- ✅ **Sync Triggers**: Sync runs automatically when connectivity is detected. Avoid manual sync prompts unless debugging.
- ✅ **Error Handling**: Implement robust retry logic for failed sync attempts due to network flakiness.
- ✅ **Security**: If E2EE is enabled, never log or transmit decrypted data. Secrets and API keys are stored locally and encrypted[^1].

## 🔹 Key Files & Locations (in monorepo)

- `packages/client/src/sync/` — Core sync logic and WebSocket communication.
- `packages/server/` — Backend services handling sync requests and bank data ingestion.
- `docs/advanced/bank-sync.md` — Details on bank sync setup and security considerations.
- `docs/getting-started/sync.md` — User-facing sync documentation (useful for dev clarity).

## 🔹 Tips for Development

- Use the **development server** to test sync behavior between multiple instances.
- Simulate offline mode in the browser or Electron app to verify local persistence.
- Monitor WebSocket traffic via DevTools to debug sync messages.
- Refer to the [Contributing Guide](https://actualbudget.org/docs/contributing/development-setup/) for setting up `actual-server` locally.

---

[^1]: [Issues 140](https://github.com/actualbudget/actual/issues) (39%)
[^2]: [GitHub - imightbenwe/actual-budget: A local-first personal finance app](https://github.com/imightbenwe/actual-budget) (31%)
[^3]: [actualbudget/actual: A local-first personal finance app - GitHub](https://github.com/actualbudget/actual) (18%)
[^4]: [Actual - GitHub](https://github.com/actualbudget) (12%)
