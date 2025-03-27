---
title: "Run Command"
description: "Extract Command from Input using Regex: Identify Executable Commands."
difficulty: 22
solution: ["(?<=[r|R]un:).*", ""]
data: [ 'Run: ls', 'run: cat 🐱', 'run: nano', 'echo: logs.txt', 'ran: now']
---
The user invokes commands in the terminal using the run method. 
[Capture all commands, omitting the word "Run:"]{class="text-yellow-500"} lowercase and uppercase first letter are also acceptable.