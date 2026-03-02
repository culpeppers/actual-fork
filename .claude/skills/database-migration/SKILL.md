# Claude Skill: Database Migration Support — Actual Budget

**Purpose**: Assist developers in writing, testing, and applying database migrations safely and correctly within the Actual budget monorepo.

---

## 🔹 Overview of Database Architecture

- **Database Engine**: Actual uses **SQLite** for local data storage[^2][^5].
- **Schema Management**: The initial database is created from a default template (`/loot-core/default-db.sqlite`), then a series of migrations are applied to bring it up to the current schema version[^2].
- **Migration Tracking**: A `__migrations__` table tracks which migrations have been applied[^3].

## 🔹 Writing Migrations

### ✅ Steps to Create a Migration

1. **Locate the Migrations Folder**
   - Place all migration files in `loot-core/migrations/`[^1].

2. **Follow Naming Convention**
   - Use the format: `TIMESTAMP_name.sql`
   - Example: `1694438752000_add_goal_targets.sql`[^1]
   - The timestamp must be in milliseconds since Unix epoch.

3. **Write SQL Safely**
   - Use forward-only SQL scripts that modify the schema (e.g., `ALTER TABLE`, `CREATE INDEX`).
   - Avoid destructive operations like dropping columns or tables—these are strongly discouraged[^1].

4. **Update AQL Schema (if needed)**
   - If table structures change, update the AQL Schema file to reflect the new schema[^1].

5. **API Versioning**
   - DB migrations may require publishing a new API version, as migrations must also be applied on the server side[^1].

### 🛠️ Example Migration File

```sql
-- File: loot-core/migrations/1700000000000_add_account_hidden.sql

ALTER TABLE accounts ADD COLUMN hidden INTEGER DEFAULT 0;
CREATE INDEX IF NOT EXISTS idx_accounts_hidden ON accounts(hidden);
```

## 🔹 Testing Migrations

- **Test Locally First**:
  - Run the migration in a development build and verify:
    - Schema changes apply correctly.
    - Existing data remains intact.
    - No performance regressions (e.g., missing indexes).
- **Verify via DevTools**:
  - Open the `db.sqlite` file in a SQLite browser (e.g., DB Browser for SQLite) and inspect the `__migrations__` table to confirm your migration was recorded[^3].

## 🔹 Key Files & Locations

| File/Directory | Purpose |
|----------------|---------|
| `loot-core/migrations/` | Folder containing all migration scripts[^1] |
| `loot-core/default-db.sqlite` | Template database used for new budgets[^2] |
| `__migrations__` table | Tracks applied migrations in user databases[^3] |
| AQL Schema file | Defines queryable schema; update if table changes affect queries[^1] |

## 🔹 Best Practices

- ✅ **Always Backup**: Advise users to export their data before updates involving migrations[^4].
- ✅ **Idempotency**: Ensure migrations can run safely multiple times (use `IF NOT EXISTS` where possible).
- ✅ **Performance**: Add indexes for new columns used in frequent queries.
- ❌ **No Rollbacks**: Migrations are forward-only; do not include `DOWN` scripts.

## 🔹 Additional Resources

- [DB Migrations Guide](https://actualbudget.org/docs/contributing/project-details/migrations) [^1]
- [Database Details](https://actualbudget.org/docs/contributing/project-details/database/) [^2]
- [Development Setup Guide](https://actualbudget.org/docs/contributing/development-setup/)

---

[^1]: [DB Migrations Guide - Actual Budget](https://actualbudget.org/docs/contributing/project-details/migrations) (44%)
[^2]: [Database Details - Actual Budget](https://actualbudget.org/docs/contributing/project-details/database/) (26%)
[^3]: [Restoring Backups | Actual Budget](https://actualbudget.org/docs/backup-restore/restore/) (21%)
[^4]: [Breaking: Actual Budget Script (HTTPS / DB Migration / New ... - GitHub](https://github.com/community-scripts/ProxmoxVE/discussions/2509) (6%)
[^5]: [Architecture Notes | Actual Budget](https://actualbudget.org/docs/contributing/project-details/architecture/) (3%)
