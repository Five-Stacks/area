# Branching & Pull Request Policy

## Purpose
In order to maintain a clean and reliable production branch, all changes to `main` must be properly staged, reviewed and tested.

This document defines how branches and pull requests (PRs) must be handled.

## Branching Strategy
- `main`: Production branch. Updated weekly with the latest stable version of the apps.
- `dev`: Integration branch. All features and fixes must be merged here before going to `main`.
- **Feature/Bugfix branches**: Branches off `dev` for new work. Use clear names, e.g., `feature/login-ui`, `bugfix/payment-crash`.
- **Hotfix branches**: Only for urgent fixes that must go directly to `main`. Must follow the hotfix procedure below.

## Pull Request
> [!IMPORTANT]
> `dev` is the only source branch allowed for PRs targeting `main`

### PR Title & Description
- Include the linked Jira story at the start of the title.
- Use a descriptive title explaining the change.
- Include a short summary, testing notes, and any relevant other Jira stories or tasks in the description.

### Review Requirements
At least 2 reviewers must be selected:
- The person in charge of this part of the project.
- The Scrum Master which will check for potentially required continuous integration updates & tests to add/edit.

If new commits are pushed, all reviews will be stalled thus requiring all reviewers to do it again.
> [!NOTE]
> You can take a look at CONTRIBUTING.md#roles to know who is in charge of what in the project.

### Check Tests
- All status checks (CI, linters, unit tests, etc) must pass before being able to merge.
- If new commits are pushed, all status checks will be relaunched.

## Changing PR Base Branch
Avoid changing the base branch off a PR after creation.

If a PR was mistakenly created targeting `main` from another branch than `dev`, create an empty commit so the blocking CI job is retriggered and cleared.

> GitHub actually has a way to rerun workflows on PR base change but it does not dismiss old failed workflow runs.

## Hotfix Procedure
> [!CAUTION]
> Hotfixes must be used only in case of an emergency production issue.
>
> Because hotfixes bypass some verification, they may require rollback or temporary disabling of affected functionality.

Branch off `main` as `hotfix/description`.

After merging back into `main`, immediately merge the hotfix into `dev` to keep branches in sync.
You must request at least 2 other people's reviews in order to merge it, ideally the same persons as in the [standard procedure](#review-requirements).
If these persons are not able to do it, you might get review from any members of the team.

## Monitoring & Compliance
- Review open PRs where you are required as reviewer regularly.

- Remember that every new commits on a PR automatically re-request a review from all reviewers.

If you find a violation of any of the rules above, mark your review as Request Change with the rule broken in the description. This will block the PR from being merged, remember to check back more often in order to make your review again once it is fixed.

## Branch Protection Rules

### `main` branch (production)

- Require pull requests before merging.
- Source of the PR **must be** `dev`.
- Require all status checks to pass.
- Require approval from all 5 core team members.

### `dev` branch

- Require pull requests before merging.
- Require all status checks to pass.
- Require at least two approval from team members, see [how to choose who](#review-requirements).
