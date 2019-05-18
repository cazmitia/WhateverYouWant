import React, { Component } from 'react';
import axios from 'axios';
import Address from './Address';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';

import Rating from 'react-rating';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeStep: 0,
      filters: {
        location: '',
        categories: [],
        price: [],
        rating: 0,
      },
      restaurants: [],
      selectedRestaurant: {
        categories: [],
        transactions: [],
      },
    };
  }

  handleChange = evt => {
    this.setState({
      ...this.state,
      filters: { ...this.state.filters, location: evt.target.value },
    });
    console.log(this.state);
  };

  handleNext = () => {
    if (this.state.activeStep === 0) this.setState({ activeStep: 1 });
    else if (this.state.activeStep === 1) {
      const { location, rating } = this.state.filters;
      const categories = this.state.filters.categories.join(',');
      const price = this.state.filters.price.join(',');
      this.setState({ activeStep: 2 });
      return axios
        .put(`/api/restaurants`, { location, price, rating, categories })
        .then(response =>
          this.setState({
            ...this.state,
            restaurants: response.data.businesses,
            selectedRestaurant:
              response.data.businesses[
                Math.round(Math.random() * response.data.businesses.length - 1)
              ],
          })
        )
        .then(() => console.log(this.state));
    } else if (this.state.activeStep === 2) {
      this.setState({
        ...this.state,
        selectedRestaurant: this.state.restaurants[
          Math.round(Math.random() * this.state.restaurants.length - 1)
        ],
      });
    }
  };

  handleBack = () => {
    this.setState({ ...this.state, activeStep: this.state.activeStep - 1 });
  };

  handleClick = () => {
    axios
      .get(`/api/restaurants`, this.state)
      .then(response => console.log(response.data));
  };

  handleToggle = value => {
    let categories = this.state.filters.categories;
    categories.indexOf(value) === -1
      ? categories.push(value)
      : categories.splice(categories.indexOf(value), 1);
    this.setState({
      ...this.state,
      filters: { ...this.state.filters, categories },
    });
    console.log(this.state);
  };

  handlePriceToggle = value => {
    let price = this.state.filters.price;
    price.indexOf(value) === -1
      ? price.push(value)
      : price.splice(price.indexOf(value), 1);
    this.setState({
      ...this.state,
      filters: { ...this.state.filters, price },
    });
    console.log(this.state);
  };

  handleRatingChange = evt => {
    const rating = evt.target.value;
    this.setState({
      ...this.state,
      filters: { ...this.state.filters, rating },
    });
    console.log(this.state);
  };

  render() {
    const { activeStep, address, filters, selectedRestaurant } = this.state;
    console.log(activeStep);
    return (
      <div style={{ maxWidth: '800px', margin: 'auto' }}>
        <Typography variant="h2" style={{ textAlign: 'center' }}>
          Whatever You Want!
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step>
            <StepLabel>Delivery Address</StepLabel>
          </Step>
          <Step>
            <StepLabel>Filters</StepLabel>
          </Step>
          <Step>
            <StepLabel>What You Want</StepLabel>
          </Step>
        </Stepper>
        <div>
          {activeStep === 0 ? (
            <TextField
              id="address"
              variant="filled"
              label="Delivery Address:"
              onChange={this.handleChange}
              value={address}
              fullWidth
            />
          ) : activeStep === 1 ? (
            <Slide
              direction="left"
              in={activeStep === 1}
              mountOnEnter
              unmountOnExit
            >
              <Grid container>
                <Grid item xs={12} sm={12} lg={4} xl={4}>
                  <List>
                    {[
                      'american',
                      'chinese',
                      'italian',
                      'mexican',
                      'japanese',
                    ].map(item => (
                      <ListItem button onClick={() => this.handleToggle(item)}>
                        <Checkbox
                          checked={filters.categories.includes(item)}
                          tabIndex={-1}
                          disableRipple
                        />
                        <Typography variant="headline">{item}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} sm={12} lg={4} xl={4}>
                  <List>
                    {['$', '$$', '$$$', '$$$$'].map(item => (
                      <ListItem
                        button
                        onClick={() => this.handlePriceToggle(item.length)}
                      >
                        <Checkbox
                          checked={filters.price.includes(item.length)}
                          tabIndex={-1}
                          disableRipple
                        />
                        <Typography variant="headline">{item}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} sm={12} lg={4} xl={4}>
                  <FormControl style={{ minWidth: '100%' }}>
                    <InputLabel htmlFor="rating">Star Rating</InputLabel>
                    <Select
                      value={filters.rating}
                      onChange={this.handleRatingChange}
                      inputProps={{
                        name: 'Star Rating',
                        id: 'rating',
                      }}
                    >
                      <MenuItem value="">
                        <em>Any</em>
                      </MenuItem>
                      <MenuItem value={1}>1 Star {'&'} up</MenuItem>
                      <MenuItem value={2}>2 Stars {'&'} up</MenuItem>
                      <MenuItem value={3}>3 Stars {'&'} up</MenuItem>
                      <MenuItem value={4}>4 Stars {'&'} up</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Slide>
          ) : (
            <Slide
              direction="left"
              in={activeStep === 2}
              mountOnEnter
              unmountOnExit
            >
              <Card>
                <CardMedia
                  style={{ height: '40vh' }}
                  image={selectedRestaurant.image_url}
                  title="What You Want:"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {selectedRestaurant.name}
                  </Typography>
                  {selectedRestaurant.transactions.includes('delivery') ? (
                    <Chip
                      label="Online Ordering available via Yelp!"
                      component="a"
                      href={selectedRestaurant.url}
                      clickable
                      color="primary"
                    />
                  ) : null}
                  <Typography component="div">
                    <div>
                      Category:{' '}
                      {selectedRestaurant.categories
                        .map(category => category.title)
                        .join(', ')}
                    </div>
                    <div>phone: {selectedRestaurant.display_phone}</div>
                  </Typography>
                  <Rating
                    initialRating={selectedRestaurant.rating}
                    emptySymbol={<StarBorder style={{ color: 'gold' }} />}
                    fullSymbol={<Star style={{ color: 'gold' }} />}
                    readonly={true}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    component="a"
                    href={selectedRestaurant.url}
                    target="_blank"
                  >
                    View on Yelp
                  </Button>
                </CardActions>
              </Card>
            </Slide>
          )}
        </div>
        <div style={{ marginTop: '1vh' }}>
          <Button disabled={activeStep === 0} onClick={this.handleBack}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={this.handleNext}>
            {activeStep === 0
              ? 'Select filters'
              : activeStep === 1
              ? 'Tell me what I want'
              : 'not that'}
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
