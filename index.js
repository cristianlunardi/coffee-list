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

// Middleware to log incoming requests to the console
app.use((req, res, next) => {
    console.log(`URL Call: ${req.url}`);
    console.log(`Request method: ${req.method}`);

    return next();
});

app.post('/coffee', (req, res) => {
    let { name, price, description } = req.body;

    if (!name || !price || !description) {
        return res.status(400).json({ error: 'Missing required filds'});
    };

    let newCoffee = { name, price, description };
    dataBase[0].coffee.push(newCoffee);

    return res.status(200).json({ message: 'Success on creating a new type of coffee!' });
});

app.get('/coffee', (req, res) => {
    return res.status(200).json(dataBase[0].coffee);
});

app.get('/coffee/:name', (req, res) => {
    const { name } = req.params;
    const coffee = dataBase[0].coffee.find(c => c.name.toLowerCase() === name.toLowerCase());

    if (!coffee) {
        return res.status(404).json({ error: 'Coffee not found' });
    }

    return res.status(200).json(coffee);
});

app.put('/coffee/:name', (req, res) => {

    if (!req.body.price) {
        return res.status(400).json({ "error": "Invalid request body!"});
    }

    const { name } = req.params;
    const { price } = req.body;

    const coffeeIndex = dataBase[0].coffee.findIndex(c => c.name.toLowerCase() === name.toLowerCase());

    if (coffeeIndex === -1) {
        return res.status(404).json({ error: "Coffee not found" });
    }

    let oldPrice = dataBase[0].coffee[coffeeIndex].price;
    let newPrice = dataBase[0].coffee[coffeeIndex].price = price;

    return res.status(200).json({"oldPrice": oldPrice, "newPrice": newPrice, "coffee": dataBase[0].coffee[coffeeIndex]});
});

app.delete('/coffee/:name', (req, res) => {
    const { name } = req.params;
    const coffeeIndex = dataBase[0].coffee.findIndex(c => c.name.toLowerCase() === name.toLowerCase());

    if (coffeeIndex === -1) {
        return res.status(404).json({ error: "Coffee not found" });
    }

    dataBase[0].coffee.splice(coffeeIndex);

    return res.status(200).json(dataBase[0].coffee);
});

// Start the Express server and listen for incoming requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});