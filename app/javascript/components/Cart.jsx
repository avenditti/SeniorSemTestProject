import React from 'react';
import LineItems from './LineItems';
import axios from 'axios';

export default class Cart extends React.Component {


  state = {
    line_items: []
  };

 componentDidMount = () => {
    // send an HTTP get message to
    // request json data from the server at the url 
    // '/carts/' + this.props.id
    // and update the states with it
    var self = this;
    axios.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
    axios.get('/carts/' + this.props.id)
        .then(function (response) {
            console.log(response.data);
            self.setState({ line_items: response.data })

        })
        .catch(function (error) {
            console.log(error);
        });
  };

 handleRemoveFromCart = (id) => {
    // send an HTTP patch message to
    // request json data from the server at the url 
    // '/line_items/'+id+'/decrement'
    // and update the states with it
  };

 handleEmptyCart = () => {
    // send an HTTP delete message to
    // request json data from the server at the url 
    // '/carts/'+this.props.id
    // and update the states with it
  };

 handleAddToCart = (cart) => {
    this.state.line_items = cart.line_items
  }

  render = () => {
    if (this.state.total_price != 0) {
      return(
        <div className="spa_cart">
          <LineItems line_items={this.state.line_items}/>
        </div>
      )
    }
    else {
      return (
        <div className="spa_cart">
          <h2>Your Cart</h2>
        </div>
      );
    }
  }   
}

          //         