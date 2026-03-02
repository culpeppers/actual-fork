# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Mandatory Requirements

- **ALL commit messages MUST be prefixed with `[AI]`** — no exceptions (e.g., `[AI] Fix type error in account validation`)
- **ALL pull request titles MUST be prefixed with `[AI]`** — no exceptions
- **Never fill in the PR template** (`.github/PULL_REQUEST_TEMPLATE.md`) — leave all placeholder comments as-is; humans fill those out
- **Never commit unless explicitly asked** by the user

## Commands (Always Run from Repo Root)

```bash
# Development
yarn start                    # Web frontend (port 3001)
yarn start:server-dev         # Sync server (port 5006) + web frontend together
yarn start:desktop            # Desktop Electron dev (watchers for core + client + electron)

# Quality checks (run before committing)
yarn typecheck                # TypeScript type checking
yarn lint:fix                 # Auto-fix lint and formatting (oxlint + oxfmt)

# Testing
yarn test                     # All unit tests via lage (parallel)
yarn test:debug               # All tests without cache
yarn workspace loot-core run test         # Tests for a specific package
yarn workspace @actual-app/web e2e        # E2E tests (Playwright)
yarn workspace @actual-app/web run playwright test accounts.test.ts --browser=chromium  # Single E2E test

# Building
yarn build:browser            # Browser production build
yarn build:desktop            # Electron desktop build
yarn build:api                # API package build

# i18n
yarn generate:i18n            # Regenerate translation files
```

Pre-commit hooks run automatically via Husky. Run `yarn prepare` once after first install to set them up.

## Architecture

Yarn 4 workspace monorepo. All yarn commands must be run from the repo root.

### Key Packages

| Package | Alias | Purpose |
|---------|-------|---------|
| `packages/loot-core/` | `loot-core` | Core business logic, DB operations — platform-agnostic; exports differ by platform (`node` vs `browser`) |
| `packages/desktop-client/` | `@actual-app/web` | React UI for web and desktop (Vite, Vitest, Playwright) |
| `packages/desktop-electron/` | `desktop-electron` | Electron wrapper, native OS integration |
| `packages/component-library/` | `@actual-app/components` | Shared UI components, theme, icons |
| `packages/sync-server/` | `@actual-app/sync-server` | Express sync server (migrating JS → TS) |
| `packages/api/` | `@actual-app/api` | Public Node.js API for integrations |
| `packages/crdt/` | `@actual-app/crdt` | CRDT sync protocol (protobufs) |
| `packages/eslint-plugin-actual/` | `eslint-plugin-actual` | Custom ESLint rules (i18n, imports, logging) |
| `packages/plugins-service/` | `plugins-service` | Service worker for plugins; built as part of `yarn start` |
| `packages/docs/` | `docs` | Documentation site (Docusaurus); `yarn start:docs` to run |

### loot-core Platform Splitting

`loot-core` uses conditional `package.json` exports for platform-specific code — do not directly import `.api`, `.web`, or `.electron` variants. Platform resolution happens at build time.

Key subdirectories:
- `src/client/` — client-side logic
- `src/server/` — server-side logic
- `src/shared/` — shared utilities
- `src/types/` — type definitions (check here before defining new types)

### desktop-client Conventions

- Custom hooks in `src/hooks/` — use `useNavigate()` from there, not react-router directly
- Redux wrappers in `src/redux/` — use `useDispatch()`, `useSelector()`, `useStore()` from there, not react-redux directly
- E2E tests in `e2e/`, page models in `e2e/page-models/`
- Mobile tests use `.mobile.test.ts` suffix

## Code Style

**TypeScript:**
- `type` over `interface`; avoid `enum` (use objects/maps instead)
- Avoid `any`/`unknown`; avoid type assertions (`as`) — prefer `satisfies`
- Inline type imports: `import { type MyType } from '...'`
- No `@ts-strict-ignore` comments; no `eslint-disable`/`oxlint-disable` comments

**React:**
- Functional components only — no classes
- Named exports (not default exports)
- Type props directly — don't use `React.FC` or `React.FunctionComponent`
- Named imports only — no `React.*` patterns
- Use `<Link>` not `<a>` tags

**i18n:**
- All user-facing strings must be translated
- Prefer `<Trans>` component over `t()` function
- Custom ESLint rule `actual/no-untranslated-strings` enforces this

**Financial numbers:**
- Wrap standalone financial numbers with `FinancialText` or apply `styles.tnum` directly

**Imports order** (enforced by ESLint):
1. React
2. Node.js built-ins
3. External packages
4. Actual packages (`loot-core`, `@actual-app/components`)
5. Parent/sibling/index imports

**Never:**
- Import colors directly — use theme
- Import `@actual-app/web/*` in `loot-core`
- Import `uuid` without destructuring: `import { v4 as uuidv4 } from 'uuid'`

## Testing

- Unit tests use **Vitest**; located alongside source files or in `__tests__/` with `.test.ts`/`.test.tsx`/`.spec.js` extensions
- **lage** runs tests in parallel across workspaces (concurrency: 2); builds are cached in `.lage/` (tests are not cached). Clear with `rm -rf .lage` if builds behave unexpectedly
- Minimize mocking — prefer real implementations
- E2E snapshots stored in `*-snapshots/` directories; use Docker for consistent VRT: `yarn vrt:docker`

## Linting

- Primary linter: **oxlint** (with `--type-aware`); formatter: **oxfmt**
- `eslint` is only used for custom `eslint-plugin-actual` rules, not as the primary linter
- Key custom rules: `actual/no-untranslated-strings`, `actual/prefer-trans-over-t`, `actual/prefer-logger-over-console`, `actual/no-anchor-tag`

## Environment Requirements

- Node.js >=22 (`.nvmrc` specifies `v22/*`)
- Yarn ^4.9.1

## Build Artifacts (Don't Edit)

`packages/*/dist/`, `packages/*/lib-dist/`, `packages/*/build/`, `packages/desktop-client/playwright-report/`, `packages/desktop-client/test-results/`

Icons in `packages/component-library/src/icons/` are auto-generated — don't edit manually.

## Release Notes

Add entries for user-facing changes to `upcoming-release-notes/`.

## Code Reviews

See [CODE_REVIEW_GUIDELINES.md](CODE_REVIEW_GUIDELINES.md) for review guidelines.
