const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
    const userText = req.body.userText;

    // Append the text to a file
    fs.appendFile('output.txt', userText + '\n', (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).send('Server error');
        } else {
            // Redirect to another page with a 302 response
            res.redirect(302, '/success');
        }
    });
});

// Serve success page
app.get('/success', (req, res) => {
    res.send('<h1>Data submitted successfully!</h1>');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

























