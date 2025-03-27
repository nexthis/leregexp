---
title: "Basic SQL Injection Prevention"  
description: "Validate user input to prevent basic SQL injection attempts."  
difficulty: 50  
solution: ["^[a-zA-Z0-9_]+$", ""]
data: [ "JohnDoe", "admin'--", "user123", "DROP TABLE users;", "valid_username" ]
---
Your task is to create a validation rule that ensures user input for database queries is safe by following these rules:  
- The input should only contain letters (`A-Z`, `a-z`), numbers (`0-9`), and underscores (`_`).  
- No spaces, special characters, or SQL keywords are allowed.  
- This validation can be used to filter user input before executing SQL queries.  
