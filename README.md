<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/init-club/.github/main/assets/logo-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/init-club/.github/main/assets/logo-light.svg">
    <img alt="Init Club Logo"
         src="https://raw.githubusercontent.com/init-club/.github/main/assets/logo-light.svg"
         width="300">
  </picture>
    <h1>Onboarding Tasks for Init Club Members - 2026</h1>
</div>

## Welcome

This repository contains documentation-first onboarding tasks for new contributors. Each task folder's README describes the objective, acceptance criteria, helpful references, and submission instructions.

## How this repo is organized

Top-level layout

- `LICENSE` — repository license.
- `README.md` — this top-level introduction.
- `task/` — directory containing individual task folders (each with a `README.md` describing the task and submission requirements).

Each task folder contains:
- `README.md` — detailed task instructions, acceptance criteria, examples, and helpful resources.
- Optional starter files (scripts, sample code, Dockerfile, etc.) where applicable.
- When you submit: your work should be placed under `task/<your-github-username>/<task-folder>/`.

## Task list (high level)

This repository captures the following tasks (see each folder for details and step-by-step instructions):

- Task 1.1: The Linux Migration — Install Linux (dual-boot / WSL2 / VM) and provide evidence.
- Task 1.2: Terminal Velocity — Touch-typing + shell fluency; submit commands & typing proof.
- Task 2.1: Containerization — Containerize a Hello World app with Docker and docker-compose.
- Task 2.1 (Algorithm Tour): Binary Search in C/C++ / Python / JavaScript.
- Task 2.2: The Broken Web App — Debug and fix a disconnected submit button; submit a PR.
- Task 4.1: Dotfiles Showcase — Publish your dotfiles and provide a reproducible bootstrap.
- Task 4.2: Good First Issue — Contribute to an external repo; submit the external PR link.
- TASK 5: Career Tracks — Choose ONE:
  - Track A: Systems Engineer — `check_resources.sh` and cron setup.
  - Track B: AI Researcher — `sentiment.py` using pre-trained models.
  - Track C: Software Developer — To-Do CLI that persists tasks in JSON.

## How to submit a task

Follow these steps so reviewers can run and verify your work quickly:

1. Fork the repository to your GitHub account.
2. Create a directory for your work:
   - `task/<your-github-username>/<task-id-or-name>/`
3. Add your deliverables. Typical required files:
   - `README.md` (short personal writeup describing choices and verification steps).
   - Any screenshots, GIFs, or example output (e.g., `neofetch-screenshot.png`, `docker-ps-screenshot.png`).
   - Source files or scripts (`check_resources.sh`, `todo.py`, `sentiment.py`, etc.).
   - `usage.txt` or `examples.txt` describing the exact commands you ran.
4. Commit small, focused changes with descriptive messages.
5. Push to a feature branch, then open a PR against `init-club/onboarding-2026` naming your PR clearly (see section below).
6. In the PR description include:
   - Short summary and which task you're submitting.
   - Clear verification steps for reviewers (commands + expected output).
   - Links to any external PRs (Task 2.2 / Task 4.2).
   - Screenshots and artifacts as attachments or files in your submission directory.

Quickstart

1. Fork this repository on GitHub.
2. Create your submission folder: `task/<your-github-username>/<task-id>/`.
3. Add a short `README.md` describing your approach and the artifacts requested by the task.
4. Include only the files the task asks for (screenshots, short source files, diffs, or configs).
5. Open a Pull Request with verification steps and any external links the task requires.

Notes
- Implement and test solutions locally in your environment, then include the requested deliverables when submitting.
- Avoid committing large binaries, models, or secrets. If in doubt, ask via an Issue.

Example PR title: `feat(tasks): add linux-migration submission by alice`

## Standards & acceptance criteria

Each task README enumerates the deliverables and what constitutes an acceptable submission. Reviewers will check:

- Deliverables are present and runnable.
- README provides clear setup and verification steps.
- Screenshots / evidence are legible and show the relevant info (e.g., `neofetch` output).
- For fixes (e.g., the broken web app), the PR both fixes the root cause and includes explanation + tests where applicable.
- Code style: readable, documented, and minimal. Avoid secrets and large binaries in PRs.

