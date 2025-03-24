---
title: "Javascript string detection"
description: "Javascript string detection"
difficulty: 70
solution: ["(\"|')((?:\\\\\\1|(?:(?!\\1).))*)\\1", "g"]
data: |
    const test1 = "test\";
    const test2 = "te\\\"st\";
    const test3 = "t\'est\";
    const test4 = "t\'es\'t\";
    const test5 = 'test\';
    const test6 = 'te\\\'st\';
    const test7 = 't\"est\';
    const test8 = 't\"es\"t\';

---

You need to select only the string from this javascript code