const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs'); 

app.use('/', express.static('public'));

const budget = {
    myBudget:[
    {
        title: 'Eat out',
        budget: 30
    },
    {
        title: 'Rent',
        budget: 350
    },
    {
        title: 'Groceries',
        budget: 90
    },
]};

let budgetData = null;

fs.readFile('budgetData.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  budgetData = JSON.parse(data); // Parse the data and store it in the 'budgetData' variable

  app.get('/hello', (req, res) => {
    res.send('Hello World!');
  });

  app.get('/budget', (req, res) => {
    // Check if budgetData has been loaded from the file
    if (budgetData) {
      res.json(budgetData);
    } else {
      res.status(500).json({ error: 'Budget data not available' });
    }
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});





