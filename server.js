const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const fs          = require('fs');    // file writing

const app = express();

const users       = require('./routes/api/users');

// to use post methods         (req.body to work)
// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  let users = JSON.parse(fs.readFileSync('./db/users.json'));
  users.push({name: 'borisi'});
  console.log(users)
  users = JSON.stringify(users);
  fs.writeFile('./db/users.json', users, (err) => {
    if (err) throw err;
    console.log(`Saved!`);
  })
  res.json(users);
});

// Use Routes
app.use('/api/users', users);          // connecting endpoints of users.js to /api/users   ex: /api/users/test

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port - ${port}`));