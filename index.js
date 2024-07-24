const express = require('express'); // Import the Express module
const app = express(); // Create an Express application instance
const PORT = 3000; // Define the port number for the server to listen on

app.use(express.json()); // Middleware to parse income JSON requests

let dataBase = [
    {
        "coffee": [
            {
                "name": "Flat White",
                "price": 3.5,
                "description": "A smooth, rich, and fruity coffee blend."
            },
            {
                "name": "Cappuccino",
                "price": 4,
                "description": "A rich and velvety coffee with a smooth, caramel-like foam."
            }
        ]
    }
]; // Mock database array

/* HTTP Request Methods:
 *
 * - GET: Retrieve data
 * - POST: Create data
 * - PUT: Update data
 * - DELETE: Delete data
 * - PATCH: Partially update data
 * 
 * Parameter Types:
 * 
 * - Query parameters: /search?query=JavaScript
 * - Route parameters: /users/:userId
 * - Request body: { "username": "johndoe", "email": "johndoe@example.com" }
 */

app.post('/coffee', (req, res) => {
    let { name, price, description } = req.body;

    if (!name || !price || !description) {
        return res.status(400).json({ error: 'Missing required filds'});
    };

    let newCoffee = { name, price, description };
    dataBase[0].coffee.push(newCoffee);

    return res.status(200).json({ message: 'Success on creating a new type of coffee!' });
});

// Start the Express server and listen for incoming requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});