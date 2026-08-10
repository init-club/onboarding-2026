# Task 2 — Linux Migration

Submitted by [@Athish2002](https://github.com/Athish2002). Method: **WSL2** (the task README
lists Dual Boot *or* WSL for the Easy level).

## What I set up

| | |
|---|---|
| Distribution | Ubuntu 26.04 (Resolute Raccoon), x86_64 |
| Host | Windows Subsystem for Linux — Ubuntu (WSL 2.7.11.0) |
| Kernel | 6.18.33.2-microsoft-standard-WSL2 |
| Shell | bash 5.3.9 |
| Packages | 546 (dpkg) |

Evidence: `fastfetch-screenshot.png`

## A note on fastfetch vs neofetch

The Expected Submission section names `neofetch`, but this task's own **Verification Step**
says:

> Run a system-info tool such as: fastfetch

so I used `fastfetch`. It's also the practical choice — neofetch was archived by its
maintainer in 2024 and is no longer packaged in current Ubuntu releases, while fastfetch is
its actively maintained successor and reports the same fields. Happy to add a `neofetch`
capture as well if a reviewer prefers it.

## Why WSL over dual boot

The task README recommends starting with WSL as the safer, reversible option, and it's a
better fit for how I actually work: I can run a real Ubuntu userspace and still use Windows
tooling side by side, with the Windows filesystem mounted under `/mnt/c`. No repartitioning,
so no risk to existing data.

## How to verify

```bash
wsl --list --verbose     # from Windows PowerShell: shows Ubuntu, VERSION 2
```

Then inside the Ubuntu shell:

```bash
fastfetch                # the screenshot above
uname -a                 # kernel string, confirms WSL2
lsb_release -a           # distribution and release
whoami && pwd
```

## Configuration done

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl build-essential
```

This isn't a distro installed just for the screenshot — it's where I run the terminal work
for these tasks, with the Windows filesystem mounted at `/mnt/c` so I can move between the
two without copying files around.
