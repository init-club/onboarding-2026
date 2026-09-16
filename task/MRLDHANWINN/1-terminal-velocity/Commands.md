# Terminal Velocity — Commands Practice

This document contains essential terminal commands mastered as part of **Task 1: Terminal Velocity**, covering navigation, file manipulation, piping and filtering, process inspection, and Git workflow.

---

## 1. Directory Navigation & Inspection

```bash
# Print current working directory
pwd

# List all files including hidden ones with permissions and sizes
ls -la

# Change directory into project folder
cd ~/task/1-terminal-velocity

# Move up one level
cd ..

# Jump to home directory
cd ~

# Go back to previous directory
cd -
```

---

## 2. File & Directory Management

```bash
# Create directory structure
mkdir -p src/modules tests

# Create empty file or update timestamp
touch index.js config.json

# Copy files recursively
cp -r src/ src_backup/

# Move or rename files
mv config.json src/config.json

# Remove files safely
rm -i obsolete.txt

# Remove non-empty directory recursively
rm -rf temp/
```

---

## 3. Streams, Piping, and Redirection

```bash
# Redirect standard output to a file (overwrite)
echo "Init Club Onboarding 2026" > log.txt

# Append standard output to a file
echo "Session active: $(date)" >> log.txt

# Pipe output of ls into grep to filter specific files
ls -la | grep "\.js$"

# Count lines in a file
wc -l log.txt

# Sort unique lines from an access log
cat access.log | sort | uniq -c | sort -nr | head -n 5

# View first and last 10 lines of a file
head -n 10 log.txt
tail -n 10 log.txt

# Stream real-time file updates
tail -f /var/log/syslog
```

---

## 4. Process Management & System Diagnostics

```bash
# Display active processes
ps aux

# Search for running Node.js processes
ps aux | grep node

# Monitor system resources interactively
top
htop

# Terminate process by PID gracefully
kill -15 <PID>

# Force terminate process
kill -9 <PID>

# Check available disk space
df -h

# Check available memory
free -h
```

---

## 5. Git Workflow Commands

```bash
# Check repository status
git status

# Create and switch to new feature branch
git checkout -b feat/tasks/1-terminal-velocity-MRLDHANWINN

# Stage all changes
git add .

# Commit changes with conventional commit message
git commit -m "feat(task1): add terminal velocity typing proof and command reference"

# Check recent commit history cleanly
git log --oneline --graph --decorate -n 5

# Push branch to remote fork
git push -u origin feat/tasks/1-terminal-velocity-MRLDHANWINN
```
