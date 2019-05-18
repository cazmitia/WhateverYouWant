const yelp = require('yelp-fusion');
const client = yelp.client(
  'FNPx1LI9XZt9nI8zHOUOrH41U-rCjpEHVZcILSFRApzzqlFrBrinnuwzWPALu9Adq-uLSaHmRdIJOABEqlh_5UYgR0iN-8mdaDmbSa1bibBYDLEB195uhqM-FPPdXHYx'
);

client
  .search({
    term: 'Four Barrel Coffee',
    location: 'san francisco, ca',
  })
  .then(response => {
    console.log(response.jsonBody.businesses[0].name);
  })
  .catch(e => {
    console.log(e);
  });
