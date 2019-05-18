import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class Address extends Component {
  constructor() {
    super();
    this.state = { address: '' };
  }

  render() {
    const address = this.state.address;
    return (
      <div>
        <TextField
          id="address"
          variant="filled"
          label="Delivery Address:"
          onChange={this.handleChange}
          value={address}
          fullWidth
        />
      </div>
    );
  }
}

export default Address;
