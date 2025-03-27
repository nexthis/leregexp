---
title: "Enhanced password validation"  
description: "Validate passwords with additional complexity requirements."  
difficulty: 60  
solution: ["(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{10,}", ""] 
data: [ 'Pass123!', 'NoSpecialChar123', 'Short1!', 'Alllowercase!1', 'ValidPass#123' ]
---
Your task is to create an enhanced password validation that should include:  
- Minimum 10 characters in length.  
- At least one uppercase letter (A-Z).  
- At least one digit (0-9).  
- At least one special character from `!@#$%^&*`.  