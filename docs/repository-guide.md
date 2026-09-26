# Relatia Repository Workflow & Collaboration Guide

This document defines the branching strategy, commit conventions, pull request standards, and release workflows for the Relatia codebase.

---

## 1. Branch Strategy

Relatia follows a modified GitFlow strategy optimized for continuous delivery and milestone progression:

```
[ main ]  <--------------------------------- (Production-ready releases only)
   ▲
   │ (Release PR with tag vX.Y.Z)
   │
[ develop ] <------------------------------ (Integration branch for active development)
   ▲        ▲
   │        │ (PR merge)
   │        └── [ feature/day10-slack-approvals ]
   │
   └── [ fix/razorpay-signature-check ]
```

### Core Branches:
* **`main`**: Production branch.
  * Contains stable, tested, release-ready code.
  * **Strict Rule**: Direct pushes to `main` are strictly prohibited. All changes must arrive via reviewed Pull Requests from `develop`.
* **`develop`**: Primary integration branch.
  * All active feature development and milestone tasks branch off from and merge back into `develop`.
  * Must always pass `npx tsc --noEmit`, `npm run lint`, and `npm run build`.

### Working Branches:
* **Feature Branches**: `feature/<milestone-or-capability>`
  * Examples: `feature/day10-slack-approvals`, `feature/venue-calendar-sync`, `feature/ai-recommendation-engine`
  * Branch off from: `develop`
  * Merge into: `develop`
* **Bugfix Branches**: `fix/<bug-description>`
  * Examples: `fix/invoice-gst-rounding`, `fix/mobile-drawer-escape-key`
  * Branch off from: `develop`
  * Merge into: `develop`
* **Hotfix Branches**: `hotfix/<critical-production-bug>`
  * Used only for urgent production patches.
  * Branch off from: `main`
  * Merged into: both `main` and `develop`

---

## 2. Commit Message Conventions

We enforce [Conventional Commits](https://www.conventionalcommits.org/) to maintain clean, searchable changelogs:

```text
<type>(<optional scope>): <short description in imperative mood>

[optional body explaining motivation and context]

[optional footer referencing issue or roadmap milestone]
```

### Allowed Types:
* **`feat`**: A new user-facing feature or capability.
  * *Example*: `feat(day8): implement public marketing website with luxury design system`
  * *Example*: `feat(finance): add Indian GST breakdown to invoice detail view`
* **`fix`**: A bug fix.
  * *Example*: `fix(marketing): resolve setState in effect warning in navigation bar`
  * *Example*: `fix(payments): add fallback order creation for local test mode`
* **`docs`**: Documentation only changes.
  * *Example*: `docs: add comprehensive developer setup guide and architecture doc`
* **`style`**: Code formatting, missing semicolons, or cosmetic whitespace (no production logic change).
* **`refactor`**: Refactoring code without changing external behavior.
* **`test`**: Adding or updating unit/integration tests.
* **`chore`**: Maintenance tasks, dependency bumps, or tool configuration.

---

## 3. Pull Request (PR) Workflow

1. **Create Branch**: Always branch from the latest `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/my-feature
   ```
2. **Commit Frequently**: Make small, logical commits with clear messages.
3. **Verify Locally Before Opening PR**:
   ```bash
   npx tsc --noEmit
   npm run lint
   npm run build
   ```
4. **Push Branch & Open PR**:
   * Target branch: `develop` (never `main` for feature work).
   * Fill out the `.github/pull_request_template.md`.
5. **Code Review**: At least one peer review approval is required.
6. **Merge**: Squash and merge or rebase merge onto `develop`. Delete feature branch after merge.

---

## 4. Code Review Checklist

Reviewers must verify:
- [ ] **Type Safety**: No `@ts-ignore` or explicit `any` types without written justification.
- [ ] **Tenant Isolation**: Every database query touching company entities filters by `companyId`.
- [ ] **Secrets Check**: No API keys, passwords, or test credentials hardcoded in files.
- [ ] **Server/Client Boundaries**: `"use client"` is only applied when browser APIs, state, or event handlers are required.
- [ ] **Financial Integrity**: All financial calculations (budget, invoice, payments) use integer paise.
- [ ] **Performance & Motion**: Reduced-motion hooks implemented on animations; images optimized.
- [ ] **No Regression**: Core application flows (`/events`, `/dashboard/finance`, `/api/webhooks/razorpay`) continue working.

---

## 5. Release Preparation (Deploying to Main)

When a milestone (e.g. Day 10, Day 15, or v1.0.0) is complete on `develop`:

1. Create a release PR from `develop` into `main`.
2. Verify all CI checks pass.
3. Merge PR into `main`.
4. Tag the release commit:
   ```bash
   git checkout main
   git pull origin main
   git tag -a v0.9.0 -m "Release v0.9.0: Day 9 MVP Milestone with Public Marketing Website"
   git push origin v0.9.0
   ```
