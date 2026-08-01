---
title: How to Set Up GLM-5.2 With OpenRouter and Toggle It Against Claude Code
  in Seconds
description: Step by step guide to configure GLM-5.2 through OpenRouter, connect
  it to Claude Code, and switch between Claude and GLM-5.2 per session with one
  command.
date: 2026-08-01
updated: 2026-08-01
author: AI Success Forum Team
category: ai-tools
tags:
  - GLM-5.2
  - OpenRouter
  - Claude Code
  - AI coding tools
  - productivity
featured: true
coverImage: https://res.cloudinary.com/dtryodpcq/image/upload/v1785595026/abc_ddapre.png
draft: false
---

## Why This Setup Matters
 
Claude Code is one of the most capable agentic coding tools available today. It plans, edits files, runs tests, and handles multi step tasks without much hand holding. The tradeoff is cost. Heavy users burn through tokens fast, and premium model pricing adds up over a busy sprint.
 
GLM-5.2 from Zhipu AI changes the math. It is a strong open weight coding model, priced at a fraction of frontier model rates, and it plugs into the same Claude Code interface you already know. You do not lose your workflow. You just change what is running underneath it.
 
This guide walks through the full OpenRouter setup for GLM-5.2, then shows you how to build a one command toggle so you can switch between Claude and GLM-5.2 depending on the task in front of you.
 
This is not about replacing Claude Code. It is about giving yourself a cheaper default for the parts of your workflow that do not need the strongest model available, while keeping Claude one command away for the moments that do.
 
## What You Need Before You Start
 
- An OpenRouter account with a funded API key
- Claude Code already installed on your machine
- A terminal you are comfortable working in (Terminal on Mac, a shell on Linux, PowerShell or WSL on Windows)
If you do not have an OpenRouter account yet, sign up, add a small amount of credit, and generate an API key from your dashboard. Keep that key somewhere safe. You will need it in a moment.
 
## Step 1: Get Your OpenRouter API Key
 
Log into OpenRouter and open the API Keys section of your account. Create a new key and give it a name you will recognize later, something like "claude-code-glm." Copy the key immediately. OpenRouter only shows it once.
 
## Step 2: Set the Required Environment Variables
 
Claude Code decides where to send its requests based on a small set of environment variables. By default it points at Anthropic's own servers. Changing these variables redirects it somewhere else entirely, in this case, OpenRouter's GLM-5.2 endpoint.
 
### On Mac or Linux
 
Open your terminal and run the following, replacing the placeholder with your real key:
 
```bash
export ANTHROPIC_BASE_URL="https://openrouter.ai/api"
export ANTHROPIC_AUTH_TOKEN="your-openrouter-api-key"
export ANTHROPIC_MODEL="zai-org/glm-5.2"
export ANTHROPIC_API_KEY=""
```
 
The last line matters more than it looks. Leaving ANTHROPIC_API_KEY empty stops Claude Code from falling back to your Anthropic account by mistake.
 
### On Windows (PowerShell)
 
```powershell
$env:ANTHROPIC_BASE_URL="https://openrouter.ai/api"
$env:ANTHROPIC_AUTH_TOKEN="your-openrouter-api-key"
$env:ANTHROPIC_MODEL="zai-org/glm-5.2"
$env:ANTHROPIC_API_KEY=""
```
 
If you are running Claude Code inside WSL, use the Mac or Linux commands above instead, since WSL runs a Linux shell.
 
## Step 3: Make the Variables Stick
 
Setting environment variables in a terminal window only lasts for that session. Close the terminal and you are back to Claude's default settings. To make the GLM-5.2 configuration permanent, add the export lines to your shell profile.
 
On Mac, that is usually `~/.zshrc`. On most Linux distributions, it is `~/.bashrc`. Open the file in a text editor, paste the four export lines from Step 2 at the bottom, save, and restart your terminal.
 
Alternatively, Claude Code supports a settings file at `~/.claude/settings.json`. You can add the same variables under an "env" block there instead, which keeps the configuration scoped to Claude Code specifically rather than your entire shell.
 
## Step 4: Verify the Connection
 
Launch Claude Code as you normally would:
 
```bash
claude
```
 
Give it a simple prompt, something like "list the files in this directory." If GLM-5.2 responds correctly and the session behaves normally, your setup is working. If you see authentication errors, double check that ANTHROPIC_AUTH_TOKEN matches your OpenRouter key exactly, with no extra spaces.
 
## Step 5: Build a One Command Toggle
 
Running the export commands manually every time you want to switch models gets old fast. A small shell script solves this. Create a file called `claude-switch.sh` in your home directory:
 
