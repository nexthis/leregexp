---
title: "Simple code refactoring"
description: "Identify method names that exceed a certain length, which can be a sign of a method doing too much."
difficulty: 55
solution: ["function\\s+([a-zA-Z0-9_]{31,})\\s*\\(", "g"]
data: | 
    // Function to calculate the total price of an order
    function calculateTotalPrice(items, taxRate) {
     return items.reduce((total, item) => total + item.price * item.quantity, 0) * (1 + taxRate);
    }

    // Function to validate user input and sanitize data
    function validateUserInputAndSanitizeData(input) {
        const sanitizedInput = input.trim().replace(/<[^>]*>?/gm, ''); // Remove potential HTML tags
        return sanitizedInput.length > 0 ? sanitizedInput : null;
    }

    // Function to apply discount based on customer type and order amount
    function applyDiscountBasedOnCustomerTypeAndOrderAmount(total, customerType) {
        let discount = 0;
        if (customerType === 'VIP') {
            discount = 0.2; // 20% discount for VIPs
        } else if (total > 100) {
            discount = 0.1; // 10% discount for orders above $100
        }
        return total * (1 - discount);
    }

    // Function to update a database record (mock implementation)
    function updateDatabaseRecord(orderId, updateData) {
       console.log(`Updating order ${orderId} with data:`, updateData);
       return true; // Simulating a successful update
    }

    // Function to fetch user data from database and display on UI (mock implementation)
    function fetchUserDataFromDatabaseAndDisplayOnUI(userId) {
        const mockUserData = { id: userId, name: 'John Doe', email: 'john.doe@example.com' };
        console.log(`Displaying user data:`, mockUserData);
        return mockUserData;
    }

    // Function to process order and send confirmation email (mock implementation)
    function processOrderAndSendConfirmationEmail(order) {
        console.log(`Processing order #${order.id} for ${order.customerEmail}`);
        console.log(`Sending confirmation email to ${order.customerEmail}`);
        return true;
    }

    // Example usage
    const items = [
      { name: 'Laptop', price: 1000, quantity: 1 },
      { name: 'Mouse', price: 50, quantity: 2 }
    ];
   
    const total = calculateTotalPrice(items, 0.1);
    const discountedTotal = applyDiscountBasedOnCustomerTypeAndOrderAmount(total, 'VIP');
    console.log(`Final Total Price: $${discountedTotal.toFixed(2)}`);
    processOrderAndSendConfirmationEmail({ id: 123, customerEmail: 'customer@example.com' });

---
Your task is to identify method names that are likely too long and could benefit from being broken down into smaller, more focused methods. The criteria for a "long method name" in this exercise is:

- The method name has 21 or more characters.
- Select only the function, not its calls

You need to create a pattern that matches these long method names. 