const express = require('express');
const app = express();
const path = require('path');
const yelp = require('yelp-fusion');
const token = require('./token');
const client = yelp.client(token);

const port = process.env.PORT || 3000;

// const allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// };

app.use(express.json());

// app.use(allowCrossDomain);

app.get('/app.js', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'dist', 'main.js'))
);

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);

app.put('/api/restaurants', (req, res, next) => {
  console.log(req.body);
  client
    .search({
      term: 'restaurants',
      limit: 50,
      ...req.body,
    })
    .then(response => {
      res.send(response.body);
    })
    .catch(e => {
      console.log(e);
    });
});

app.listen(port, () => console.log(`listening on port ${port}`));
