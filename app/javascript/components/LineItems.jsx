import React from 'react';
import LineItem from './LineItem';

export default class LineItems extends React.Component {
 handleRemoveFromCart = (id) => {
    // call handleRemoveFromCart in Cart to handle it
  };

 render = (id) => {
    // populate an array "line_items" with 
    // a collection of LineItem components

    var line_items = [];
    var self = this;
    this.props.line_items.line_items.forEach(function(lineitem) {
        line_items.push(<LineItem book={lineitem}
                       key={'lineitem' + lineitem.id}
                       handleAddToCart={self.handleAddToCart} />);
      }
    );
    return(
      <table>
        <tbody>
          // render line items
          // render the total price line
        </tbody>
      </table>
    )
  }
}