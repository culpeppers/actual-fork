# Claude Skill: Feature Flag Management — Actual Budget

**Purpose**: Help developers understand how to implement, manage, and remove feature flags (experimental features) in the Actual budget app.

---

## 🔹 Overview of Feature Flags

Feature flags (also known as experimental features) allow developers to enable or disable functionality at runtime. This is useful for:

- Gradually rolling out new features to users[^1]
- Testing features with a subset of users before full release
- Breaking large features into smaller, releasable chunks[^1]

For example, custom reports were initially released as a read-only version under a feature flag[^1].

## 🔹 Implementation Guidelines

### ✅ When to Use Feature Flags

- For **large or experimental features** that are not yet stable
- To support **progressive delivery** and A/B testing
- When you need to **disable problematic features** quickly without redeploying

### ❌ When NOT to Use Feature Flags

- For small UI tweaks or visual changes
- As a toggle for minor functional quirks (e.g., "should category selector show hidden categories?")[^2]
- As a long-term solution — all experimental features must either be fully integrated or removed

## 🔹 Managing Feature Flags in Code

While the exact technical implementation isn't detailed in public docs, based on project patterns:

- Feature flags are likely controlled via a central configuration system
- Flags should be wrapped in conditional logic to gate access to experimental features
- UI elements tied to flags should be hidden when the flag is disabled

## 🔹 Lifecycle & Governance

### 🗓 Flag Lifecycle

1. **Create**: Add flag when starting work on an experimental feature
2. **Test**: Enable for developers and early adopters
3. **Evaluate**: Gather feedback and assess stability
4. **Promote or Remove**: Either promote to stable (remove flag) or deprecate and delete

> ⚠️ **Abandoned experimental features will be removed from the codebase**[^2]

### 🧹 Best Practices

- Treat feature flags as **temporary** — plan for removal
- Document the purpose and expected lifespan of each flag
- Monitor usage and remove flags once decisions are made
- Avoid "flag debt" by cleaning up unused flags regularly

## 🔹 Key Resources

- [Feature Flags Documentation](https://actualbudget.org/docs/contributing/project-details/feature-flags) [^1]
- [Blog Post on Experimental Features](https://actualbudget.org/blog/experimental-features/) [^2]

---

[^1]: [Feature Flags (Experimental Features) - Actual Budget](https://actualbudget.org/docs/contributing/project-details/feature-flags) (53%)
[^2]: [Thoughts on Experimental Features - Actual Budget](https://actualbudget.org/blog/experimental-features/) (47%)
