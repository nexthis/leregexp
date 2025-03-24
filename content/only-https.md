---
title: "Only https"
description: "Only https"
difficulty: 10
solution: ["^https", "gm"]
data: |
    test://https://hacker 
    ws://192.168.11.22
    https://stackoverflow.com/questions/
    http://stackoverflow.com
---

Only allow internet traffic if it starts with [https]{class="text-yellow-500"}