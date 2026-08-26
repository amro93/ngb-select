# 06. Git Conventions, PR Templates, and StackBlitz

This SOP covers repository standards, pull request templates, and detailed configurations for providing online IDE preview links via StackBlitz.

## 1. Commit and Branching Strategy

The repository strictly follows the **Conventional Commits** standard, which is required for the automated `semantic-release` pipeline to function correctly.

**Allowed Types:**
- `feat`: A new feature (Trigger a MINOR version bump).
- `fix`: A bug fix (Trigger a PATCH version bump).
- `docs`: Documentation only changes.
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `perf`: A code change that improves performance.
- `test`: Adding missing tests or correcting existing tests.
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation.

**Examples:**
- `feat(dropdown): add virtual scrolling support for large lists`
- `fix(filter): resolve issue where clear button doesn't clear the search input`

## 2. Pull Request Template (`.github/PULL_REQUEST_TEMPLATE.md`)

Create this file in the `.github` directory to enforce PR quality.

```markdown
## Description
<!-- Describe your changes in detail -->
Fixes # (issue number)

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Checklist:
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] I have updated the StackBlitz examples if applicable
```

## 3. StackBlitz Integration

To ensure users can easily try `ngb-select` in their browser, StackBlitz must be configured to run the Angular CLI demo correctly.

### Root `stackblitz.json`
Place this file at the root of the repository. It tells StackBlitz how to run the project.

```json
{
  "installDependencies": true,
  "startCommand": "npm run start",
  "env": {
    "ENABLE_CJS_IMPORTS": true
  }
}
```

### StackBlitz `angular.json` Constraints
Ensure that the `angular.json` in the demo environment does not use complicated local builders that StackBlitz's WebContainer cannot parse. Standard `@angular-devkit/build-angular:browser` is required. Ensure Bootstrap CSS is linked correctly:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.scss"
]
```

### URL Generation for README
You can generate direct links to specific folders within the repository if your demo app lives in a subfolder (e.g., `projects/demo`).

`https://stackblitz.com/github/your-org/ngb-select/tree/main/projects/demo`

Users clicking this link will immediately see a live, editable Angular environment running the component.
