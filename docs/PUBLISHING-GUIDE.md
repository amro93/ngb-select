# Publishing Guide: `@amro93/ngb-select`

This guide explains how to version and publish the `@amro93/ngb-select` package to the [npm Registry](https://www.npmjs.com/package/@amro93/ngb-select).

---

## 1. Quick Command Summary

| Command                 | Action                                                                                        |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| `npm run publish:patch` | Bumps patch version (`0.1.x` $\rightarrow$ `0.1.x+1`), syncs all files, builds, and publishes |
| `npm run publish:minor` | Bumps minor version (`0.x.0` $\rightarrow$ `0.x+1.0`), syncs all files, builds, and publishes |
| `npm run publish:major` | Bumps major version (`x.0.0` $\rightarrow$ `x+1.0.0`), syncs all files, builds, and publishes |
| `npm run publish:lib`   | Builds and publishes the current version without bumping                                      |
| `npm run version:patch` | Bumps patch version and syncs files locally without publishing                                |
| `npm run build:lib`     | Compiles the library package into `dist/ngb-select`                                           |

---

## 2. Publishing Methods

### Method A: Automated via GitHub Actions (Recommended)

The repository is configured with **GitHub Actions & OIDC Trusted Publishing** (`.github/workflows/npm-publish.yml`).

1. Commit your changes and bump version:
   ```bash
   npm run version:patch
   git add .
   git commit -m "chore: release v0.1.7"
   ```
2. Push to GitHub:
   ```bash
   git push origin master
   ```
3. GitHub Actions automatically:
   - Runs unit tests on Node 20.x and 22.x.
   - Compiles the library with `ng-packagr`.
   - Checks if the version is already on npm.
   - Publishes to npm registry with provenance using OIDC (no local tokens needed).

---

### Method B: Manual Local Publishing via CLI

If you wish to publish directly from your local terminal:

#### Step 1: Log in to npm (One-Time per Machine)

```bash
npm login
```

_Enter your npm username (`amro93`), password, and 2FA authentication code if prompted. Verify you are logged in with `npm whoami`._

#### Step 2: Run the All-In-One Publish Command

```bash
npm run publish:patch
```

_This command automatically executes:_

1. `npm version patch` (bumps `package.json` and `package-lock.json`).
2. `node ./scripts/sync-version.js` (syncs `projects/ngb-select/package.json`, `src/version.ts`, and `ngb-select.interface.ts`).
3. `npm run build:lib` (compiles to `./dist/ngb-select`).
4. `npm publish ./dist/ngb-select --access public` (uploads to npm).

---

## 3. Troubleshooting Common Errors

### `404 Not Found - PUT https://registry.npmjs.org/@amro93%2fngb-select` / `401 Unauthorized`

- **Cause**: Your local npm CLI is not logged in or your session has expired.
- **Solution**: Run `npm login` in your terminal and verify with `npm whoami`.

### `npm error command git ls-remote ssh://git@github.com/dist/ngb-select.git`

- **Cause**: Running `npm publish dist/ngb-select` without `./` causes npm to interpret the directory as a Git repository URL shortcut.
- **Solution**: Always use `npm publish ./dist/ngb-select --access public` (already configured in `npm run publish:lib`).

### Version Out of Sync

- **Cause**: Editing `package.json` manually without updating `projects/ngb-select/package.json`.
- **Solution**: Run `npm run sync:version` anytime to synchronize version numbers across the root project, library manifest, TypeScript constants, and distribution bundle.
