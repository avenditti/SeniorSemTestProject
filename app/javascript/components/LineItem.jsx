import React from 'react';
import PropTypes from 'prop-types';

export default class LineItem extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
    total_price: PropTypes.number
  };

 handleRemoveFromCart = (e) => {
    // call handleRemoveFromCart in LineItems to handle it
  };

  render = () => {
    return(
      <tr className="entry">
        // render a line item row
      </tr>
    )
  };
}