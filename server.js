const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const fs          = require('fs');    // file writing

const app         = express();

const users       = require('./routes/api/users');
const admin       = require('./routes/api/admin'); // Admin initialization
// const cart        = require('./routes/api/cart');
const products     = require('./routes/api/products');

// to use post methods         (req.body to work)
// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ loaded: true });
});

// Use Routes
app.use('/api/users', users);          // connecting endpoints of users.js to /api/users   ex: /api/users/test
app.use('/api/admin', admin);              // nino
app.use('/api/admin/products', products);    // gota
// app.use('/api/users/:id/cart', cart);      // boria

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port - ${port}`));