If a task has Gold/Silver tiers (e.g., dual-boot vs WSL2), clearly state which tier you expect to be evaluated against.

## Review process & rubric

Reviews are performed by maintainers and/or volunteers. Expect feedback to be constructive and focused on reproducibility.

Typical rubric (per task):
- Completeness (40%): All required files and evidence are present.
- Correctness (30%): The solution works as claimed; for bug fixes, the root cause is addressed.
- Documentation (20%): README + usage instructions are clear and sufficient to reproduce results.
- Style & safety (10%): Clean code and no unsafe shortcuts (e.g., committing secrets).

Review outcomes:
- Approved: Merge or close with merge instructions.
- Request changes: Ask for clarifications, missing artifacts, or small fixes.
- Discussion: If scope or expectations are unclear, reviewers will ask clarifying questions.

## Branching, commits, and PR style guide

- Create a fresh branch off `main` for each submission:
  - `git checkout -b feat/tasks/<task>-<username>`
- Commit message guidelines:
  - Use concise, descriptive messages. Examples:
    - `feat(tasks): add linux-migration submission by <username>`
    - `fix(frontend): bind rsvp form submit handler`
    - `chore(ci): add simple test for rsvp endpoint`
- Keep commits small and atomic where possible. Squash or clean history if requested.
- Fill the PR description with:
  - What you did and why.
  - How to run and verify (copy-pasteable commands).
  - Any known limitations or additional notes.

Example PR description template:

```markdown
Title: feat(tasks): add terminal-velocity by <username>

Summary:
- Completed Task 1.2 (Terminal Velocity).
- Included typing screenshot and `commands.md`.

How to verify:
1. Open task/<username>/2-terminal-velocity/commands.md
2. Verify the three commands and outputs.
3. Confirm screenshot.png shows WPM and accuracy.

Notes:
- No external dependencies.
```

## Templates and starter files

Many tasks include starter templates and example files inside their task folders. If you want a boilerplate for a task, look for files named:
- `template-*.sh`, `todo.py` (starter), `sentiment.py` (starter), `Dockerfile`, `docker-compose.yml`, or example code under the relevant task folder.

If you prefer, maintainers can generate a minimal skeleton for you in a branch — open an issue requesting it.

## Getting help and community expectations

- Before opening an Issue, search this repo for existing guidance.
- If you need help with a task (e.g., debugging an installer or tests), open an Issue with:
  - The task folder and your branch name.
  - Clear steps to reproduce the problem and any logs or screenshots.
- Be respectful, concise, and patient — maintainers are volunteers.
- Code of Conduct: follow the Init Club code of conduct (link in the organization profile).

## Security, privacy, and licensing

- Do NOT commit secrets, API keys, private keys, or large binary models to this repository.
- Use `.gitignore` to avoid committing OS-specific files or local artifacts.
- For tasks requiring models (e.g., transformers), list dependencies in `requirements.txt` and document that models will be downloaded on first run.
- Repository license: check the `LICENSE` file at the repo root. Respect the license when reusing code or examples.

## Maintainers & contacts

- Primary maintainers and reviewers are listed in the organization’s team page. If you need to request a reviewer, mention `@init-club/maintainers` in the Issue or PR body.
- If you want an interactive review session or mentorship, open an Issue titled `Request: reviewer/mentorship — <task> by <username>` and include preferred times.

## Final notes & best practices

- Keep your submission reproducible: include exact commands and expected outputs.
- Provide friendly README summaries that make it easy for reviewers to reproduce and grade your work.
- Prefer small, well-documented PRs over monolithic submissions.
- Ask for help early — debugging/install questions are common and the community can guide you.

Happy hacking — we look forward to your contributions!

If you want, I can:
- Add starter files into the `task/template/` folder,
- Create a CONTRIBUTING.md specifically for reviewers,
- Or open a draft PR that contains these README improvements.

Tell me which of these you want next and I’ll prepare it.
