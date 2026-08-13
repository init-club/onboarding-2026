# Terminal commands I use

> Trim anything here you don't actually use. A short honest list scores better than a long
> copied one — reviewers grade "familiarity", and they may ask you to explain any of these.

Environment: WSL2, Ubuntu 26.04, bash.

## Navigation

```bash
cd -                  # jump back to the previous directory
pushd /etc && popd    # go somewhere and return
ls -lah               # long listing, human-readable sizes, including dotfiles
tree -L 2             # directory structure two levels deep
```

## Piping and filters

The core idea: each program does one thing and writes to stdout; `|` feeds that into the
next program's stdin.

```bash
# The 10 largest things in the current directory
du -sh * | sort -rh | head -10

# Which processes are eating memory
ps aux | sort -k4 -rn | head -5

# Count how many Python files exist below here
find . -name "*.py" | wc -l

# Search history for a command I know I ran but can't remember
history | grep docker
```

`sort -rh` is worth knowing: `-h` sorts human-readable sizes correctly, so `1.5G` ranks
above `900M` instead of sorting as plain text.

## Redirection

```bash
node server.js > server.log 2>&1 &   # stdout and stderr to a file, run in background
command > /dev/null 2>&1             # discard all output
tail -f server.log                   # follow a log as it's written
grep -c "error" server.log           # count matching lines rather than printing them
```

`2>&1` means "send stderr to wherever stdout is currently going" — order matters, since
`2>&1 > file` sends stderr to the *terminal*, not the file.

## Permissions and processes

```bash
ls -l script.sh       # read the permission bits
chmod +x script.sh    # make executable
sudo apt update && sudo apt upgrade -y
ps aux | grep node    # find a running process
kill -9 <pid>         # force-kill by pid
lsof -i :3000         # what is occupying port 3000
```

`lsof -i :3000` is the one I actually needed during Task 4, when a leftover `node server.js`
kept the port bound and the next `npm start` failed with `EADDRINUSE`.

## Used during the other onboarding tasks

```bash
# Task 2 - verify the Linux install
fastfetch
uname -a
lsb_release -a

# Task 4 - run and probe the broken web app
npm install && npm start
curl -s http://localhost:3000/api/submissions
curl -s -X POST http://localhost:3000/api/submit \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"t@init.club"}'

# Task 5 - containers
docker compose up --build
docker ps
docker exec -it task5_redis redis-cli GET hits
docker compose logs -f web
```

## Shortcuts that save the most time

| Keys | Effect |
|---|---|
| `Ctrl+R` | reverse-search history — the single biggest speedup |
| `Ctrl+A` / `Ctrl+E` | jump to start / end of line |
| `Ctrl+W` | delete the previous word |
| `Ctrl+L` | clear the screen |
| `Ctrl+C` / `Ctrl+D` | interrupt / end input |
| `!!` | re-run last command (`sudo !!` after a permission error) |