```bash
#!/bin/bash
 
if [ "$1" = "glm" ]; then
  export ANTHROPIC_BASE_URL="https://openrouter.ai/api"
  export ANTHROPIC_AUTH_TOKEN="your-openrouter-api-key"
  export ANTHROPIC_MODEL="zai-org/glm-5.2"
  export ANTHROPIC_API_KEY=""
  echo "Switched to GLM-5.2 via OpenRouter"
elif [ "$1" = "claude" ]; then
  unset ANTHROPIC_BASE_URL
  unset ANTHROPIC_AUTH_TOKEN
  unset ANTHROPIC_MODEL
  export ANTHROPIC_API_KEY="your-anthropic-api-key"
  echo "Switched to Claude default"
else
  echo "Usage: source claude-switch.sh [glm|claude]"
fi
```
 
Save the file, then make it executable:
 
```bash
chmod +x claude-switch.sh
```
 
Because environment variables only apply to the current shell session, you need to source the script rather than run it directly. Add this alias to your shell profile for convenience:
 
```bash
alias cswitch="source ~/claude-switch.sh"
```
 
Restart your terminal, and switching models becomes a single line:
 
```bash
cswitch glm
claude "refactor this function for readability"
 
cswitch claude
claude "review this for a security issue"
```
 
Now you get the practical split most experienced teams settle on. Route routine work, boilerplate, drafts, test generation, documentation, through GLM-5.2, and reserve Claude for the harder architectural decisions and trickier debugging sessions.
 
## A Note on Cost and Quality
 
GLM-5.2 through OpenRouter typically costs a fraction of Claude Opus for comparable coding tasks, which is exactly why this setup has become popular among developers running long agentic sessions. But cost is not the only variable worth weighing. In head to head comparisons, GLM-5.2 handles multi file edits, tool calling, and long context reasonably well, though complex architectural reasoning still tends to favor Claude in most independent testing.
 
The toggle script above is designed around that reality. You are not choosing one model forever. You are choosing the right one for each task, and switching takes less time than making coffee.
 
If you are working across GPU heavy workloads beyond agentic coding, it is also worth comparing a few cloud GPU providers before committing to any single one, since pricing and availability shift often in this space.
 
## Common Setup Mistakes to Avoid
 
**Forgetting to clear ANTHROPIC_API_KEY.** If this variable still holds your Anthropic key, Claude Code may silently authenticate against Anthropic instead of OpenRouter, and you will not immediately notice.
 
**Running the script instead of sourcing it.** Environment variables set inside a script that is executed normally do not carry over to your terminal session. Always use `source` or the alias shown above.
 
**Mismatched model names.** OpenRouter occasionally updates model identifiers as new versions ship. If your session fails to connect, check OpenRouter's model list to confirm the exact string is still current.
 
## Frequently Asked Questions
 
**Do I need a Zhipu AI account to use GLM-5.2 this way?**
 
No. Routing through OpenRouter means you only need one account and one API key. OpenRouter handles the connection to Zhipu's infrastructure on the backend, so there is no separate signup required.
 
**Will this break my existing Claude Code settings?**
 
No, as long as you use the toggle script rather than permanently overwriting your shell profile. Switching back to `cswitch claude` restores your normal Anthropic configuration for that session.
 
**Is my API key safe sitting inside a shell script?**
 
Treat it the way you would treat any password. Avoid committing `claude-switch.sh` to a public repository. If you want tighter security, store the key in a local `.env` file that the script reads at runtime instead of hardcoding it directly, or use your operating system's credential manager.
 
**Can I use this same approach with other coding tools, not just Claude Code?**
 
Yes. GLM-5.2 exposes a standard OpenAI compatible API as well, so tools like Cursor, Cline, and Aider can connect to it directly through OpenRouter or Zhipu's own platform, without needing the Anthropic style redirect described above.
 
**What happens if OpenRouter has downtime?**
 
Your toggle script makes recovery simple. Run `cswitch claude` and you are back on Anthropic's own infrastructure within seconds, no reconfiguration needed.
 
## Final Thoughts
 
Cost efficient AI workflows are becoming a real skill, not just a nice to have. Knowing how to route work to the right model, rather than defaulting to the most expensive option out of habit, is quickly becoming as valuable as knowing how to prompt well in the first place.
 
This setup takes about ten minutes the first time and roughly zero seconds every time after that. Once the toggle script is in place, you will probably never go back to running a single model by default again.
 
Want more insights like this? Subscribe to the AI Success Forum newsletter.
 
